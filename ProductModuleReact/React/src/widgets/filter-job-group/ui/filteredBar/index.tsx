import { useState, useEffect } from "react";

import ScrollCarouselProps from "@/shared/ui/ScrollCarousel"
import { FilteredTag, type FilterTagProps } from "@/features/filteredTag";
import HomeTag from "@/shared/ui/HomeTag"

const options: option[] = [{ title: "Kinh nghiệm", id: "exp" }, { title: "Giới tính", id: "gender" }, { title: "Loại công việc", id: "jobType" }]
interface FilteredBarProps {
  currentType: keyof FilterTagProps,
  currentValue: string
  handleFilterJob: (type: keyof FilterTagProps, value: string) => void
}
interface option {
  title: string,
  id: keyof FilterTagProps,
}
//handle set state của thằng cha 
function FilteredBar({ handleFilterJob, currentType, currentValue }: FilteredBarProps) {
  const [selectedId, setSelectedId] = useState<keyof FilterTagProps>("exp");
  const [title, setTitle] = useState("Kinh nghiệm");
  const [isOpen, setIsOpen] = useState(false);
  const [tags, setTags] = useState<string[]>(FilteredTag[currentType]);
  const [activeTag, setActiveTag] = useState<string>(currentValue);

  useEffect(() => {
    setSelectedId(currentType);
    const foundOption = options.find((o) => o.id === currentType);
    if (foundOption) {
      setTitle(foundOption.title)
    }
    setTags(FilteredTag[currentType])
    setActiveTag(currentValue);

  }, [currentType, currentValue])

  const handleClickOpen = () => {
    setIsOpen(!isOpen)
  }
  const handleClickOptions = ({ title, id }: option) => {
    setSelectedId(id);
    setTitle(title);
    let newTag = FilteredTag[id];
    setTags(newTag);
    setActiveTag(newTag[0])
    handleFilterJob(id, newTag[0])
  }
  const handleClickTag = (t: string) => {
    setActiveTag(t)
    handleFilterJob(selectedId, t)
  }
  return (
    <div className="flex justify-between h-10 relative">
      <div onClick={handleClickOpen} className="flex  w-40 lg:w-70 items-center bg-white justify-between px-3 py-2 text-sm cursor-pointer ">
        <div className="text-gray-200">
          <i className="fa-solid fa-filter"></i>
          <span>Lọc theo:</span>
        </div>
        <p> {title}</p>
      </div>
      <div className="h-full w-70 lg:w-120 min-w-0 overflow-hidden scrollbar-none"><ScrollCarouselProps>{tags.map((t) => (<div className="shrink-0" key={t} onClick={() => handleClickTag(t)}>
        <HomeTag nameTag={t} isActive={activeTag === t} />
      </div>
      )
      )}</ScrollCarouselProps></div>
      {isOpen && (<ul className="absolute flex col justify-center items-center text-sm font-semibold px-3 py-2  cursor-pointer bg-white">{options.map((o) => {
        return (<li key={o.id} onClick={() => { handleClickOptions(o); handleClickOpen() }} className={`px-5 py-3  cursor-pointer hover:bg-gray-200 ${selectedId === o.id ? "text-green-600" : ""}`}>{o.title}</li>)
      })} </ul>)}
    </div>
  );
}
export default FilteredBar;