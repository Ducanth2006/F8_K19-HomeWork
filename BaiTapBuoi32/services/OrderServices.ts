import type{ ICustomerServices } from "../interfaces/ICustomerServices.js";
import type { IProductServices } from "../interfaces/IProductServices.js";
import { Customer } from "../model/customer.js";
import { Order } from "../model/Order.js";
import { OrderItem } from "../model/OrderItem.js";
import { OrderStatus } from "../model/EnumStatus.js";
export class OrderServices{
    private productService: IProductServices;
    private customerService: ICustomerServices;
    private orders: Order[];

    constructor(productService: IProductServices, customerService: ICustomerServices,orders: Order[]) {
        this.productService = productService;
        this.customerService = customerService;
        this.orders=orders;
    }
    public createOrder(customer:Customer){
        this.orders.push(new Order(customer))
    }
    public findOrder(orderId: string): Order | null {
        return this.orders.find(o => o.$id === orderId) || null;
    }
    public addProduct(orderId:string, productId:string, quantity:number){
        const curOrder=this.findOrder(orderId);
        if(!curOrder){
            console.log("KHông thể tìm đc id order:"+orderId)
            return
        }
        const curProduct= this.productService.findById(productId)
        if(!curProduct){
            console.log("Không thể tim đc product với id product:"+productId)
            return
        }
        if(curProduct!.$stock<0||curProduct!.$stock<quantity){
            console.log("Stock không đủ")
        }
        curProduct.decreaseStock(quantity);
        curOrder.addItem(new OrderItem(curProduct,quantity,curProduct.$price))
        console.log("Add successfully")

    }
    public removeProduct(orderId:string, productId:string){
        const curOrder=this.findOrder(orderId);
        if(!curOrder){
            console.log("KHông thể tìm đc id order:"+orderId)
            return
        }
        const curProduct= this.productService.findById(productId)
        if(!curProduct){
            console.log("Không thể tim đc product với id product:"+productId)
            return
        }
        if(curOrder.$status!==OrderStatus.NEW){
            console.log("can't remove because order status"+curOrder.$status)
            return 
        }
        const targetItem=curOrder.$items.find(p=>p.$product.$id===productId)
        if(!targetItem){
            console.log("Product don't exist in order")
            return
        }
        curProduct.increaseStock(targetItem.$quanity);
        curOrder.removeItem(orderId);
        console.log("remove completely")


    }
    

}