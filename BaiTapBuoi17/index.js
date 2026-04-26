// Bài 1
const isEvenNumber=(number)=>{
    return number%2===0 ? true:false;
}
console.log(isEvenNumber(10)); // Kết quả mong đợi: true
console.log(isEvenNumber(7));  // Kết quả mong đợi: false


// Bài 2
const getElectricityBill=(kwh)=>{
    if(kwh<=50){
        return kwh*1678;
    }
    else if(kwh>=51&&kwh<=100){
        return (50*1678)+(kwh%50)*1734;
    }
    else if(kwh>=101&&kwh<=200){
        return (50*1678)+(50*1734)+(kwh%100)*2014;
    }
     else if(kwh>=201&&kwh<=300){
        return (50*1678)+(50*1734)+(100*2014)+(kwh%200)*2536;
    }
     else if(kwh>=301&&kwh<=400){
        return (50*1678)+(50*1734)+(100*2014)+(100*2536)+(kwh%300)*2834;
    }
    else if(kwh>=401){
        return (50*1678)+(50*1734)+(100*2014)+(100*2536)+(100*2834)+(kwh%400)*2927;
    }
    else{
        return "kwh ko hợp lệ!!"
    }

}
console.log(getElectricityBill(70)); 
// Mong đợi: (50 * 1678) + (20 * 1734) = 118580

console.log(getElectricityBill(120)); 
// Mong đợi: (50 * 1678) + (50 * 1734) + (20 * 2014) = 210880


// Bài 3

const cleanName=(fullName,firstName)=>{
    let nameToLower=fullName.toLowerCase().trim();
    return nameToLower.includes(firstName)?true:false;
}

console.log(cleanName('   NGUYEN Van An   ', 'an')); // Mong đợi: true (vì 'nguyen van an' có chứa 'an')
console.log(cleanName('   Tran Thi B ', 'hoang'));   // Mong đợi: false
