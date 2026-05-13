const numbers = [9, 8, 3, 5, 6, 2, 7, 9];
// Expected result: 8
let maxNum=numbers[0];

for(let i of numbers){
    if(maxNum<i){
        maxNum=i;
    }
}
let minDistance = Infinity;
let secondMax = null;

for (let i of numbers) {
    let distance = maxNum - i;
    if (distance > 0 && distance < minDistance) {
        minDistance = distance;
        secondMax = i;
    }
}
console.log(secondMax)

//Exercise 2

const classA = [15, 2, 8, 10];
const classB = [8, 11, 2, 5, 9];

const mergedClasses = [...classA,...classB];
const uniqueClasses=[...new Set(mergedClasses)];
// Step 1 & 2: [15, 2, 8, 10, 11, 5, 9]
const quickSort =(nums)=>{
    if(nums.length<=1) return nums;
    const mid=Math.floor(nums.length/2);
    const pivot=nums[mid];
    const leftArray=[];
    const rightArray=[];
    for(let i=0;i<nums.length;i++){
        if(i!==mid){
            if(nums[i]<pivot){
                leftArray.push(nums[i]);
            }
            else{
                rightArray.push(nums[i]);
            }
        }
    }
    return [...quickSort(leftArray),pivot,...quickSort(rightArray)];
}

const result=quickSort(uniqueClasses);
console.log(result);
// Step 3: Quick Sort -> [2, 5, 8, 9, 10, 11, 15]