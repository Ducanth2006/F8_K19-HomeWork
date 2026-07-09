import { v4 as uuidv4 } from 'uuid';
import type {IUpdateProduct} from '../interfaces/IUpdateProduct.js' 
export class Product{
    private id:string;
    private name:string;
    private price:number;
    private stock:number;
    constructor(name:string,price:number,stock:number){
        this.id=uuidv4();
        this.name=name;
        this.price=price;
        this.stock=stock;
    }

    /**
     * Getter $id
     * @return {string}
     */
	public get $id(): string {
		return this.id;
	}

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Getter $price
     * @return {number}
     */
	public get $price(): number {
		return this.price;
	}

    /**
     * Getter $stock
     * @return {number}
     */
	public get $stock(): number {
		return this.stock;
	}

    /**
     * Setter $id
     * @param {string} value
     */
	public set $id(value: string) {
		this.id = value;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}

    /**
     * Setter $price
     * @param {number} value
     */
	public set $price(value: number) {
		this.price = value;
	}

    /**
     * Setter $stock
     * @param {number} value
     */
	public set $stock(value: number) {
		this.stock = value;
	}
    public toString():string{
        return `Product [ID: ${this.id}, Name: ${this.name}, Price: ${this.price}, Stock: ${this.stock}]`;
    }
    // base method;
    public increaseStock(quantity:number){
        this.stock+=quantity;
    }
    public decreaseStock(quantity:number){
        this.stock-=quantity;
    }
    public updateProduct(data:IUpdateProduct):void {
        if(data.name!== undefined){
             this.name=data.name;
        }
         if(data.price!== undefined){
             this.price=data.price;
        }
         if(data.stock!== undefined){
             this.stock=data.stock;
        }
        console.log("Update successfully !!")
        

    }

    
   
    



}