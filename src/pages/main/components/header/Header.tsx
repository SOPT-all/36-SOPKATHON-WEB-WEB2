import { fetchRegionPins } from '@/shared/apis/main/GetPinRegions';
import Ic_Rank from '@/shared/assets/svg/ic_rank.svg';
import Text from '@/shared/components/text/Text';
import { useEffect, useState } from 'react';
import Tag from '../tag/tag';

const Header = () => {
  const [regionPins, setRegionPins] = useState([]);

  useEffect(() => {
    const loadPins = async () => {
      try {
        const data = await fetchRegionPins();
        console.log(data);
        setRegionPins(data.data);
      } catch (error) {
        console.error('지역 핀 불러오기 실패:', error);
      }
    };
    loadPins();
  }, []);

  return (
    <div className="flex w-full  px-[1.6rem] py-[1.2rem] flex-col items-start gap-[1.2rem] ">
      <div className="flex items-center gap-[0.6rem] self-stretch ">
        <img src={Ic_Rank} alt="rank icon" />
        <Text className="text-black text-xl font-extrabold font-['Pretendard'] leading-relaxed">
          지역 순위
        </Text>
      </div>

      <div className="flex items-center gap-[0.6rem] self-stretch overflow-x-auto whitespace-nowrap scrollbar-hide">
        {regionPins.map((name, idx) => (
          <Tag key={idx} rank={idx + 1} name={name} />
        ))}
      </div>
    </div>
  );
};

export default Header;
