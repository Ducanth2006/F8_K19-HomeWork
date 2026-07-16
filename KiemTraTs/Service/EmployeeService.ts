import { v4 as uuidv4 } from "uuid";
import { Employee } from "../Model/Employee.js";

export class EmployeeService {
  private employees: Employee[] = [];
  public create(employee: Omit<Employee, "id" | "receiveNoti">): Employee {
    const newEmployee: Employee = new Employee(employee.name);
    this.employees.push(newEmployee);
    return newEmployee;
  }
  public findById(id: string): Employee | null {
    const targeEm = this.employees.find((e) => e.id === id);
    if (!targeEm) {
      return null;
    }
    return targeEm;
  }
  public updateById(id: string, data: Partial<Employee>): Employee | null {
    const index = this.employees.findIndex((e) => e.id === id);
    if (index === -1) {
      return null;
    }

    const newName = data.name;
    if (!newName) {
      return this.employees[index] as Employee;
    }
    if(this.employees[index]){
        this.employees[index].name=newName;
    }
    const updatedEm: Employee = this.employees[index] as Employee;
    return updatedEm;
  }
}
