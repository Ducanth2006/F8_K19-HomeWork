# HƯỚNG DẪN TÁI CẤU TRÚC DỰ ÁN FRONTEND THEO CHUẨN FEATURE-SLICED DESIGN (FSD)

Tài liệu này được biên soạn để hướng dẫn chi tiết từng bước tái cấu trúc dự án React từ trạng thái hiện tại về kiến trúc chuẩn **Feature-Sliced Design (FSD)**.

---

## 📌 1. TỔNG QUAN VỀ KIẾN TRÚC FEATURE-SLICED DESIGN (FSD)

Feature-Sliced Design (FSD) phân chia dự án Frontend thành **6 Tầng kiến trúc (Layers)** phân cấp rõ ràng theo thứ tự từ trên xuống dưới:

```
src/
├── app/          # Layer 6 (Cao nhất): Provider, Routing, Global styles, App init
├── pages/        # Layer 5: Router Pages (HomePage, CompanyPage, CompanyDetailPage)
├── widgets/      # Layer 4: Khối UI tự trị lớn (GlobalHeader, DefaultFooter, DefaultLayout, CategoryMenu)
├── features/     # Layer 3: Tương tác người dùng / Business Actions (JobSearchBar, FavoriteButton, FollowCompanyButton)
├── entities/     # Layer 2: Domain Entities (Company, Job, Category) bao gồm Model, API, UI Cards
└── shared/       # Layer 1 (Thấp nhất): Primitive UI, API Axios instance, Utilities, Common Types
```

---

## 🛑 2. CÁC QUY TẮC BẮT BUỘC TRONG FSD

> [!IMPORTANT]
> 1. **Chiều Import 1 chiều (Unidirectional Dependency)**: 
>    `app` ➔ `pages` ➔ `widgets` ➔ `features` ➔ `entities` ➔ `shared`.
>    *Tầng cấp dưới tuyệt đối KHÔNG ĐƯỢC import từ tầng cấp trên.*
> 2. **Không Cross-Slice Import**: Các Slice cùng tầng (ví dụ: `entities/company` và `entities/job`) không import trực tiếp UI của nhau. Khi cần kết hợp nhiều entities, hãy đưa lên tầng trên (`widgets` hoặc `pages`).
> 3. **Public API (`index.ts`)**: Mỗi module/slice đều có 1 tệp `index.ts` đóng vai trò là "cổng giao tiếp công khai". Bên ngoài chỉ import qua cổng này (ví dụ: `import { CompanyCard } from "@/entities/company"`), không import sâu vào nội bộ (`import ... from "@/entities/company/ui/CompanyCard/index.tsx"`).

---

## 🌳 3. CÂU TRÚC THƯ MỤC MỤC TIÊU (TARGET TREE)

```text
src/
├── app/
│   ├── providers/
│   │   └── router/
│   │       └── AppRouter.tsx
│   ├── styles/
│   │   ├── index.css
│   │   └── App.css
│   ├── App.tsx
│   └── main.tsx
│
├── pages/
│   ├── home/
│   │   ├── ui/HomePage.tsx
│   │   └── index.ts
│   ├── company/
│   │   ├── ui/CompanyPage.tsx
│   │   └── index.ts
│   └── company-detail/
│       ├── ui/CompanyDetailPage.tsx
│       └── index.ts
│
├── widgets/
│   ├── header/
│   │   ├── ui/GlobalHeader.tsx
│   │   └── index.ts
│   ├── footer/
│   │   ├── ui/DefaultFooter.tsx
│   │   └── index.ts
│   ├── layout/
│   │   ├── ui/DefaultLayout.tsx
│   │   └── index.ts
│   └── category-menu/
│       ├── ui/CategoryMenu.tsx
│       ├── ui/MainMenu.tsx
│       ├── ui/SubMenu.tsx
│       └── index.ts
│
├── features/
│   ├── search-job/
│   │   ├── ui/JobSearchBar.tsx
│   │   └── index.ts
│   ├── favorite-job/
│   │   ├── ui/FavoriteButton.tsx
│   │   └── index.ts
│   └── follow-company/
│       ├── ui/FollowCompanyButton.tsx
│       └── index.ts
│
├── entities/
│   ├── company/
│   │   ├── api/companyApi.ts
│   │   ├── model/types.ts
│   │   ├── ui/CompanyCard/
│   │   └── index.ts
│   ├── job/
│   │   ├── api/jobApi.ts
│   │   ├── model/types.ts
│   │   ├── ui/
│   │   │   ├── CompanyJobCard/
│   │   │   └── HomeJobCard/
│   │   └── index.ts
│   └── category/
│       ├── api/categoryApi.ts
│       ├── model/types.ts
│       └── index.ts
│
└── shared/
    ├── api/
    │   └── axios.ts
    ├── lib/
    │   └── moneyFormat/
    ├── types/
    │   └── pagination.ts
    └── ui/
        ├── MoneyFormat/
        └── Pagination/
```

---

