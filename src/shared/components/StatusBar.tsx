interface StatusBarProps {
  time?: string;
}

const StatusBar = ({ time = '9:41' }: StatusBarProps) => {
  return (
    <div className="w-96 h-12 left-0 top-0 absolute overflow-hidden">
      <div className="w-20 h-3 left-[278px] top-[19px] absolute">
        <div className="w-5 h-3 left-[2px] top-[0.50px] absolute" />
        <div className="w-4 h-3 left-[27.97px] top-[0.25px] absolute" />
        <div className="w-7 h-3 left-[50.97px] top-0 absolute overflow-hidden">
          <div className="w-6 h-3 left-0 top-0 absolute opacity-40 rounded border border-zinc-950" />
          <div className="w-[1.33px] h-1 left-[26px] top-[4.50px] absolute opacity-50 bg-zinc-950" />
          <div className="w-5 h-2 left-[2px] top-[2px] absolute bg-zinc-950 rounded-sm" />
        </div>
      </div>
      <div className="w-1.5 h-1.5 left-[282px] top-[6px] absolute">
        <div className="w-1.5 h-1.5 left-0 top-0 absolute rounded-full" />
      </div>
      <div className="left-[44px] top-[17px] absolute inline-flex justify-center items-center gap-0.5">
        <div className="text-center justify-center text-zinc-950 text-base font-semibold leading-none">{time}</div>
      </div>
    </div>
  );
};

export default StatusBar; 