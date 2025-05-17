interface LocationDescriptionProps {
  description: string;
}

const LocationDescription = ({ description }: LocationDescriptionProps) => {
  return (
    <div className="mx-auto w-80 mt-5">
      <div className="px-2.5 py-3 bg-gray-100 rounded-lg">
        <p className="text-black text-xs font-medium leading-tight">
          {description}
        </p>
      </div>
    </div>
  );
};

export default LocationDescription;