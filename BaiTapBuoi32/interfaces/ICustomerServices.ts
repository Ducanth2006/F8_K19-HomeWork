import type { IUpdateCustomer } from "./IUpdateCustomer.js";
import { Customer } from "../model/Customer.js";
export interface ICustomerServices {
  addCustomer(customer: Customer): void;
  updateCustomer(id: string, data: IUpdateCustomer): void;
  deleteCustomer(id: string): void;
  findById(id: string): Customer|null;
  findByPhone(phone: number): Customer|null;
  getAllCustomers(): Customer[];
  printCustomers(): void;
}
