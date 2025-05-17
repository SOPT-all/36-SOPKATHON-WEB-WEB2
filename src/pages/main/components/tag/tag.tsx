import React from 'react';

interface TagProps {
  rank: number;
  name: string;
}

const Tag = ({ rank, name }: TagProps) => {
  return (
    <div>
      <div
        data-property-1="chip_home_rank_one"
        className="px-2 py-1 bg-teal-400 rounded-[50px] inline-flex justify-start items-center gap-1"
      >
        <div className="w-6 py-px flex justify-center items-center gap-2.5 overflow-hidden">
          <div className="w-5 h-5 px-1.5 py-0.5 relative inline-flex flex-col justify-center items-center gap-2.5">
            <div className="justify-start text-teal-400 text-xs font-bold font-['Pretendard'] leading-tight">
              {rank}
            </div>
          </div>
        </div>
        <div className="justify-start text-white text-sm font-semibold font-['Pretendard'] leading-tight">
          {name}
        </div>
      </div>
    </div>
  );
};

export default Tag;
