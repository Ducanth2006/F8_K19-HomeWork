import type{ ICustomerServices } from "../interfaces/ICustomerServices.js";
import type { IProductServices } from "../interfaces/IProductServices.js";
import { Customer } from "../model/Customer.js";
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
    public createOrder(customer:Customer):string|null{
        if(!customer){
            console.log("Can't create order")
            return null
        }
        this.orders.push(new Order(customer))
        return customer.$id;
    }
    public findOrder(orderId: string): Order | null {
        return this.orders.find(o => o.$id === orderId) || null;
    }
    public addProduct(orderId:string, productId:string, quantity:number){
        const curOrder=this.findOrder(orderId);
        if(!curOrder){
            console.log("Order id not found:"+orderId)
            return
        }
        const curProduct= this.productService.findById(productId)
        if(!curProduct){
            console.log("product id not found:"+productId)
            return
        }
        if(curProduct!.$stock<0||curProduct!.$stock<quantity){
            console.log("Stock không đủ")
        }
        curProduct.decreaseStock(quantity);
        curOrder.addItem(new OrderItem(curProduct,quantity,curProduct.$price))
        console.log("Order Service Add product successfully")

    }
    public removeProduct(orderId:string, productId:string){
        const curOrder=this.findOrder(orderId);
        if(!curOrder){
            console.log("Order id not found:"+orderId)
            return
        }
        const curProduct= this.productService.findById(productId)
        if(!curProduct){
            console.log("product id not found:"+productId)
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
        curProduct.increaseStock(targetItem.$quantity);
        curOrder.removeItem(productId);
        console.log("remove product completely")
    }
    public checkout(orderId:string){
        const curOrder=this.findOrder(orderId)
        if(!curOrder){
            console.log("Order id not found")
            return 
        }
        
        if(curOrder!.$status===OrderStatus.NEW){
            curOrder!.$status=OrderStatus.PAID;
            console.log("Check out completely")
        }
    }
    public cancelOrder(orderId:string){
        const curOrder=this.findOrder(orderId);
        if(!curOrder){
            console.log("Order id not found")
            return 
        }
        if(curOrder!.$status!==OrderStatus.NEW){
            console.log("Can't cancel order because order status is :"+curOrder!.$status)
            return 
        }
        curOrder!.$items.forEach(o=>o.$product.increaseStock(o.$quantity))// 
        curOrder!.$status=OrderStatus.CANCELLED;
    }
    public getOrder():Order[]{
        return this.orders
    }
    public printOrders():void{
        if(this.orders.length===0){
            console.log("Orders is empty")
            return
        }
        console.log("====== DANH SÁCH TOÀN BỘ ĐƠN HÀNG TRÊN HỆ THỐNG ======");
        this.orders.forEach(o=>o.printInvoice())
    }





    

}