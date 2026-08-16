export * from "./model/types"
export * from "./api"
export { default as CompanyCard } from "./ui/CompanyCard";//Mục đích: Giúp phía consumer có thể import đồng bộ dạng named import cùng lúc với types và API:
// tránh phải CompanyCard tách ra {getCompany...} gộp hết vào luôn 