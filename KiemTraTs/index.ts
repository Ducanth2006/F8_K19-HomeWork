import { CustomerService } from "./Service/CustomerService.js";
import { EmployeeService } from "./Service/EmployeeService.js";
import { ProjectService } from "./Service/ProjectService.js";
const cusomterService= new CustomerService();
const employeeService= new EmployeeService();
const projectService= new ProjectService(employeeService);
//test case 1
console.log("test case 1:")

const custom1= cusomterService.create({name:"duc anh",tax:"x102",address:"Ha noi"})
console.log(custom1)

//Test Case 2: Cập nhật Customer
console.log("test case 2:")

cusomterService.updateById(custom1.id,{address:"New york"})
console.log(custom1)

//Test Case 3: Tạo Employee
// Tạo 2 Employee.
// Kiểm tra mỗi Employee có id khác nhau.
console.log("test case 3:")

const em1=employeeService.create({name:"hong"})
const em2=employeeService.create({name:"tuyen"})
if(em1.id!==em2.id){
    console.log("Khác id nhé")
}
else{
    console.log("giống id nhé");
    
}

// Test Case 4: Tìm Employee
// Tìm Employee theo id.
// Trả về đúng Employee.
// Thử tìm với id không tồn tại, kết quả phải là null.
console.log("test case 4:")

const res=employeeService.findById(em2.id);
console.log(res);
const resNull=employeeService.findById("nulll");
console.log(resNull);

// Test Case 5: Tạo Project
// Tạo một Project với customerId và employeeId hợp lệ.
// Kiểm tra Project được tạo thành công.
// Kiểm tra console hiển thị thông báo:
console.log("test case 5:")

const project1= projectService.create({
    customerId:custom1.id,
    employeeId:em1.id
})
console.log(project1)

// Test Case 6: Đổi nhân viên phụ trách Project
// Cập nhật employeeId sang một Employee khác.
// Kiểm tra Project được cập nhật.
// Kiểm tra Employee mới nhận được thông báo:
projectService.updateById(project1.id,{employeeId:em2.id})
console.log("test case 6:")
console.log(project1)

// Test Case 7: Cập nhật Project nhưng không đổi Employee
// Chỉ cập nhật customerId.
// Không được gọi receiveNoti().

console.log("test case 7:")
projectService.updateById(project1.id,{customerId:custom1.id});

// Test Case 8: Cập nhật dữ liệu không tồn tại
console.log("test case 8:")
console.log(cusomterService.updateById("not exist",{name:"messi"}))
console.log(employeeService.updateById("not exist",{name:"cr7"}))
console.log(projectService.updateById("no exist",{customerId:custom1.id}));


// Test Case 9 (Khuyến khích)
console.log("test case 9:")
const project2=projectService.create({customerId:"messix11",employeeId:"ronalodox77"});
console.log(project2)