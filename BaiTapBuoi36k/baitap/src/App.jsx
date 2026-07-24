import { useState } from "react";
import { products } from "./mockData/data";
import ProductCard from "./component/ProductCard"; // component ko cần ngoặc
function App() {
  const [type, setType] = useState("Điện thoại");
  const [brand, setBrand] = useState("Tất cả");
  const arrBrand = [
    "Tất cả",
    ...new Set(
      products
        .filter((p) => {
          return p.type === type;
        })
        .map((p) => p.brand),
    ),
  ];
  // nó sẽ gom 2 lần set này lại rồi render đúng 1 lần 
  const handleChangeType = (type) => {
    setType(type);
    setBrand("Tất cả");
  };
  const filteredProduct = products.filter((p) => {
    const matchType = p.type === type;
    const matchBrand = brand === "Tất cả" || p.brand === brand;
    return matchType && matchBrand;
  });
  const renderBrand=(arr)=>{
    return arr.map((b,index)=><span key={index} className="mt-5 py-2 px-3 rounded-3xl bg-gray-400 text-black font-semibold duration-150 hover:bg-gray-200 " onClick={()=>setBrand(b)}>{b}</span>)
  }
  return (
    <>
      
      <div className="w-[1000px] mt-10 h-auto mx-auto bg-slate-200 flex flex-col">
        {/* Type include phone or tablet */}
        <div className="grid grid-cols-4 gap-4 border-b pb-3">
          <button
            type="button"
            className={`col-span-2 text-center py-2 transition-colors  cursor-pointer font-bold ${
              type === "Điện thoại"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-red-500"
            }`}
            onClick={() => handleChangeType("Điện thoại")}
          >
            Điện thoại
          </button>

          <button
            type="button"
            className={`col-span-2 text-center py-2 transition-colors cursor-pointer font-bold ${
              type === "Máy tính bảng"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-red-500"
            }`}
            onClick={() => handleChangeType("Máy tính bảng")}
          >
            Máy tính bảng
          </button>
        </div>
        {/* Brands follow type  */}
        <div className="flex flex-wrap gap-3">
          {renderBrand(arrBrand)}
        </div>
        {/* Product list */}
        <div className="mt-4 grid grid-cols-12 gap-3 ">
          {filteredProduct.map((p,index)=>{
            return <ProductCard key={index} product={p}/>
          })}
        </div>
      </div>
    </>
  );
}

export default App;
