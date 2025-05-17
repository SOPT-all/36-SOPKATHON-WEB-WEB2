interface TagProps {
  rank: number;
  name: string;
}

const Tag = ({ rank, name }: TagProps) => {
  const isFirst = rank === 1;

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-[50px] text-nowrap ${
        isFirst ? 'bg-[#42BDCC]' : 'bg-[#F3F3F6]'
      }`}
    >
      <div className="flex justify-center items-center overflow-hidden">
        <div className="relative flex justify-center items-center">
          <span
            className={`text-xs font-bold font-[Pretendard] leading-tight ${
              isFirst ? 'text-white' : 'text-[#42BDCC]'
            }`}
          >
            {rank}
          </span>
        </div>
      </div>
      <div
        className={`font-[Pretendard] text-[15px] font-semibold leading-[140%] ${
          isFirst ? 'text-white' : 'text-[#42BDCC]'
        }`}
      >
        {name}
      </div>
    </div>
  );
};

export default Tag;
