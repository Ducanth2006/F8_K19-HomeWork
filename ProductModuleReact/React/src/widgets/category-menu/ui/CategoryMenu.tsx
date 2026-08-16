import { useState, useEffect, useRef } from "react";
import MainMenu from "../ui/MainMenu";
import type { ICatiegoryGroup } from "@/entities/category";
import { getCategoryGroup } from "@/entities/category";
import SubMenu from "../ui/SubMenu";
const pageLimit = 6;
function Menu() {
  const [cateGroups, setCateGroups] = useState<ICatiegoryGroup[]>([]);
  const [currentPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [hoveredGroupId, setHoveredGroupId] = useState<string | number | null>(
    null,
  );
  const hoverTimeOutRef = useRef<number | null>(null); // kỹ thuật Hover Debouncing
  useEffect(() => {
    const getCateGroups = async () => {
      setLoading(true);
      try {
        const result = await getCategoryGroup(currentPage, pageLimit);
        setCateGroups(result.data);
        setCurPage(result.pagination.page);
        setTotalPages(result.pagination.totalPages);
      } catch (e) {
        console.log("get cate groups pagination có lỗi ");
      } finally {
        setLoading(false);
      }
    };
    getCateGroups();
  }, [currentPage]);
  const handlePageChange = (page: number) => {
    setCurPage(page);
  };
  // ta sẽ có truyền hàm xử lý hover xuống MainMenu và ta sẽ định nghĩa ở cha ,áp dũng kỹ thuật debouncing hover giúp tránh gửi nhiều api
  const handleMouseEnterGroup = (id: string | number) => {
    // kiểm tra xem có đang đợi gọi api nào ko có thì xóa bỏ để set Time out lại
    if (hoverTimeOutRef.current) clearTimeout(hoverTimeOutRef.current);
    // set time out
    hoverTimeOutRef.current = setTimeout(() => {
      setHoveredGroupId(id);
    }, 250);
  };
  // hàm onMouseLeave
  const handleMouseLeave = () => {
    // kiểm tra xem có đang gọi api giữa trừng ko
    if (hoverTimeOutRef.current) clearTimeout(hoverTimeOutRef.current);
    setHoveredGroupId(null);
  };
  return (
    <div
      className="grid grid-cols-12 gap-2  mt-3 "
      onMouseLeave={handleMouseLeave}
    >
      <MainMenu
        cateGroups={cateGroups}
        currentPage={currentPage}
        totalPages={totalPages}
        isLoading={isLoading}
        onPageChange={handlePageChange}
        onHoverGroup={handleMouseEnterGroup}
        activeGroupId={hoveredGroupId}
      />
      {/* sẽ có một event ở đây nếu các cateGroups của main menu đc hover tức onMouseEnter (sẽ lấy id của cateGroups) thì sẽ img sẽ bị ẩn và thay và đó là sub menu sẽ gọi api rồi từ gender  */}
      <div className="w-full  col-span-8  h-68">
        {!hoveredGroupId && (
          <img
            src="https://www.topcv.vn/v4/image/mb-life/banner-v3.png"
            className="w-full  rounded-2xl object-cover overflow-hidden h-68"
            alt=""
          />
        )}
        {hoveredGroupId&&(<SubMenu cateGroups={cateGroups} id={hoveredGroupId} />)}
      </div>
    </div>
  );
}
export default Menu;
