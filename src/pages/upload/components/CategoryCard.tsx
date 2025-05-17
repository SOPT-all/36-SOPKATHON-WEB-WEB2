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
    <div
      className={`p-[8px] rounded-lg inline-flex justify-between items-center w-[342px] h-[118px] ${
        selected
          ? 'bg-sky-100 outline outline-1 outline-offset-[-1px] outline-teal-400'
          : 'bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="inline-flex flex-col justify-start items-start gap-2 ml-[4px]">
        <div
          className={`self-stretch justify-center text-lg font-bold font-pretendard leading-relaxed ${
            selected ? 'text-teal-400' : 'text-black'
          }`}
        >
          {title}
        </div>
        <div className="self-stretch justify-center text-gray-400 text-xs font-medium font-pretendard leading-tight">
          {description.split('<br/>').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              {index < description.split('<br/>').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <img className="w-[93px] h-[93px]" src={imgSrc} alt={title} />
    </div>
  );
};

export default CategoryCard;
