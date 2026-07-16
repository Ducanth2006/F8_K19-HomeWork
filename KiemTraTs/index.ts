import { CustomerService } from "./Service/CustomerService.js";
import { EmployeeService } from "./Service/EmployeeService.js";
import { ProjectService } from "./Service/ProjectService.js";
const cusomterService= new CustomerService();
const employeeService= new EmployeeService();
const projectService= new ProjectService(employeeService);
//test case 1
const custom1= cusomterService.create({name:"duc anh",tax:"x102",address:"Ha noi"})
console.log(custom1)
//Test Case 2: Cập nhật Customer
cusomterService.updateById(custom1.id,{address:"New york"})
console.log(custom1)
