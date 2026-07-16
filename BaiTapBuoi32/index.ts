import { Product } from "./model/Product.js";
import { Customer } from "./model/Customer.js"; 
import { ProductService } from "./services/ProductService.js";
import { CustomerServices } from "./services/CustomerServices.js";
import { OrderServices } from "./services/OrderServices.js";

// 1. Khởi tạo các Service
const productService = new ProductService([]);
const customerService = new CustomerServices([]);
const orderService = new OrderServices(productService, customerService, []);

// 2. Tạo dữ liệu Sản phẩm
console.log("=== TẠO SẢN PHẨM ===");
const laptop = new Product("Laptop Lenovo Legion 5", 25000000, 10);
const mouse = new Product("Chuột Gaming RGB", 500000, 50);
const controller = new Product("Tay cầm Xbox Series X", 1500000, 20);

productService.addProduct(laptop);
productService.addProduct(mouse);
productService.addProduct(controller);

console.log("Danh sách sản phẩm ban đầu:");
productService.printProducts();

// 3. Tạo dữ liệu Khách hàng
console.log("\n=== TẠO KHÁCH HÀNG ===");
const customer1 = new Customer("Nguyễn Đức Anh", 987654321, "Hà Nội"); 
customerService.addCustomer(customer1);

console.log("Danh sách khách hàng:");
customerService.printCustomers();

// 4. Test quy trình Đặt hàng
console.log("\n=== TẠO ĐƠN HÀNG VÀ THÊM SẢN PHẨM ===");
orderService.createOrder(customer1);

// Lấy danh sách order để tìm ID của đơn hàng vừa tạo
const orders = orderService.getOrder();
const currentOrder = orders[0];

if (currentOrder) {
    const orderId = currentOrder.$id;
    console.log(`Đã tạo đơn hàng thành công với ID: ${orderId}`);

    // Thêm sản phẩm vào đơn hàng
    orderService.addProduct(orderId, laptop.$id, 1);   // Mua 1 Laptop
    orderService.addProduct(orderId, mouse.$id, 2);    // Mua 2 con chuột
    
    // In hóa đơn
    console.log("\n=== IN HÓA ĐƠN ===");
    currentOrder.printInvoice();

    // 5. Kiểm tra Tồn kho (Stock) sau khi thêm vào giỏ
    console.log("\n=== KIỂM TRA TỒN KHO SAU KHI ĐẶT ===");
    console.log(`Tồn kho Laptop: ${productService.findById(laptop.$id)?.$stock}`);
    console.log(`Tồn kho Chuột: ${productService.findById(mouse.$id)?.$stock}`);

    // 6. Test Thanh toán (Checkout)
    
    console.log("\n=== THANH TOÁN ===");
    orderService.checkout(orderId);
    console.log(`Trạng thái đơn hàng hiện tại: ${currentOrder.$status}`);
} else {
    console.log("Lỗi: Không tạo được đơn hàng. Vui lòng sửa lỗi logic trong OrderServices.ts!");
}