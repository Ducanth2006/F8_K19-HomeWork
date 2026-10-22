import { Controller, Get } from "@nestjs/common";
import { TodoService ,Todo} from "./service";

@Controller("todos")
export class TodoController{
    constructor(private readonly todoService:TodoService){}
    @Get()
    getAllTodo(){
        return this.todoService.findAll();
    }

}