## 🛠️ 4. HƯỚNG DẪN THỰC HÀNH CÁC BƯỚC TÁI CẤU TRÚC

### BƯỚC 1: Chuẩn hóa tầng `shared/`

Tầng `shared` chứa mã dùng chung không thuộc về bất kỳ miền nghiệp vụ cụ thể nào.

1. **Tạo `src/shared/types/pagination.ts`**:
   ```ts
   export interface PaginatedResponse<T> {
     data: T[];
     pagination: {
       page: number;
       limit: number;
       total: number;
       totalPages: number;
     };
   }

   export interface PaginationProps {
     currentPage: number;
     totalPages: number;
     onPageChange: (page: number) => void;
     className?: string;
   }
   ```

2. **Cập nhật UI Primitives**:
   - `src/shared/ui/MoneyFormat/index.tsx`: Import `formatVietnameseCurrency` từ `@/shared/lib/moneyFormat`.
   - `src/shared/ui/Pagination/index.tsx`: Import `PaginationProps` từ `@/shared/types/pagination`.

3. **Dọn dẹp**:
   - Xóa `src/shared/interface/index.tsx` (các type sẽ chuyển về đúng `entities/`).
   - Xóa `src/shared/ui/Button/index.tsx` (tệp rỗng).

---

### BƯỚC 2: Chuẩn hóa tầng `entities/`

Tách rời 3 thực thể chính: **Company**, **Job**, và **Category**.

#### 2.1. Entity Company (`src/entities/company`)
1. **Model (`src/entities/company/model/types.ts`)**:
   ```ts
   export interface ICompanyCard {
     id: string;
     short_name: string;
     card_media: string;
     short_description: string;
     logo_url: string;
   }

   export interface ICompanyDetail {
     id: number;
     company_name: string;
     website: string;
     tax_code: string;
     director: string;
     email: string;
     phone_number: string;
     company_size: string;
     category: string;
     address_list: IAddress[];
     description_html: string;
     logo_url: string;
   }

   export interface IAddress {
     city_id: number;
     city_name: string;
     address_detail: string;
   }
   ```

2. **API (`src/entities/company/api/companyApi.ts`)**:
   ```ts
   import api from "@/shared/api";
   import type { ICompanyCard, ICompanyDetail } from "../model/types";

   export const getCompanies = async (): Promise<ICompanyCard[] | undefined> => {
     try {
       const res = await api.get("/companies");
       return res.data;
     } catch (e) {
       console.error("Lỗi khi lấy danh sách công ty:", e);
     }
   };

   export const getCompanyById = async (id: string): Promise<ICompanyDetail | undefined> => {
     try {
       const res = await api.get(`/companies/${id}`);
       return res.data;
     } catch (e) {
       console.error("Lỗi khi lấy chi tiết công ty:", e);
     }
   };
   ```

3. **UI (`src/entities/company/ui/CompanyCard/index.tsx`)**:
   - Di chuyển `CompanyCard` từ `pages/company/ui/CompanyCard/index.tsx` về đây.
   - Sửa import: `import type { ICompanyCard } from "../../model/types";`.

4. **Public API (`src/entities/company/index.ts`)**:
   ```ts
   export * from "./model/types";
   export * from "./api/companyApi";
   export { default as CompanyCard } from "./ui/CompanyCard";
   ```

#### 2.2. Entity Job (`src/entities/job`)
1. **Model (`src/entities/job/model/types.ts`)**:
   ```ts
   import type { ICompanyCard } from "@/entities/company";

   export interface ISalary {
     min: number;
     max: number;
     currency: string;
     is_negotiable: boolean;
   }

   export interface IJobCard {
     id: string;
     title: string;
     slug: string;
     category: string;
     job_type: string;
     experience_level: string;
     gender: string;
     quantity: string;
     salary: ISalary;
     deadline: string;
     status: string;
     is_hot: boolean;
     description_html: string;
     requirements_html: string;
     benefits_html: string;
     company: ICompanyCard;
   }
   ```

2. **API (`src/entities/job/api/jobApi.ts`)**:
   ```ts
   import api from "@/shared/api";
   import type { IJobCard } from "../model/types";

   export const getJobsByCompanyId = async (id: string): Promise<IJobCard[] | undefined> => {
     try {
       const res = await api.get(`/jobs?company.id=${id}`);
       return res.data;
     } catch (e) {
       console.error("Lỗi khi lấy danh sách việc làm theo ID công ty:", e);
     }
   };
   ```

3. **UI (`src/entities/job/ui/`)**:
   - `CompanyJobCard/index.tsx`: Sửa đường dẫn import `MoneyFormat` từ `@/shared/ui/MoneyFormat`.
   - `HomeJobCard/index.tsx`: Đổi đuôi tệp từ `.jsx` sang `.tsx`, sửa import `MoneyFormat` từ `@/shared/ui/MoneyFormat`.

4. **Public API (`src/entities/job/index.ts`)**:
   ```ts
   export * from "./model/types";
   export * from "./api/jobApi";
   export { default as CompanyJobCard } from "./ui/CompanyJobCard";
   export { default as HomeJobCard } from "./ui/HomeJobCard";
   ```

