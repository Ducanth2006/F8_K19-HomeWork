Câu 1
Id selector có độ ưu tiên lớn nhất
câu 2
Selectỏr id main sẽ thắng vì nó có độ ưu tiên cao nhất trong selector
câu 3
thì màu sẽ là pink và inline style có độ ưu tiên cao hơn id selector
câu 4
bởi vì theo độ ưu tiên trong css , đó chính là thứ tự ta khai báo thẻ link dùng cho file css, file nào khai báo ở dưới thì file đó sẽ đc ưu tiên hơn tức là ghi đè thuôc tính
câu 5
cái đó là do cú pháp selector ở từng phần khác nhau ví dụ
nếu ta chỉ khai báo .title theo file base thì nó sẽ có màu theo file đó , khi ta ghi thêm như h2.title có độ ưu tiên cao hơn và cho màu khác với màu ở base thì sẽ được ghi đè do vậy sẽ có màu khác nhau giữa các phần tử đều dùng class là .title
câu 6

<h2 class="title" id="special" style="color: bisque">Danh sach don hang</h2>
thẻ trên có css phức tạp nhâts
có tag,class,id select tag độ lên nó
hơn nữa còn có inline style có độ ưu tiên cao hơn các selector kia 
ko selector nào thắng cả vì style inline thắng kkk
