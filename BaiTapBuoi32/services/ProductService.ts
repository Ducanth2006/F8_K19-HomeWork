import {Product} from "../model/Product.js"
import  type{IUpdateProduct} from '../interfaces/IUpdateProduct.js' 
import  type{IProductServices} from "../interfaces/IProductServices.js"
export class ProductService  implements IProductServices {
    private products:Product[];
    constructor(products:Product[]){
        this.products=products;
    }
    // addProduct
    public addProduct(product:Product){
        if(!this.findById(product.$id)){
            this.products.push(product);
        }
    }
    //updateProduct
    public updateProduct(id:string,data:IUpdateProduct){
        const index=this.products.findIndex(p=>p.$id===id);
        if(index!==-1){
            this.products[index]?.updateProduct(data);
        }
        else{
            console.log("have errors when update")
        }
    }
    // delete Product
    public deleteProduct(id: string){
         const index=this.products.findIndex(p=>p.$id===id);
          if(index!==-1){
            this.products.splice(index,1);
            console.log("deleted successfully")
        }
        else{
            console.log("have errors when delete")
        }
         
    };
    // find by id
    public findById(id: string):Product|null{
         return this.products.find(p=>p.$id===id)||null;
    };
    //find by name
    public findByName(keyword: string):  Product[]{
        keyword=keyword.trim().toLowerCase();
        if(!keyword){
            return [];
        }
        else{
            return this.products.filter(p=>p.$name.toLowerCase().includes(keyword));
        }
    }
    // get all products
    public getAllProducts(): Product[]{
        return this.products;
    };
    // print all product
    printProducts(): void{
        console.log(this.products);
    };

    

}