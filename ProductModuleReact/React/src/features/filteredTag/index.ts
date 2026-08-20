export interface FilterTagProps{
    exp:string[],
    gender:string[],
    jobType:string[]
}
export const FilteredTag={
    exp:["Chưa có kinh nghiệm" ,"1 năm trở xuống","1 năm" , "2 năm" ,"3 năm" ,"Từ 4-5 năm","Trên 5 năm"],
    gender:['NOT_REQUIRED' , 'MALE' , 'FEMALE'],
    jobType:['FULL_TIME' , 'PART_TIME' , 'CONTRACT' , 'INTERNSHIP']
}