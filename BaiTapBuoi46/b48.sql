-- b1 lấy la danh sách công ty và các job của công ty đó (jobs là dạng json_agg)
select c.name , json_agg(json_build_object('job_id',j.id,
'job_title',j.title))
from company c 
left join job j on j.company_id=c.id
where j.active and c.active
group by c.name ;
-- b2 ấy ra 3 tỉnh thành có nhiều công ty trong hệ thống nhất
-- trong đó cần có companies (json_agg)
select p.id, p.name ,count(distinct c.id) as total_company, coalesce(
json_agg(distinct jsonb_build_object('company_id',c.id,'company_name',c.name)
)filter (where c.id is not null),'[]'::json)

from province p
join company_address c_a on c_a.province_id=p.id
join company c on c.id=c_a.company_id 
where p.active and c_a.active and c.active 
group by p.id , p.name 
order by total_company desc
limit 3;
-- b3 
-- lấy ra ds công cty và các địa chỉ của công ty đó (address dưới dạng json_agg bao gồm id-tên tỉnh- tên xã-địa chỉ chi tiết) 
-- sắp xếp theo các tỉnh có số cty từ nhiều đến ít
with company_count_by_province as (
  select com_a.province_id as province_id , count(com_a.company_id) as total_company
  from company_address com_a
  group by com_a.province_id
)

select c.id as company_id ,
c.name as company_name ,
coalesce(
json_agg( jsonb_build_object('company_address',a.id,'pronvince_name',p.name,'ward_name',w.name,'address_detail',a.address_detail) ),'[]'::json
) as address 
from company_address a 
join company c on c.id =a.company_id
join province p on a.province_id=p.id
join ward w on a.ward_id =w.id 
join  company_count_by_province com_total on p.id = com_total.province_id 
group by c.id , c.name
order by max(com_total.total_company) desc

