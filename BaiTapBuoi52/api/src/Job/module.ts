import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';


import { JobController } from "./controller";
import { jobServices } from "./services";
import { Job } from "./entities/job.entity";

@Module({imports:[TypeOrmModule.forFeature([Job])],controllers:[JobController],providers:[jobServices]})
export class JobModule{}