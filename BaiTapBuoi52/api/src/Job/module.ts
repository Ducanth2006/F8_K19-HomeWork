import { Module } from "@nestjs/common";
import { JobController } from "./controller";
import { jobServices } from "./services";

@Module({controllers:[JobController],providers:[jobServices]})
export class JobModule{}