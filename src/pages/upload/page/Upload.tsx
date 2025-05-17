import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowLeft from '@/shared/assets/svg/arrow_left.svg';
import CameraIcon from '@/shared/assets/svg/camera.svg';
import Button from '@/shared/components/Button';
const Upload = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<string | null>(null);
  const [placeName, setPlaceName] = useState('');
  const [regionName, setRegionName] = useState('');
  const [selectedEvaluations, setSelectedEvaluations] = useState<string[]>([]);
  const [review, setReview] = useState('');

  const evaluationOptions = [
    '사람이 많아요',
    '조용해요',
    '풍경이 멋있어요',
    '어쩌어구',
    '저쩌구',
    '변경 예정',
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEvaluation = (evaluation: string) => {
    setSelectedEvaluations(prev =>
      prev.includes(evaluation) ? prev.filter(item => item !== evaluation) : [...prev, evaluation]
    );
  };

  const handleSubmit = () => {
    console.log({
      image,
      placeName,
      regionName,
      selectedEvaluations,
      review,
    });
  };

  return (
    <>
      <button onClick={() => navigate(-1)} className="mb-[1rem]">
        <img src={ArrowLeft} alt="뒤로가기" />
      </button>
      <div className="w-full min-h-screen bg-white px-[1rem]">
        <div className="max-w-[23.4375rem] mx-auto flex flex-col gap-[1rem]">
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
                onChange={e => setRegionName(e.target.value)}
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
            <div className="flex flex-wrap gap-2">
              {evaluationOptions.map((evaluation, index) => (
                <button
                  key={index}
                  onClick={() => toggleEvaluation(evaluation)}
                  className={`px-4 py-2 rounded-full ${
                    selectedEvaluations.includes(evaluation)
                      ? 'bg-[#E1FCFF] text-[0.8125rem] text-[#42BDCC]'
                      : 'bg-[#F3F3F6] text-[0.8125rem] text-[#999AAB]'
                  }`}
                >
                  {evaluation}
                </button>
              ))}
            </div>
          </div>
          <textarea
            placeholder="placeholder"
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
          <Button onClick={handleSubmit} variant="teal" className="mt-[1.69rem] mb-[3.125rem]">
            등록하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default Upload;
