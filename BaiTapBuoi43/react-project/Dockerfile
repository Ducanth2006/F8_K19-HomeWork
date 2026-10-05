#  chọn môi trường nền tảng có sẵn 
FROM node:22-alpine
# giúp các thư viện hay các file được cài từ app/web này thay vì root
WORKDIR /app/web
# giúp copy các file chứa cần cài thư viện j hay file mô tả thư viện giúp tăng tốc khi sửa code nếu ko cài thư viện 
COPY package*.json ./
RUN npm install
# Copy toàn bộ mã nguồn của dự án vào thư mục làm việc 
COPY . .
# Mở cổng làm việc 
EXPOSE 5173
#  Exec form (dạng mảng) thay vì shell form (npm run dev -- --host)
CMD ["npm","run","dev","--","--host"]