function DefaultFooter(){
    const veTopCV = ["Giới thiệu", "Góc báo chí", "Tuyển dụng", "Liên hệ", "Hỏi đáp", "Chính sách quyền riêng tư", "Cài đặt Cookie", "Điều khoản dịch vụ"];
  const doiTac = ["TestCenter", "TopHR", "ViecNgay", "Happy Time"];
  const hoSoCV = ["Quản lý CV của bạn", "Hướng dẫn viết CV", "Thư viện CV theo ngành nghề", "Review CV"];
  const khamPha = ["Ứng dụng di động TopCV", "Tính lương Gross - Net", "Tính lãi suất kép", "Lập kế hoạch tiết kiệm", "Tính bảo hiểm thất nghiệp", "Tính bảo hiểm xã hội một lần", "Trắc nghiệm MBTI", "Trắc nghiệm MI"];
  const xdSuNghiep = ["Việc làm nổi bật", "Việc làm lương cao", "Việc làm quản lý", "Việc làm IT", "Việc làm Senior", "Việc làm bán thời gian"];
  const quyTacChung = ["Điều kiện giao dịch chung", "Giá dịch vụ & Cách thanh toán", "Thông tin về vận chuyển"];

  // Helper function để render các danh sách link
  const renderList = (title: string, items: string[]) => (
    <div className="mb-6">
      <h3 className="font-bold text-gray-800 mb-3 text-base">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <li key={index} className="hover:text-[#00b14f] cursor-pointer transition-colors duration-200">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="bg-white py-10 px-4 md:px-8 border-t border-gray-200 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Cột 1: Thông tin chung & Liên hệ */}
        <div className="col-span-1 pr-4">
          <div className="mb-6">
            {/* Logo placeholder */}
            <div className="flex items-center mb-2">
              <h1 className="text-4xl font-bold text-gray-800 tracking-tighter">top<span className="text-[#00b14f]">cv</span></h1>
            </div>
            <p className="text-gray-600 font-medium mb-4">Tiếp lợi thế, nối thành công</p>
            
            <div className="flex space-x-2 mb-6">
              {/* Badges placeholders */}
              <div className="h-8 w-24 bg-gray-100 rounded border border-gray-300 flex items-center justify-center text-[10px] text-gray-500">Google Startups</div>
              <div className="h-8 w-12 bg-gray-100 rounded border border-gray-300 flex items-center justify-center text-[10px] text-gray-500">DMCA</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 text-base">Liên hệ</h3>
            <div className="text-sm text-gray-600 space-y-1.5">
              <p>Hotline: <span className="font-bold text-gray-800 hover:text-[#00b14f] cursor-pointer">1900 068 889 | Nhánh 2 (Giờ hành chính)</span></p>
              <p>Email: <span className="font-bold text-gray-800 hover:text-[#00b14f] cursor-pointer">hotro@topcv.vn</span></p>
              <p>Zalo hỗ trợ ứng viên: <span className="font-bold text-gray-800 hover:text-[#00b14f] cursor-pointer">Kết nối ngay →</span></p>
              <p>Fanpage: <span className="font-bold text-gray-800 hover:text-[#00b14f] cursor-pointer">TopCV Vietnam</span></p>
              <p>LinkedIn: <span className="font-bold text-gray-800 hover:text-[#00b14f] cursor-pointer">TopCV Vietnam</span></p>
              <p>Thread: <span className="font-bold text-gray-800 hover:text-[#00b14f] cursor-pointer">TopCV Vietnam</span></p>
              <p>Tiktok: <span className="font-bold text-gray-800 hover:text-[#00b14f] cursor-pointer">TopCV Vietnam</span></p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-gray-800 mb-3 text-base">Ứng dụng tải xuống</h3>
            <div className="flex space-x-3">
              {/* Nút tải App */}
              <div className="h-10 w-28 bg-black rounded cursor-pointer flex items-center justify-center text-white text-xs">App Store</div>
              <div className="h-10 w-28 bg-black rounded cursor-pointer flex items-center justify-center text-white text-xs">Google Play</div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-800 mb-3 text-base">Cộng đồng TopCV</h3>
            <div className="flex space-x-3">
             
              <div className="w-8 h-8 rounded-full bg-gray-500 hover:bg-[#00b14f] cursor-pointer transition-colors duration-200"></div>
              <div className="w-8 h-8 rounded-full bg-gray-500 hover:bg-[#00b14f] cursor-pointer transition-colors duration-200"></div>
              <div className="w-8 h-8 rounded-full bg-gray-500 hover:bg-[#00b14f] cursor-pointer transition-colors duration-200"></div>
              <div className="w-8 h-8 rounded-full bg-gray-500 hover:bg-[#00b14f] cursor-pointer transition-colors duration-200"></div>
            </div>
          </div>
        </div>

        {/* Cột 2 */}
        <div className="col-span-1">
          {renderList("Về TopCV", veTopCV)}
          {renderList("Đối tác", doiTac)}
        </div>

        {/* Cột 3 */}
        <div className="col-span-1">
          {renderList("Hồ sơ và CV", hoSoCV)}
          {renderList("Khám phá", khamPha)}
        </div>

        {/* Cột 4 */}
        <div className="col-span-1">
          {renderList("Xây dựng sự nghiệp", xdSuNghiep)}
          {renderList("Quy tắc chung", quyTacChung)}
        </div>

      </div>
    </footer>
  );
}
export default DefaultFooter;