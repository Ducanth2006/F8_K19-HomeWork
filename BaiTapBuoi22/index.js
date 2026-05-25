const invoiceData = {
  meta: {
    invoiceNo: "WM-2026-052101",
    saleDate: "2026/05/21",
    currency: "đ"
  },
  seller: {
    name: "WinMark 2 Hai Bà Trưng",
    slogan: "Cung cấp sản phẩm thời trang cao cấp & thiết kế độc quyền.",
    address: "2 Bà Trưng - Hoàn Kiếm - HN",
    phone: "012345678"
  },
  customer: {
    name: "Nguyễn Văn A",
    age: 20,
    address: "Hà Đông, Hà Nội"
  },
  items: [
    { no: 1, name: "Áo Thun", size: "XL", quantity: 1, price: 200000 },
    { no: 2, name: "Áo Thun", size: "XL", quantity: 1, price: 200000 }
  ],
  promotion: {
    description: "Khuyến mãi 50% dành cho Khách hàng thân thiết",
    discountAmount: 200000
  },
  totals: {
    subTotal: 400000,
    finalTotal: 200000
  }
};
// fill data header and seller
document.getElementById('storeName').innerHTML = invoiceData['seller']['name'];
document.getElementById('slogan').innerHTML = invoiceData['seller']['slogan'];
document.getElementById('invoiceNo').innerHTML = invoiceData['meta']['invoiceNo'];
document.getElementById('saleDate').innerHTML = invoiceData['meta']['saleDate'];
document.getElementById('sellerName').innerHTML = invoiceData['seller']['name'];
document.getElementById('sellerAddress').innerHTML = invoiceData['seller']['address'];
document.getElementById('sellerPhone').innerHTML = invoiceData['seller']['phone'];
// fill data customer
document.getElementById('customerName').innerHTML = invoiceData['customer']['name'];
document.getElementById('customerAge').innerHTML = invoiceData['customer']['age'];
document.getElementById('customerAddress').innerHTML = invoiceData['customer']['address'];
// fill data to items
const currency = invoiceData['meta']['currency'];
let trTagsHtml = "";
invoiceData['items'].forEach(item => {
  const sumItemPrice = item.price * item.quantity;
  trTagsHtml += `
   <tr>
      <td class="border border-gray-400 p-2">${item.no}</td>
      <td class="border border-gray-400 p-2">${item.name}</td>
      <td class="border border-gray-400 p-2">${item.size}</td>
      <td class="border border-gray-400 p-2">${item.quantity}</td>
      <td class="border border-gray-400 p-2">${item.price + currency}</td>
      <td class="border border-gray-400 p-2">${sumItemPrice + currency}</td>
  </tr>`;
})
document.getElementById('items').innerHTML = trTagsHtml;
//fill data to footer invoice
document.getElementById('promotionDesc').innerHTML = invoiceData['promotion']['description'];
document.getElementById('subTotal').innerHTML = invoiceData['totals']['subTotal'];
document.getElementById('discountAmount').innerHTML = invoiceData['promotion']['discountAmount'];
document.getElementById('finalTotal').innerHTML=invoiceData['totals']['finalTotal'];