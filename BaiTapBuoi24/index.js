let products=[]
async function getProduct() {
    try{
        const res=await fetch("https://fakestoreapi.com/products",{
            method:"GET",
            headers:{
                Accept:"application/json"
            }
        })
        products= await res.json();
        // render function
        renderProduct(products);
        renderCate(products);
        console.log("ren thành công")

    }
    catch(error){
        console.log("KHông thể lấy api",error);
    }
}
function renderProduct(products){
    const list=document.querySelector(".productList");
    list.innerHTML=products.map(product=>{
        return `<li class="bg-white flex flex-col justify-between h-full rounded-lg shadow p-4  relative hover:scale-105 hover:duration-100">
      <div class="w-full h-80 overflow-hidden rounded-md relative">
        <p class="absolute top-1 left-1  text-gray-100 px-2 py-1 rounded">${product.category}</p>
        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover" />
      </div>
      <h3 class="text-lg font-semibold mt-3">${product.title}</h3>
      <div class="text-yellow-500 text-sm mb-2">⭐<span>${product.rating.rate}(${product.rating.count})</span></div>
      
      <div class="flex justify-between ">
                <p class="text-[#A199EF] font-bold text-xl">$${product.price}</p>
                <div

                  class="add-btn  bg-black text-white w-10 h-10 rounded-md flex justify-center items-center cursor-pointer"
                >
                  <i class="fa-solid fa-cart-shopping pointer-events-none"></i>
                </div>
              </div>
    </li>`;

    }).join("")
}
function renderCate(products){
    const cate=document.querySelector(".categoryList");
    const listCate=[...new Set(products.map(p=>p.category))];
    let html = `<li data-category="all" class="category-item font-semibold capitalize py-2 px-4 hover:bg-gray-100 cursor-pointer border-b text-left text-[#A199EF]">
        Tất cả sản phẩm
    </li>`;

    html += listCate.map(category => {
        return `<li data-category="${category}" class="category-item capitalize py-2 px-4 hover:bg-gray-100 cursor-pointer border-b last:border-0 text-left text-[#A199EF]">
            ${category}
        </li>`;
    }).join("");

    cate.innerHTML = html;
}
// sự kiện click cate 
const cateUi=document.querySelector(".categoryList");
cateUi.addEventListener("click",(e)=>{
    
   
    const clickedCate=e.target.closest(".category-item").getAttribute("data-category").toLowerCase().trim();
    if(clickedCate=="all"){
        renderProduct(products);
    }
    else{
        const filteredProducts=products.filter(p=>
            p.category.toLowerCase().trim()===clickedCate
        )
        renderProduct(filteredProducts);
    }
})
function renderAmount(amount){
    const amountUi=document.querySelector(".amount");
    amountUi.innerText=amount;
}
let amount=0;
const productUi=document.querySelector(".productList");
productUi.addEventListener("click",(e)=>{
   if(e.target.classList.contains("add-btn")){
    amount+=1;
    renderAmount(amount);
   }

})
getProduct();
// some bugs
// e.target.classList.contains với contains thì class ko cần . nhé
// e.target.closest(".category-item").getAttribute("data-category") có tác dụng nhận biết xem thg nào đang đc bấm bởi vì
//  ờ ta thêm listener ở thẻ cha mà chứ phải thẻ con đâu
// =[...new Set(products.map(p=>p.category))] Set viết hoa nhé ko phải set đâu 
// nên có .join("") nhé để nó nối chuỗi và xóa bỏ dấu , trong [] nhé