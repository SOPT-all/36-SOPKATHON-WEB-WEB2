import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockLocationDetails } from '@/shared/constants/mockData';
import type { LocationDetail } from '@/shared/constants/mockData';
import Header from '@/shared/components/Header';
import PlaceImage from '@/shared/assets/images/place-image.jpg';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState<LocationDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setIsLoading(true);
      
      // 목 데이터에서 ID로 장소 정보 찾기
      setTimeout(() => {
        const location = mockLocationDetails.find((item: LocationDetail) => item.id === id);
        
        if (location) {
          setLocationData(location);
        } else {
          setError('해당 장소를 찾을 수 없습니다.');
        }
        
        setIsLoading(false);
      }, 500); // 로딩 효과를 위한 지연
    } catch (err) {
      setError('데이터를 불러오는데 실패했습니다.');
      setIsLoading(false);
    }
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="w-96 h-[41.6875rem] mx-auto flex items-center justify-center bg-white">
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error || !locationData) {
    return (
      <div className="w-96 h-[41.6875rem] mx-auto flex items-center justify-center flex-col gap-4 bg-white">
        <p>{error || '정보를 찾을 수 없습니다.'}</p>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-gray-100 rounded"
        >
          메인으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="w-96 h-[41.6875rem] relative bg-white overflow-hidden">      
      {/* 헤더 - 제목 없이 뒤로가기 버튼만 표시 */}
      <Header title="" showBackButton={true} onBackClick={handleBackClick} />
      
      {/* 이미지 */}
      <img 
        className="w-36 h-36 left-[7.0625rem] top-[6.5625rem] absolute rounded-lg" 
        src={PlaceImage} 
        alt={locationData.title} 
      />
      
      {/* 제목 - 가운데 정렬 */}
      <div className="w-full text-center top-[17.0625rem] absolute text-black text-lg font-bold font-['Pretendard'] leading-relaxed">
        {locationData.title}
      </div>
      
      {/* 위치 - 가운데 정렬 */}
      <div className="w-full text-center top-[18.875rem] absolute text-zinc-500 text-sm font-semibold font-['Pretendard'] leading-tight">
        {locationData.location}
      </div>
      
      {/* 태그 */}
      <div className="px-2 py-1 left-[8.6875rem] top-[20.6875rem] absolute bg-teal-400 rounded inline-flex justify-center items-center gap-2.5">
        <div className="justify-center text-white text-xs font-medium font-['Pretendard'] leading-none">
          {locationData.tag}
        </div>
      </div>
      
      {/* 내용 */}
      <div data-property-1="normal" className="w-80 h-24 px-2.5 py-3 left-[1.0625rem] top-[23.625rem] absolute bg-gray-100 rounded-lg inline-flex justify-start items-start gap-2.5">
        <div className="justify-start text-black text-xs font-medium font-['Pretendard'] leading-tight">
          {locationData.description}
        </div>
      </div>
      
      {/* 버튼 그룹 */}
      <div className="w-80 left-[1.0625rem] top-[30.8125rem] absolute inline-flex justify-start items-center gap-2">
        <div data-property-1="btn_home_click_no" className="flex-1 h-10 py-2 bg-teal-400 rounded-lg flex justify-center items-center gap-2">
          <div className="justify-center text-sky-100 text-xs font-bold font-['Pretendard'] leading-tight">아니어유?</div>
          <div className="justify-center text-sky-100 text-xs font-bold font-['Pretendard'] leading-tight">({locationData.negativePercent}%)</div>
        </div>
        <div data-property-1="btn_home_click_yes" className="flex-1 h-10 py-2 bg-violet-600 rounded-lg flex justify-center items-center gap-2">
          <div className="justify-center text-purple-100 text-xs font-bold font-['Pretendard'] leading-tight">맞아유...</div>
          <div className="justify-center text-purple-100 text-xs font-bold font-['Pretendard'] leading-tight">({locationData.positivePercent}%)</div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage; 