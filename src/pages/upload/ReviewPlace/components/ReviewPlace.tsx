import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLeft from '@/shared/assets/svg/arrow_left.svg';
import CameraIcon from '@/shared/assets/svg/camera.svg';
import Button from '@/shared/components/Button';
import RegionSelector from './RegionSelector';
import { createPin } from '@/shared/apis/pinApi';
import { uploadImage } from '@/shared/apis/imageApi';
import type { CreatePinRequest } from '@/shared/types/api';

interface ReviewPlaceProps {
  category: string | null;
  onBack: () => void;
}

const ReviewPlace = ({ category, onBack }: ReviewPlaceProps) => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [placeName, setPlaceName] = useState('');
  const [regionName, setRegionName] = useState('');
  const [selectedEvaluations, setSelectedEvaluations] = useState<string[]>([]);
  const [review, setReview] = useState('');
  const [isRegionSelectorOpen, setRegionSelectorOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 화면에 표시할 평가 옵션 (이모지 포함)
  const evaluationOptions = [
    '방문객 수 👪',
    '서비스 🛎️',
    '접근성 🚗',
    '위생 🧼',
    '안전성 ⚠️️',
    '역사·문화 🏛️',
    '기타'
  ];

  // 서버로 전송할 실제 값 (이모지 제거, 공백 제거)
  const evaluationValues = [
    '방문객수',
    '서비스',
    '접근성',
    '위생',
    '안전성',
    '역사문화',
    '기타'
  ];

  // 표시용 옵션과 실제 값을 매핑하는 함수
  const getEvaluationValue = (displayOption: string) => {
    const index = evaluationOptions.findIndex(option => option === displayOption);
    return index !== -1 ? evaluationValues[index] : displayOption.replace(/\s+/g, '').replace(/[^\w가-힣]/g, '');
  };

  // 폼 유효성 검사
  useEffect(() => {
    setIsFormValid(
      !!imageFile && 
      placeName.trim() !== '' && 
      regionName.trim() !== '' && 
      selectedEvaluations.length > 0 && 
      review.trim() !== ''
    );
  }, [imageFile, placeName, regionName, selectedEvaluations, review]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEvaluation = (evaluation: string) => {
    setSelectedEvaluations(prev => {
      // 표시 옵션에서 실제 값으로 변환
      const value = getEvaluationValue(evaluation);
      
      // 이미 선택된 값이면 제거, 아니면 추가
      if (prev.includes(value)) {
        const newValues = prev.filter(item => item !== value);
        return newValues;
      } else {
        const newValues = [...prev, value];
        return newValues;
      }
    });
  };

  const handleSubmit = async () => {
    if (!isFormValid || !category || !imageFile) return;
    
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      
      // 1. 이미지 먼저 업로드
      const imageUrl = await uploadImage(imageFile, 6);
      
      // 지역명 포맷 확인 - 반드시 ~시 또는 ~군으로 끝나야함
      let formattedRegion = regionName;
      if (!regionName.endsWith('시') && !regionName.endsWith('군')) {
        // 지역명이 올바른 형식이 아니면 오류 메시지 표시
        setErrorMessage('지역명은 반드시 ~시 또는 ~군 형식이어야 합니다.');
        setIsSubmitting(false);
        return;
      }
      
      // API 문서에 맞게 정확한 형식으로 데이터 구성
      const pinData: CreatePinRequest = {
        isCorrect: category === "맞아유!",
        region: formattedRegion,
        placeName: placeName,
        imageUrl: imageUrl,
        latitude: 36.6285,
        longitude: 127.4573,
        reviews: selectedEvaluations.length > 0 ? selectedEvaluations : ["review1"],
        oneliner: review
      };
      
      // 유저 ID 설정
      const userId = 6;
      
      const response = await createPin(pinData, userId);
      // 생성된 핀 ID를 가져와 디테일 페이지로 이동
      const pinId = response.data.pinId;
      navigate(`/detail/${pinId}`);
      
    } catch (error) {
      console.error('Failed to create pin:', error);
      setErrorMessage('등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegionSelect = (region: string) => {
    setRegionName(region);
    setRegionSelectorOpen(false);
  };

  return (
    <div className="mobile-layout h-screen flex flex-col">
      <button onClick={onBack} className="mb-[1rem]">
        <img src={ArrowLeft} alt="뒤로가기" />
      </button>
      
      <div className="flex-1 overflow-y-auto">
        <div className="w-full bg-white px-[1rem]">
          <div className="max-w-[23.4375rem] mx-auto flex flex-col gap-[1rem] pb-[2rem]">
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-semibold font-['Pretendard'] leading-tight">
              장소명
            </label>
            <input
              type="text"
              placeholder="장소명을 입력해주세요"
              value={placeName}
              onChange={e => setPlaceName(e.target.value)}
              className="w-[21.375rem] h-[3rem] py-[1rem] px-[0.75rem] bg-[#F3F3F6] rounded-[0.5rem] outline-none flex items-center gap-[0.625rem] flex-shrink-0 placeholder:text-[#999AAB] placeholder:font-medium placeholder:text-sm placeholder:font-['Pretendard'] placeholder:leading-[140%]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black text-sm font-semibold font-['Pretendard'] leading-tight">
              지역명
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="지역명을 선택해주세요"
                value={regionName}
                onClick={() => setRegionSelectorOpen(true)}
                readOnly
                className="w-[21.375rem] h-[3rem] py-[1rem] px-[0.75rem] bg-[#F3F3F6] rounded-[0.5rem] outline-none flex items-center gap-[0.625rem] flex-shrink-0 placeholder:text-[#999AAB] placeholder:font-medium placeholder:text-sm placeholder:font-['Pretendard'] placeholder:leading-[140%]"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="#999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="w-full h-2.5 bg-gray-100"></div>
          <div className="flex flex-col gap-4">
            <h2 className="text-black text-sm font-semibold font-['Pretendard'] leading-tight">
              이 장소에 대한 평가를 남겨주세요
            </h2>
            <div className="w-80 inline-flex justify-start items-start gap-2 flex-wrap content-start">
              {evaluationOptions.map((evaluation, index) => {
                // 해당 옵션의 실제 값
                const value = evaluationValues[index];
                
                return (
                  <div
                    key={index}
                    data-property-1={selectedEvaluations.includes(value) ? "active" : "enabled"}
                    onClick={() => toggleEvaluation(evaluation)}
                    className={`px-3 py-2 ${
                      selectedEvaluations.includes(value) ? 'bg-CB-blue/10' : 'bg-gray-100'
                    } rounded-[50px] flex justify-center items-center gap-2.5 cursor-pointer`}
                  >
                    <div className={`justify-center ${
                      selectedEvaluations.includes(value) ? 'text-CB-blue' : 'text-gray-400'
                    } text-xs font-medium font-['Pretendard'] leading-tight`}>
                      {evaluation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <textarea
            placeholder="장소에 대한 한 줄 리뷰를 작성해주세요"
            value={review}
            onChange={e => setReview(e.target.value)}
            className="w-[21.375rem] py-[0.75rem] px-[0.625rem] bg-[#F3F3F6] rounded-[0.5rem] min-h-[100px] resize-none outline-none flex-shrink-0 placeholder:text-[#999AAB] placeholder:font-medium placeholder:text-sm placeholder:font-['Pretendard'] placeholder:leading-[140%]"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-black text-sm font-semibold font-['Pretendard'] leading-tight">
              대표 사진을 등록해주세요
            </h2>
            <div className="w-[5.5rem] h-[5.5rem] border-[1px] border-[#E6E6EB] bg-[#F3F3F6] rounded-lg flex items-center justify-center relative">
              {image ? (
                <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <img
                  src={CameraIcon}
                  alt="카메라 아이콘"
                  className="w-[24px] h-[24px] text-gray-400"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="px-4 py-2 bg-red-100 text-red-600 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="px-4 w-full py-3 bg-white">
        <Button 
          onClick={handleSubmit} 
          variant="teal" 
          className="w-full"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? '등록 중...' : '등록하기'}
        </Button>
      </div>

      <RegionSelector
        isOpen={isRegionSelectorOpen}
        onClose={() => setRegionSelectorOpen(false)}
        onSelectRegion={handleRegionSelect}
      />
    </div>
  );
};

export default ReviewPlace;