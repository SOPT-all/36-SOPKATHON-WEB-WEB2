interface LocationTitleProps {
  title: string;
  location: string;
}

const LocationTitle = ({ title, location }: LocationTitleProps) => {
  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-black text-lg font-bold leading-relaxed">
        {title}
      </h2>
      <span className="text-zinc-500 text-sm font-semibold leading-tight mt-1">
        {location}
      </span>
    </div>
  );
};

export default LocationTitle;