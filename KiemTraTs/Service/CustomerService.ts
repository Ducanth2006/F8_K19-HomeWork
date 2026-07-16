import {v4 as uuidv4} from 'uuid'
import  type{ Customer } from '../Interface/ICustomer.js';
export class CustomerService {
    private customers:Customer[]=[];
    public create(customer: Omit<Customer, "id">): Customer{
        // Omit kiểu là giúp tạo ra các thuộc tính của Customer nhưng bỏ id ấy 
        const newCustomer:Customer={
             id:uuidv4(),
             ...customer
        }
        this.customers.push(newCustomer)
        return newCustomer;
    }
    public updateById(id: string, data: Partial<Customer>): Customer | null{
        // Partial là dấu ?. có thể có or không giúp  đỡ phải ghi đầy đủ dù chỉ sửa 1 thuộc tính 
        const index=this.customers.findIndex(c=>c.id===id);
        if(index===-1){
            return null
        }
        const curCustomer=this.customers[index];
        Object.assign(curCustomer, data);
        curCustomer.id = id;
        return curCustomer;
    }

}
