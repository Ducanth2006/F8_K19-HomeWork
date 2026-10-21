import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Job } from './interface';
import { CreateJobDto, UpdateJobDto } from './dto/job.dto';
@Injectable()
export class jobServices {
  private jobs: Job[] = [
    {
      id: 'uuid-12345',
      category_id: 10,
      company_id: 101,
      title: 'Lập trình viên Frontend (React/TypeScript)',
      description:
        'Phát triển và bảo trì các giao diện web ứng dụng cho hệ thống tuyển dụng, tối ưu hóa trải nghiệm người dùng và hiệu năng trang web.',
      requirement:
        'Có ít nhất 1 năm kinh nghiệm làm việc với React, TypeScript, HTML/CSS. Hiểu biết về RESTful API và quản lý state (Redux/Zustand).',
      benefit:
        'Lương tháng 13, thưởng dự án, bảo hiểm sức khỏe cao cấp, hỗ trợ thiết bị làm việc và học tập.',
      experience: 1,
      due_date: '2026-11-30',
      quantity: 3,
      min_salary: 15000000,
      max_salary: 25000000,
      qualification: 'Đại học / Cử nhân IT',
      work_type: 'Full-time',
      working_time: 'Thứ 2 - Thứ 6 (8:30 - 17:30)',
      created_at: '2026-10-01T08:00:00.000Z',
      created_by: "hello",
      modified_at: '2026-10-05T10:30:00.000Z',
      modified_by: "ducanh",
      deleted_at: null,
      deleted_by: null,
      active: true,
    },
  ];
  getList(): Job[] {
    return this.jobs;
  }
  getById(id: string): Job {
    const job = this.jobs.find((j) => j.id === id);
    if (!job) {
      throw new NotFoundException(`Không thể tìm thấy job với ${id}`);
    }
    return job;
  }
  create(dto: CreateJobDto): Job {
    const newJob = {
      id: uuidv4(),
      ...dto,
      active: true,
      created_at: new Date().toISOString(),
      created_by: 'usr_123456', // Sau này có Auth sẽ lấy từ req.user.id
      modified_at: null,
      modified_by: null,
      deleted_at: null,
      deleted_by: null,
    };
    this.jobs.push(newJob);
    return newJob
  }
  patch(id:string,dto:UpdateJobDto){
    const index =this.jobs.findIndex(j=>j.id===id)
    if(index===-1){
        throw new NotFoundException(`Can't find job by id:${id}`)
    }
    this.jobs[index]={
        ...this.jobs[index],
        ...dto
    }
    return this.jobs[index]
  }
  delete(id: string): null | object {
        const index = this.jobs.findIndex((j) => j.id === id);
        if (index === -1) {
            throw new NotFoundException(`Can't find job by id :${id}`)
        }
        this.jobs.splice(index, 1);
        return {message:"Xóa thành công "};
    }
}
