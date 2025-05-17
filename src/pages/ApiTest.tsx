import { useState, useRef } from 'react';
import { createPin, getPinsByRegion } from '@/shared/apis/pinApi';
import { uploadImage } from '@/shared/apis/imageApi';

const ApiTest = () => {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const testImageUpload = async () => {
    if (!selectedFile) {
      setResult('파일을 선택해주세요');
      return;
    }

    setIsLoading(true);
    try {
      const imageUrl = await uploadImage(selectedFile);
      setResult(`이미지 업로드 성공: ${imageUrl}`);
    } catch (error) {
      setResult(`에러 발생: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testCreatePin = async () => {
    setIsLoading(true);
    try {
      // 이미지 업로드 먼저 수행 (테스트용 이미지가 선택되어 있다면)
      let imageUrl = 'https://via.placeholder.com/300';
      
      if (selectedFile) {
        try {
          imageUrl = await uploadImage(selectedFile);
          setResult(`이미지 업로드 성공: ${imageUrl}\n\n핀 생성 시도 중...`);
        } catch (imgError) {
          setResult(`이미지 업로드 실패: ${imgError instanceof Error ? imgError.message : String(imgError)}\n\n기본 이미지로 핀 생성 시도 중...`);
        }
      }
      
      const response = await createPin(
        {
          isCorrect: true,
          region: '청주시',
          placeName: '테스트 장소',
          imageUrl: imageUrl,
          latitude: 36.5,
          longitude: 127.5,
          reviews: ['테스트1', '테스트2'],
          oneliner: '테스트 한줄평입니다'
        },
        1 // 임시 사용자 ID
      );
      setResult(prev => prev + '\n\n핀 생성 결과:\n' + JSON.stringify(response, null, 2));
    } catch (error) {
      setResult(`에러 발생: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testGetPins = async () => {
    setIsLoading(true);
    try {
      const response = await getPinsByRegion('청주시');
      setResult(JSON.stringify(response, null, 2));
    } catch (error) {
      setResult(`에러 발생: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mobile-layout p-4">
      <h1 className="text-2xl font-bold mb-4">API 테스트 페이지</h1>
      
      <div className="flex flex-col gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">이미지 업로드</h2>
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="mb-2"
          />
          <button
            className="bg-CB-blue text-white p-2 rounded-lg text-sm"
            onClick={testImageUpload}
            disabled={isLoading || !selectedFile}
          >
            이미지 업로드 테스트
          </button>
        </div>
        
        <button
          className="bg-CB-blue text-white p-3 rounded-lg"
          onClick={testCreatePin}
          disabled={isLoading}
        >
          장소 등록 API 테스트
        </button>
        
        <button
          className="bg-CB-blue text-white p-3 rounded-lg"
          onClick={testGetPins}
          disabled={isLoading}
        >
          지역별 장소 조회 API 테스트
        </button>
        
        {isLoading && <p className="text-gray-500">요청 처리 중...</p>}
        
        {result && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">결과:</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[400px] text-sm whitespace-pre-wrap">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiTest; 