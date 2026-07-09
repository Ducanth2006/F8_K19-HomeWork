import { v4 as uuidv4 } from 'uuid';
import type {IUpdateCustomer} from "../interfaces/IUpdateCustomer.js"
export class Customer{
    private id:string;
    private name:string;
    private phone:number;
    private address:string;

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
     * Getter $phone
     * @return {number}
     */
	public get $phone(): number {
		return this.phone;
	}

    /**
     * Getter $address
     * @return {string}
     */
	public get $address(): string {
		return this.address;
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
     * Setter $phone
     * @param {number} value
     */
	public set $phone(value: number) {
		this.phone = value;
	}

    /**
     * Setter $address
     * @param {string} value
     */
	public set $address(value: string) {
		this.address = value;
	}
   
    constructor(name:string,phone:number,address:string){
        this.id=uuidv4();
        this.name=name;
        this.address=address;
        this.phone=phone;
    }
    public toString():string{
        return `Customer [ID: ${this.id}, Name: ${this.name}, Phone: ${this.phone}, Address: ${this.address}]`;
    }
    public  updatePhone(phone:number):void{
        this.phone=phone;
    }
    public updateAddress(address:string):void{
        this.address=address;
    }
    public selfUpdate(data:IUpdateCustomer){
        if(data.name){
            this.name=data.name;
        }
        if(data.address){
            this.address=data.address
        }
        if(data.phone){
            this.phone=data.phone;
        }
    }


}