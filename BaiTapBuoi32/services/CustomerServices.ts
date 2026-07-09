import{Customer} from "../model/customer.js"
import type {IUpdateCustomer} from "../interfaces/IUpdateCustomer.js"
import type{ ICustomerServices } from "../interfaces/ICustomerServices.js";

export class CustomerServices implements ICustomerServices{
    private customers: Customer[];
    constructor(customer:Customer[]){
        this.customers=customer;
    }
    public addCustomer(customer:Customer){
        if(customer){
            this.customers.push(customer);
        }
    }
    public updateCustomer(id:string,data:IUpdateCustomer){
        const index=this.customers.findIndex(c=>c.$id===id);
        if(index!==-1){
            this.customers[index]?.selfUpdate(data);
        }
        else{
            console.log("customer: error when update ")
        }
    }
    public deleteCustomer(id:string){
        const index=this.customers.findIndex(c=>c.$id===id);
        if(index!=-1){
            this.customers.splice(index,1);
        }
        else{
            console.log("customer:error when delete")
        }
    }
    public findById(id:string):Customer|null{
        const customer=this.customers.find(c=>c.$id===id);
        if(customer){
            return customer;
        }
        else{
            return null;
        }

    }
    public findByPhone(phone: number): Customer |null{
        const customer=this.customers.find(c=>c.$phone===phone);
        if(customer){
            return customer;
        }
        else {
            return null;
        }
    }
    public getAllCustomers(): Customer[] {
        return this.customers;
    }
    public printCustomers(): void {
        console.log(this.customers);
    }



}