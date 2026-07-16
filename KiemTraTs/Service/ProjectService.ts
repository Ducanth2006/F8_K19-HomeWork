import { EmployeeService } from "./EmployeeService.js";
import { v4 as uuidv4 } from "uuid";
import type { IProject } from "../Interface/IProject.js";
export class ProjectService {
  private projects: IProject[] = [];
  private employeeService: EmployeeService;
  constructor(employeeService: EmployeeService) {
    this.employeeService = employeeService;
  }
  public create(project: Omit<IProject, "id">): IProject {
    const newProject: IProject = {
      id: uuidv4(),
      ...project,
    };
    this.projects.push(newProject);
    const employee = this.employeeService.findById(newProject.employeeId);
    if (employee) {
      employee.receiveNoti("Bạn vừa được gán vào dự án mới.");
    }
    return newProject;
  }
  public updateById(id: string, data: Partial<IProject>): IProject | null {
    const index = this.projects.findIndex((p) => p.id === id);
    if (index === -1) {
      return null;
    }
    const curProject = this.projects[index] as IProject;
    const oldEmployee = curProject.employeeId;

    const { id: _, ...updateData } = data;

    Object.assign(curProject, updateData);
    if (data.employeeId !== undefined && data.employeeId !== oldEmployee) {
      const newEmployee = this.employeeService.findById(data.employeeId);
      if (newEmployee) {
        newEmployee.receiveNoti("Bạn đã được chuyển giao phụ trách dự án này.");
      }
    }
    return curProject;
  }
}
