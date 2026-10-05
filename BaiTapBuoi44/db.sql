CREATE TABLE customer(
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INT,
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by int,
    modified_at TIMESTAMPTZ,
    modified_by INT,
    deleted_at TIMESTAMPTZ,
    deleted_by INT,
    active BOOLEAN DEFAULT TRUE
);
INSERT INTO customer(name,age,address,active) VALUES
('Nguyễn Đức Anh',25,'Hà Nội',true),
('Nguyễn Văn Minh',10,'Hà Nội',false),
('Phạm Thị Mai', 22, 'TP.HCM', false),
('Vũ Hoàng Long', 17, 'Hải Phòng', true),
('Đặng Thu Thảo', 28, 'Cần Thơ', true),
('Bùi Văn Hùng', 40, 'Nghệ An', false),
('Đỗ Thúy Vy', 19, 'Bình Dương', true),
('Ngô Quốc Anh', 35, 'Đồng Nai', true),
('Nguyễn Hải Yến', 24, 'Quảng Ninh', true),
('Hoàng Đức Kiên', 31, 'Huế', false),
('Lý Minh Triết', 21, 'Nha Trang', true),
('Phan Hồng Nhung', 27, 'Vũng Tàu', true),
('Dương Đình Bảo', 45, 'Thanh Hóa', false);
-- lấy các khách hàng active =true
SELECT * FROM customer 
WHERE active=TRUE;
-- Lấy khách hàng trên 30 tuổi.
SELECT * FROM customer
WHERE age > 30 ;
-- Lay khach hang o ha noi
SELECT * FROM customer
WHERE address = 'Hà Nội';
SELECT * FROM customer
WHERE name ILIKE '%An%';
-- thay đổi cấu trúc bảng
ALTER TABLE customer
    ADD COLUMN IF NOT EXISTS email TEXT,
    ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
    ADD COLUMN IF NOT EXISTS gender VARCHAR(20);
SELECT * FROM customer;
-- cập nhật các trường mới
UPDATE customer AS c 
SET
    email=v.email,
    phone=v.phone,
    gender=v.gender
FROM (VALUES 
    (1, 'nguyenvana@gmail.com', '0901234567', 'male'),
    (2, 'tranthib@gmail.com',   '0912345678', 'female'),
    (3, 'lethic@gmail.com',     '0923456789', 'female'),
    (4, 'phamvand@gmail.com',   '0934567890', 'male'),
    (5, 'hoangvane@gmail.com',  '0945678901', 'male'),
    (6, 'dangthif@gmail.com',   '0956789012', 'female'),
    (7, 'buiducg@gmail.com',    '0967890123', 'male'),
    (8, 'vothih@gmail.com',     '0978901234', 'female'),
    (9, 'domini@gmail.com',     '0989012345', 'male'),
    (10, 'ngothik@gmail.com',   '0990123456', 'female'),
    (11, 'duongvanl@gmail.com', '0812345678', 'male'),
    (12, 'lythim@gmail.com',    '0823456789', 'female'),
    (13, 'phanvann@gmail.com',  '0834567890', 'male'),
    (14, 'tranquoct@gmail.com', '0845678901', 'male'),
    (15, 'nguyenphuu@gmail.com','0856789012', 'female')
) AS v(id,email,phone,gender)
WHERE c.id = v.id;

-- update thoong tin mot so khach hang
UPDATE customer
SET age=19
WHERE id%2 = 0;

-- cap nhat modifyed at modify by
UPDATE customer
SET 
    modified_at= NOW(),
    modified_by= 1;

