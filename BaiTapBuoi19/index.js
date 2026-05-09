const products = [
  { id: 1, name: 'iPhone', price: 2000 },
  { id: 2, name: 'Samsung', price: 1500 },
  { id: 3, name: 'Xiaomi', price: 1000 },
  { id: 4, name: 'Oppo', price: 1200 }
]
const orders = [
  {
    id: 1,
    items: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 }
    ]
  },
  {
    id: 2,
    items: [
      { productId: 1, quantity: 1 },
      { productId: 3, quantity: 3 }
    ]
  },
  {
    id: 3,
    items: [
      { productId: 2, quantity: 2 },
      { productId: 4, quantity: 1 }
    ]
  }
]
const highestProfitProduct=()=>{
    const hashMapProductsDetails= new Map();
    //loop through products to get product details 
    for(let i=0;i<products.length;i++){
        hashMapProductsDetails.set(products[i].id,products[i]);
    }
    const hashMapProfitDetails=new Map();
    //loop through orders to get name and profit
    for(let i=0;i<orders.length;i++){
        for(let j=0;j<orders[i].items.length;j++){
            const currentOrder=orders[i].items[j];

            const currentProduct=hashMapProductsDetails.get(currentOrder.productId);

            const profit=currentOrder.quantity*currentProduct.price;

            let oldProfit=hashMapProfitDetails.get(currentProduct.name)||0;

            hashMapProfitDetails.set(currentProduct.name,oldProfit+profit);
        }
    };
    // loop to get highest profit product
    let nameHighest="";
    let highestProfit=0;
    for(let [name,profit] of hashMapProfitDetails){
        if(profit>highestProfit){
            nameHighest=name;
            highestProfit=profit;
        }
    }

    console.log(`Sản phẩm có doanh thu cao nhất là : Sản phẩm ${nameHighest} với doanh thu là ${highestProfit}`);

}
highestProfitProduct();