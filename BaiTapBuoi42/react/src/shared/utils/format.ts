export const formatVND = (value: string | number, includeText: boolean = true): string => {
  if (!value) return "0";
  
  // 1. Loại bỏ các ký tự không phải số và chuyển về số nguyên
  const cleanString: string = value.toString().replace(/\D/g, "");
  const number: number = parseInt(cleanString, 10);
  
  if (isNaN(number)) return "0";

  // 2. Dùng Intl.NumberFormat để tự động phân tách hàng nghìn bằng dấu chấm
  const formattedNumber: string = new Intl.NumberFormat("vi-VN").format(number);

  // 3. Trả về kết quả kèm hậu tố tương ứng
  if (includeText) {
    return `${formattedNumber} nghìn đồng`;
  }
  
  return `${formattedNumber} đ`;
};