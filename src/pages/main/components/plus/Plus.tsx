interface PlusProps {
  onClick?: () => void;
}

function Plus({ onClick }: PlusProps) {
  return (
    <div onClick={onClick} className="cursor-pointer absolute top-[60%] right-[10%] z-50">
      <div className="p-3 bg-teal-400 rounded-[100px] inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
        <div className="w-6 h-6 relative overflow-hidden">
          <div className="w-0.5 h-5 left-[11px] top-[2px] absolute bg-white" />
          <div className="w-0.5 h-5 left-[22px] top-[11px] absolute origin-top-left rotate-90 bg-white" />
        </div>
      </div>
    </div>
  );
}

export default Plus;
