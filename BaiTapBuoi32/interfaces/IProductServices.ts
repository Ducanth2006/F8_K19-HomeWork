import { Product } from "../model/Product.js";

import  type{IUpdateProduct} from '../interfaces/IUpdateProduct.js' 
export interface IProductServices {
 
  addProduct(product: Product): void; 
  updateProduct(id: string, data: IUpdateProduct): void;
  deleteProduct(id: string): void;
  findById(id: string): Product|null;
  findByName(keyword: string):  Product[];
  getAllProducts():Product [] ;
  printProducts(): void;
}
