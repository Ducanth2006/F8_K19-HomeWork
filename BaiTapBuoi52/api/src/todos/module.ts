import { Module } from "@nestjs/common";
import { TodoController } from "./controller";
import { TodoService } from "./service";

@Module({
    controllers:[TodoController],
    providers:[TodoService]
})
export class TodoModule{}