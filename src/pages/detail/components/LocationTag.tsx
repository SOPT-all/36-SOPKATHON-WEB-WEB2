interface LocationTagProps {
  tagText: string;
}

const LocationTag = ({ tagText }: LocationTagProps) => {
  return (
    <div className="flex justify-center mt-3">
      <div className="px-2 py-1 bg-teal-400 rounded inline-flex justify-center items-center">
        <span className="text-white text-xs font-medium leading-none">
          {tagText}
        </span>
      </div>
    </div>
  );
};

export default LocationTag;