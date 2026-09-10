import * as z from "zod"
export const candidateRegisterSchema =z.object({
    email:z.email("không phải định dạng email"),
    password:z.string("không phải string").min(8,"Tối thiểu 8 ký tự"),
    full_name:z.string("không phải string")
})
// ép thành type thay cho interface 
export type candidateRegisterRequest =z.infer<typeof candidateRegisterSchema>;
