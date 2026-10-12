import { Controller, Get } from "@nestjs/common";
@Controller("category")
export class CategoryController{
    @Get()
    getCategory(){
        return [{
            id:1,
            name:"IT"
        }]
    }

}