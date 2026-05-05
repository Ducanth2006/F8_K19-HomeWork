//Bài 1 
const student = {
  name: 'hoang',
  parent: {
    name: 'bo hoang'
  }
}

const mentor = { ...student }

mentor.name = 'bang'
mentor.parent.name = 'bo bang'

console.log(student)
console.log(mentor)
// Trả lời câu hỏi 
// Câu 1 student.name có bị đổi không? : Câu trả lời là Không ạ.
// Câu 2 student.parent.name có bị đổi không?: câu trả lời là có ạ . 
// Câu 3 Giải thích vì sao? : Vì ta đã sao chép nông bằng {...student} nên nó tạo ra đối tượng mentor mới và vì name là kiểu nguyên thủy (String) ở tầng ngoài cùng nên nó được copy trực tiếp giá trị sang object mentor mới , 
// nhưng vì là sao chép nông nên các đối tượng con lồng nhau (parent) của nó không được tạo mới mà thay vào đó nó chép địa chỉ tham chiếu ạ do vậy mentor.parent và student.parent cùng chỏ đến 1 vùng nhớ


//Bài 2 
const student = {
  name: 'hoang',
  parent: {
    name: 'bo hoang'
  }
}

const mentor = JSON.parse(JSON.stringify(student))

mentor.parent.name = 'bo bang'

console.log(student)
console.log(mentor)
//Trả lời câu hỏi 
//Câu 1 student.parent.name có bị ảnh hưởng không? Câu trả lời là không ạ 
//Câu 2 Vì sao cách này khác spread (const mentor = { ...student })?
//  Câu trả lời là do nó tạo ra một string mới bằng JSON.stringify(student) sau đó JSON.parse cấp phát ô nhớ mới hoàn toàn trở thành một object mới .Nói cách khác đây là deep copy khác với shallow copy (const mentor = { ...student })


//Bài 3 
const students = [
  { name: 'a' },
  { name: 'b' }
]

const newStudents = [...students]

newStudents[0].name = 'z'

console.log(students)
console.log(newStudents)

// Câu 1 Mảng  có bị thay đổi không? câu trả lời là không do có shallow copy  
// Câu 2 Phần tử bên trong có bị không? câu trả lời có vởi vì do shallow copy 


// Bài 4
const user = {
  name: 'hoang',
  address: {
    city: 'HN',
    location: {
      lat: 123
    }
  }
}

const newUser = { ...user }

newUser.address.location.lat = 999

console.log(user.address.location.lat)

// Câu 1 Kết quả là bao nhiêu? Vì sao?
// là 999 bởi vì shallow copy chỉ tạo ra đối tượng newUser mới cho lớp cha và
//  thuộc tính name: 'hoang' là giá trị nguyên thủy (primitive) nên được sao chép thẳng giá trị sang object mới
// Thuộc tính address là một object lồng bên trong, nên nó chỉ sao chép địa chỉ tham chiếu.tương tự với location cx chỉ sao chép địa chỉ tham chiếu ạ