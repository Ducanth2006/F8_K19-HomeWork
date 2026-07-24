function ProductCard({ product }) {
  return (
    <>
      <div className="col-span-3 bg-neutral-50 rounded-2xl h-[450px] flex flex-col justify-between overflow-hidden">
        {/* Img */}
        <img src={product.img} alt={product.name} className="h-60  object-contain duration-100 hover:scale-125" />
        <div className="p-3">
          <h3 className="line-clamp-2 font-semibold text-sm">{product.name}</h3>
          <div>
            <span className="text-red font-bold">{product.discountPrice}</span>
            <span className="line-through text-gray-500 text-sm">
              {product.originalPrice}
            </span>
          </div>
          <div className="bg-blue-300 text-blue-500 rounded-lg p-1.5 text-[8px]">
            S-member giảm đến 500.000Đ
          </div>
          <div className="bg-violet-300 text-violet-500 rounded-lg p-1.5 text-[8px] ">
            Sinh viên giảm tới {product.discountPrice * 0.01}Đ
          </div>
          {/* footer */}
          <div className="flex justify-between text-blue-300 mt-3">
            <div className="flex gap-3  text-xs">
              <i className="fa-regular fa-truck"></i>
              <span>2 giờ</span>
              <div>⭐{product.rating}</div>
            </div>
            <div className="hover:text-red-500"><i className="fa-regular fa-heart"></i></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductCard;
