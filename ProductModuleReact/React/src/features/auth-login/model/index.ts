import * as z from "zod"

export const loginSchema=z.object({
    email:z.email("Không phải định dạng email"),
    password:z.string("không phải string").min(8,"không đủ 8 ký tự")
})
export type loginRequest=z.infer<typeof loginSchema>