import React, { useState } from 'react';

interface RegionSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRegion: (region: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ isOpen, onClose, onSelectRegion }) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>('충주시');

  const regions = [
    ['청주시', '충주시', '제천시'],
    ['보은군', '옥천군', '영동군'],
    ['증평군', '진천군', '괴산군'],
    ['음성군', '단양군'],
  ];

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
  };

  const handleSubmit = () => {
    if (selectedRegion) {
      onSelectRegion(selectedRegion);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="w-[375px] h-[667px] relative bg-black/50 overflow-hidden">
        <div className="w-[375px] h-[298px] left-0 top-[369px] absolute bg-white rounded-tl-xl rounded-tr-xl" />

        <div className="left-[16px] top-[389px] absolute text-black text-sm font-bold font-pretendard leading-tight">
          지역을 선택해주세요
        </div>

        <div className="absolute bottom-0 inset-x-0 px-4">
          <div className="w-full mt-12">
            <div className="w-full inline-flex flex-col justify-start items-start gap-2 mb-5">
              {regions.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`${rowIndex === 3 ? 'w-56' : 'w-full'} inline-flex justify-start items-center gap-2 flex-wrap content-center`}
                >
                  {row.map(region => (
                    <div
                      key={region}
                      data-property-1={selectedRegion === region ? 'active' : 'enabled'}
                      className={`flex-1 p-2.5 ${
                        selectedRegion === region ? 'bg-sky-100' : 'bg-gray-100'
                      } rounded flex justify-center items-center gap-2 cursor-pointer`}
                      onClick={() => handleRegionClick(region)}
                    >
                      <div
                        className={`justify-center ${
                          selectedRegion === region ? 'text-teal-400' : 'text-gray-400'
                        } text-xs font-medium font-pretendard leading-tight`}
                      >
                        {region}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div
              data-property-1="active"
              className="w-full px-2.5 py-4 bg-CB-blue rounded-lg inline-flex justify-center items-center gap-2.5 cursor-pointer mb-2"
              onClick={handleSubmit}
            >
              <div className="justify-center text-white text-sm font-bold font-pretendard leading-tight">
                입력하기
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionSelector;
