
import { formatVietnameseCurrency } from "@/shared/lib/moneyFormat";

interface MoneyFormatProps {
  amount: number;
  className?: string;
  showRawTooltip?: boolean; // Tùy chọn: Rê chuột vào hiện số tiền gốc đầy đủ
}

export default function MoneyFormat({
  amount,
  className = "",
  showRawTooltip = true,
}: MoneyFormatProps) {
  const formattedText = formatVietnameseCurrency(amount);
  const rawFormatted = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);

  return (
    <span
      className={`font-semibold text-emerald-600 ${className}`}
      title={showRawTooltip ? rawFormatted : undefined}
    >
      {formattedText}
    </span>
  );
}