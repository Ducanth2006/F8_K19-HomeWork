export function formatVietnameseCurrency(amount: number, decimalDigits: number = 2): string {
  if (amount === undefined || amount === null || isNaN(amount)) return "0 đ";
  if (amount === 0) return "0 đ";

  // Xử lý số âm
  if (amount < 0) {
    return `-${formatVietnameseCurrency(Math.abs(amount), decimalDigits)}`;
  }

  // Từ 1 Tỷ trở lên
  if (amount >= 1_000_000_000) {
    const val = Number((amount / 1_000_000_000).toFixed(decimalDigits));
    return `${val} tỷ`;
  }

  // Từ 1 Triệu trở lên
  if (amount >= 1_000_000) {
    const val = Number((amount / 1_000_000).toFixed(decimalDigits));
    return `${val} triệu`;
  }

  // Từ 1 Nghìn trở lên
  if (amount >= 1_000) {
    const val = Number((amount / 1_000).toFixed(decimalDigits));
    return `${val} nghìn`;
  }

  // Dưới 1 Nghìn
  return `${amount} đ`;
}