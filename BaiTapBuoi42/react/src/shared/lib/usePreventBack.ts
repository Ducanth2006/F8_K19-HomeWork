// usePreventBack.ts
import { useEffect } from 'react';

export const usePreventBack = (when: boolean, message: string = 'Bạn có thay đổi chưa lưu. Bạn có chắc muốn rời đi?') => {
  useEffect(() => {
    if (!when) return;

    // Đẩy một trạng thái giả lập vào stack để đón đầu nút Back
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      // Khi người dùng bấm Back
      const confirmLeave = window.confirm(message);

      if (!confirmLeave) {
        // Nếu chọn "Ở lại", nhét lại state vào stack để tiếp tục chặn
        window.history.pushState(null, '', window.location.href);
      } else {
        // Nếu đồng ý, cho lùi lại thật
        window.history.back();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [when, message]);
};