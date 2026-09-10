import * as z from "zod"
export const employerRegiseterSchema=z.object({
    tax_code:z.string("không phải string").min(1,"Không thể để trống mã số thuế"),
    company_name:z.string("không phải string").min(1,"Khổng thể để trống tên công ty "),
    international_name:z.string().optional(),
    director:z.string("không phải string").optional(),
    headquarters_address:z.string("không phải string").optional(),
    email:z.email("không phải email").min(1,"Không thể để trống email"),
    phone_number:z.string("không phải string").min(1,"Không thể để trống số điện thoại"),
    website:z.string("không phải string").optional(),
    password:z.string("không phải string").min(8,"Ít nhất 8 ký tự "),
    short_name: z.string().nullable().optional(),
})
export type employerRegisterRequest=z.infer<typeof employerRegiseterSchema>