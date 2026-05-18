const employees = [
  { id: 1, name: "Alice", age: 23, status: "working" },
  { id: 3, name: "Bob", age: 25, status: "working" },
  { id: 6, name: "John", age: 27, status: "working" },
  { id: 8, name: "David", age: 23, status: "quit_job" },
  { id: 10, name: "Eve", age: 20, status: "working" },
];

const products = [
  { id: 1, name: "Phone", price: 1200 },
  { id: 2, name: "Laptop", price: 3000 },
  { id: 3, name: "Tab", price: 2000 },
  { id: 4, name: "PC", price: 800 },
  { id: 5, name: "Monitor", price: 1500 },
];

const orders = [
  { id: 1, employeeId: 1, productId: 4, quantity: 1 },
  { id: 2, employeeId: 3, productId: 2, quantity: 4 },
  { id: 3, employeeId: 1, productId: 5, quantity: 3 },
  { id: 4, employeeId: 6, productId: 1, quantity: 2 },
  { id: 5, employeeId: 3, productId: 5, quantity: 3 },
  { id: 6, employeeId: 8, productId: 1, quantity: 1 },
  { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];

/*
Yêu cầu viết các HÀM
lam dung 80%
comment code: bang tieng anh (neu co comment)
ten bien: tuan thu quy tac
tối ưu 20%
toc do
code (ham dung chung thi viet chung)

Bai 5:
Tim ra san phan doanh thu cao nhat ( nhiều tiền nhất )
Bai 6:
Tim ra nhan vien ban nhieu hang nhat
Bai 7:
Tim ra nhan vien co doanh thu cao nhat
Bai 8:
Tim ra san pham ban co doanh thu nhat cua moi nhan vien
Bai 9:
Gia su nhan vien se nhan duoc hoa hong la 3%
-> tim hoa hong cho moi nhan vien
Bai 10:
Sap xep nhan vien theo thu tu giam dan theo doanh thu
* */
//Bai: 1
// Lay ra ds nhan vien dang lam viec
const activeEmployees = employees.filter(
  (employee) => employee.status === "working",
);
console.log(activeEmployees);
// Bai 2:
// Lay ra nhan vien lon tuoi nhat
const getOldestEmployee = (employees) => {
  let indexOfOldestEmployee;
  let oldestEmployee = employees[0].age;
  for (let i = 1; i < employees.length; i++) {
    if (employees[i].age > oldestEmployee) {
      oldestEmployee = employees[i].age;
      indexOfOldestEmployee = i;
    }
  }
  return employees[indexOfOldestEmployee];
};
console.log(getOldestEmployee(employees));
// Bai 3:
// Lay ra san pham gia re nhat
const getCheapestProduct = (products) => {
  let indexOfCheapestProduct;
  let cheapestProduct = products[0].price;
  for (let i = 1; i < products.length; i++) {
    if (products[i].price < cheapestProduct) {
      cheapestProduct = products[i].price;
      indexOfCheapestProduct = i;
    }
  }
  return products[indexOfCheapestProduct];
};
console.log(getCheapestProduct(products));
// Bai 4:
// Tìm ra sản phẩm bán chạy nhất ( bán nhiều nhất về mặt số lượng )
//a hashMap includes id product and quanity ;
const mapProduct = new Map();
for (let i = 0; i < orders.length; i++) {
  let currentOrder = orders[i];
  let currentQuanity = mapProduct.get(currentOrder.id) || 0;
  mapProduct.set(
    currentOrder.productId,
    currentQuanity + currentOrder.quantity,
  );
}

const getTopSellingProduct = (orders, products) => {
  let indexOfTopSellingProduct = 0;
  let hightestQuanity = 0;

  for (let i = 0; i < products.length; i++) {
    if (mapProduct.get(products[i].id) > hightestQuanity) {
      hightestQuanity = mapProduct.get(products[i].id);
      indexOfTopSellingProduct = i;
    }
  }
  return products[indexOfTopSellingProduct];
};
console.log(getTopSellingProduct(orders, products));

// Bai 5:
// Tim ra san phan doanh thu cao nhat ( nhiều tiền nhất )
// a hashMap save id product and product's price
const priceMap = new Map();
for(let i=0;i<products.length;i++){
    priceMap.set(products[i].id,products[i].price);
}
const getHighestRevenueProduct=(products)=>{
    let highestRevenue=0;
    let indexOfHighestRevenueProduct;
    for(let i=0;i<products.length;i++){
        let currentRevenue=mapProduct.get(products[i].id)*priceMap.get(products[i].id);
        if(highestRevenue<currentRevenue){
            highestRevenue=currentRevenue;
            indexOfHighestRevenueProduct=i;
        }
    }
    console.log(`The highest revenue product is ${products[indexOfHighestRevenueProduct].name}.Highest revenue is ${highestRevenue}`);


}
getHighestRevenueProduct(products);
// Bai 6:
// Tim ra nhan vien ban nhieu hang nhat
const employeeMap=new Map();
for(let i=0;i<orders.length;i++){
    currentOrder=orders[i];
    currentQuanity=employeeMap.get(orders[i].id)||0;
    employeeMap.set(currentOrder.employeeId,currentQuanity+currentOrder.quantity);
}
const getTopSellingEmployee=(employees)=>{
    let indexOfTopSellingEmployee=0;
    let quanity=0;
    for(let i=0;i<employees.length;i++){
        if(quanity<employeeMap.get(employees[i].id)){
            quanity=employeeMap.get(employees[i].id);
            indexOfTopSellingEmployee=i;
        }
    }
    console.log(`${employees[indexOfTopSellingEmployee].name} is the top selling with ${quanity} products`);
    
}
//Bai 7
getTopSellingEmployee(employees);
const getTopSalesEmployee=(employees)=>{
    let highestRevenue=0;
    let index;
    for(let i=0;i<employees.length;i++){
        let currentRevenue=employeeMap.get(employees[i].id)*priceMap.get(employees[i].id);
        if(highestRevenue<currentRevenue){
            highestRevenue=employeeMap.get(employees[i].id)*priceMap.get(employees[i].id);
            index=i;
        }


    }
    console.log(`${employees[index].name} is the highest revenue with ${highestRevenue}$`);

}
getTopSellingEmployee(employees);