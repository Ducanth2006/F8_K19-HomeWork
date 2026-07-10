import { Product } from "./Product.js";
export class OrderItem{
    private product:Product;
    private quantity:number;
    private price:number;
    /**
     * Getter $product
     * @return {Product}
     */
	public get $product(): Product {
		return this.product;
	}

    /**
     * Getter $quanity
     * @return {number}
     */
	public get $quantity(): number {
		return this.quantity;
	}

    /**
     * Getter $price
     * @return {number}
     */
	public get $price(): number {
		return this.price;
	}

    /**
     * Setter $product
     * @param {Product} value
     */
	public set $product(value: Product) {
		this.product = value;
	}

    /**
     * Setter $quanity
     * @param {number} value
     */
	public set $quantity(value: number) {
		this.quantity = value;
	}

    /**
     * Setter $price
     * @param {number} value
     */
	public set $price(value: number) {
		this.price = value;
	}
    
    constructor(product:Product,quantity:number,price:number){
        this.product=product;
        this.price=price;
        this.quantity=quantity;
    }
    public getTotal():number{
        return this.quantity*this.price;
    }

}