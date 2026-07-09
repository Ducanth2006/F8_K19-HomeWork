import { Product } from "./Product.js";
export class OrderItem{
    private product:Product;
    private quanity:number;
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
	public get $quanity(): number {
		return this.quanity;
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
	public set $quanity(value: number) {
		this.quanity = value;
	}

    /**
     * Setter $price
     * @param {number} value
     */
	public set $price(value: number) {
		this.price = value;
	}
    
    constructor(product:Product,quanity:number,price:number){
        this.product=product;
        this.price=price;
        this.quanity=quanity;
    }
    public getTotal():number{
        return this.quanity*this.price;
    }

}