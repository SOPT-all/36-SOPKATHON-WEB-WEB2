import React from 'react';

interface CategoryCardProps {
  title: string;
  description: string;
  imgSrc: string;
  selected?: boolean;
  onClick?: () => void;
}

const CategoryCard = ({
  title,
  description,
  imgSrc,
  selected = false,
  onClick,
}: CategoryCardProps) => {
  return (
    <button
      className={`p-[8px] rounded-lg flex justify-between items-center w-[343px] h-[116px] transition-colors ${
        selected
          ? title === '맞아유!' 
            ? 'bg-purple-100 outline outline-1 outline-offset-[-1px] outline-violet-600' 
            : 'bg-CB-blue/10 outline outline-1 outline-offset-[-1px] outline-CB-blue'
          : 'bg-gray-100 hover:bg-gray-200'
      }`}
      onClick={onClick}
      type="button"
    >
      <div className="flex flex-col justify-start items-start gap-2 ml-[4px]">
        <h3
          className={`self-stretch text-left text-lg font-bold font-pretendard leading-relaxed ${
            selected ? (title === '맞아유!' ? 'text-black' : 'text-[#42BDCC]') : 'text-black'
          }`}
        >
          {title}
        </h3>
        <p className="self-stretch text-left text-gray-400 text-xs font-medium font-pretendard leading-tight">
          {description.split('<br/>').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < description.split('<br/>').length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      </div>
      <img 
        className="w-[144px] h-[100px] object-contain" 
        src={imgSrc} 
        alt={title} 
      />
    </button>
  );
};

export default CategoryCard;
