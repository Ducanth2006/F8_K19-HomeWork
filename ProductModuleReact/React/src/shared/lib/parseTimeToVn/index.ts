export const parseTimeVn = (time: string | undefined): string => {
  if (!time) return "invalid time";
  const date = new Date(time);
  const vnTime = date.toLocaleDateString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour12: false,
  });
  return vnTime;
};