#### 2.3. Entity Category (`src/entities/category`)
1. **Model (`src/entities/category/model/types.ts`)**:
   ```ts
   export interface ICategory {
     id: string;
     name: string;
     slug: string;
   }

   export interface ICategoryGroup {
     id: string;
     group_name: string;
     group_slug: string;
     categories?: ICategory[];
   }
   ```

2. **API (`src/entities/category/api/categoryApi.ts`)**:
   ```ts
   import api from "@/shared/api";
   import type { PaginatedResponse } from "@/shared/types/pagination";
   import type { ICategoryGroup } from "../model/types";

   export const getCategoryGroup = async (
     page: number = 1,
     limit: number = 6
   ): Promise<PaginatedResponse<ICategoryGroup>> => {
     const res = await api.get("/category_groups", {
       params: { _page: page, _per_page: limit },
     });
     const result = res.data;
     return {
       data: result?.data || [],
       pagination: {
         page,
         limit,
         total: result?.items || 0,
         totalPages: result?.pages || 1,
       },
     };
   };
   ```

3. **Public API (`src/entities/category/index.ts`)**:
   ```ts
   export * from "./model/types";
   export * from "./api/categoryApi";
   ```

*(Sau khi hoàn thành Bước 2, **xóa hoàn toàn thư mục `src/services/`**).*

---

### BƯỚC 3: Tách tầng `features/`

Tạo các thành phần tương tác người dùng có thể tái sử dụng:

1. **`features/search-job/ui/JobSearchBar.tsx`**: Tách form tìm kiếm từ trang Home và Company.
2. **`features/favorite-job/ui/FavoriteButton.tsx`**: Tách nút bấm thả tim biểu tượng trái tim.
3. **`features/follow-company/ui/FollowCompanyButton.tsx`**: Tách nút `+ Theo dõi` từ trang Chi tiết công ty.

---

### BƯỚC 4: Chuẩn hóa tầng `widgets/`

Ghép nối các entities và features thành các khối UI lớn:

1. **`widgets/header/ui/GlobalHeader.tsx`**: Di chuyển từ `src/components/GlobalHeader/index.tsx`.
2. **`widgets/footer/ui/DefaultFooter.tsx`**: Di chuyển từ `src/layout/defaultLayout/footer/index.tsx`.
3. **`widgets/layout/ui/DefaultLayout.tsx`**: Kết hợp Header, Outlet, ToastContainer và Footer.
4. **`widgets/category-menu/`**: Di chuyển toàn bộ cụm Menu (`Menu`, `MainMenu`, `SubMenu`) từ `src/pages/home/ui/Menu/` về đây.

*(Sau khi hoàn thành Bước 4, **xóa hoàn toàn thư mục `src/components/` và `src/layout/`**).*

---

### BƯỚC 5: Chuẩn hóa tầng `pages/`

Cập nhật các trang để chỉ import và lắp ráp từ `widgets`, `features`, và `entities`:

1. **`pages/home/ui/HomePage.tsx`**: Lắp ráp `JobSearchBar`, `CategoryMenu`, danh sách `HomeJobCard`.
2. **`pages/company/ui/CompanyPage.tsx`**: Lắp ráp `JobSearchBar` và grid `CompanyCard`.
3. **`pages/company-detail/ui/CompanyDetailPage.tsx`**: Gọi API từ `@/entities/company` và `@/entities/job`, hiển thị chi tiết và danh sách công việc.
4. **Dọn dẹp**: Xóa thư mục rỗng `pages/ListJob` và `pages/job`.

---

### BƯỚC 6: Chuẩn hóa tầng `app/`

1. **Di chuyển AppRouter**: Đưa `AppRouter.tsx` về `src/app/providers/router/AppRouter.tsx`.
2. **Di chuyển Styles**: Đưa `index.css` và `App.css` về `src/app/styles/`.
3. **Di chuyển App Root**: Đưa `App.tsx` về `src/app/App.tsx`.
4. **Cập nhật Entry point**: Trong `src/main.tsx` (hoặc `src/app/main.tsx`):
   ```tsx
   import { createRoot } from 'react-dom/client';
   import '@/app/styles/index.css';
   import App from '@/app/App';

   createRoot(document.getElementById('root')!).render(<App />);
   ```

---

## 🧪 5. VERIFICATION (KIỂM TRA & NGHIỆM THU)

1. **Kiểm tra TypeScript strict build**:
   ```powershell
   npm run build
   ```
   *Nếu build ra kết quả thành công không bị error compile nghĩa là hệ thống import FSD đã hoàn toàn chính xác.*

2. **Chạy thử nghiệm giao diện**:
   ```powershell
   npm run dev
   ```
   - Test router chuyển giữa các trang `/`, `/cong-ty`, `/cong-ty/:id`.
   - Test tính năng hover menu danh mục, phân trang và tìm kiếm.
