import { v4 as uuidv4 } from "uuid";
import { Product } from "./Product.js";
import { Customer } from "./customer.js";
import { OrderStatus } from "./EnumStatus.js";
import { OrderItem } from "./OrderItem.js";

export class Order  {
  private id: string;

  private customer: Customer;

  private items: OrderItem[];

  private createdAt: string;
  private status: OrderStatus;


    /**
     * Getter $id
     * @return {string}
     */
	public get $id(): string {
		return this.id;
	}

    /**
     * Getter $customer
     * @return {Customer}
     */
	public get $customer(): Customer {
		return this.customer;
	}

    /**
     * Getter $items
     * @return {OrderItem[]}
     */
	public get $items(): OrderItem[] {
		return this.items;
	}

    /**
     * Getter $createdAt
     * @return {string}
     */
	public get $createdAt(): string {
		return this.createdAt;
	}

    /**
     * Getter $status
     * @return {OrderStatus}
     */
	public get $status(): OrderStatus {
		return this.status;
	}

    /**
     * Setter $id
     * @param {string} value
     */
	public set $id(value: string) {
		this.id = value;
	}

    /**
     * Setter $customer
     * @param {Customer} value
     */
	public set $customer(value: Customer) {
		this.customer = value;
	}

    /**
     * Setter $items
     * @param {OrderItem[]} value
     */
	public set $items(value: OrderItem[]) {
		this.items = value;
	}

    /**
     * Setter $createdAt
     * @param {string} value
     */
	public set $createdAt(value: string) {
		this.createdAt = value;
	}

    /**
     * Setter $status
     * @param {OrderStatus} value
     */
	public set $status(value: OrderStatus) {
		this.status = value;
	}
  
  constructor(customer:Customer){
    this.id=uuidv4()
    this.customer=customer
    this.items=[]
    this.createdAt = new Date().toISOString();
    this.status=OrderStatus.NEW;//auto tạo mới là new 
  }
  public addItem(item:OrderItem):void{
    if(this.status===OrderStatus.NEW){
         const index = this.$items.findIndex(i => i.$product.$id === item.$product.$id);
         if(index==-1){
             this.items.push(item);
             console.log("Order: Add successfully")
         }else{
            const curItem=this.items[index]
            if(curItem){
                curItem.$quanity+=item.$quanity
            }
         }
    }
    else{
        console.log(`Can't add item because order status :${this.$status}`)
    }
  }
  public removeItem(id:string){
    if(this.status===OrderStatus.NEW){
        const index=this.items.findIndex(i=>i.$product.$id===id);
        this.items.splice(index,1);
        console.log("Order: Remove successfully")
    }
    else{
        console.log("Order: Can't remove")
    }
  }
  public calculateTotal():number{
    return this.items.reduce((sum,i)=>sum+=i.getTotal(),0)

  }
  public printInvoice(): void {
      console.log("HÓA ĐƠN ĐƠN HÀNG");
      console.log(`Ngày tạo  : ${this.createdAt}`);
      console.log(`Mã đơn    : ${this.id}`);
      console.log(`Khách hàng: ${this.customer.toString()}`); 
    
      console.log("Danh sách sản phẩm mua:");
      this.items.forEach((item, index) => {
          const product = item.$product;
          console.log(`  ${index + 1}. ${product.$name} | Số lượng: ${item.$quanity} | Giá đặt: ${item.$price}đ | Thành tiền: ${item.getTotal()}đ`);
      });
      // Tổng thành tiền của toàn bộ hóa đơn
      console.log(`TỔNG CỘNG : ${this.calculateTotal()}đ`);
      
  }


  
}
