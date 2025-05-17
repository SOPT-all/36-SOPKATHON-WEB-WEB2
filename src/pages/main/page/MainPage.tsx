import { useState, useEffect } from 'react';
import NaverMap from '@/shared/components/naverMap/NaverMap';
import { dummyPins } from './dummy';
import type { PinWithMark } from '@/shared/components/pin/pinInterface';
import Modal from '@/shared/components/modal/Modal';
import { PlaceCardList } from '../components';
import { mockLocationDetails } from '@/shared/constants/mockData';
import type { LocationDetail } from '@/shared/constants/mockData';
import Header from '@/pages/main/components/header/Header';
import { getPinsList, getPinDetail } from '@/shared/apis/pins';
import type { PinDetailResponse, PinListItem } from '@/shared/types/api';

const MainPage = () => {
  const [selectedPinId, setSelectedPinId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'yes' | 'no'>('yes');
  const [places, setPlaces] = useState<LocationDetail[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | undefined>(undefined);
  const [voteState, setVoteState] = useState<'none' | 'positive' | 'negative'>('none');
  const [fillOpacity, setFillOpacity] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mapPins, setMapPins] = useState<PinWithMark[]>(dummyPins);
  const [showPlaceCard, setShowPlaceCard] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<LocationDetail | null>(null);

  // 컴포넌트 마운트 시 핀 목록 데이터 로드
  useEffect(() => {
    const fetchPins = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // API에서 핀 목록 가져오기
        const response = await getPinsList();
        
        if (response.code === 's2000') {
          // API 응답 데이터를 지도에 표시할 핀 형식으로 변환
          const pins: PinWithMark[] = response.data.pins.map((pin: PinListItem) => ({
            pinId: pin.pinId,
            latitude: pin.latitude,
            longitude: pin.longitude,
            defaultMark: pin.defaultMark as 'O' | 'X',
          }));
          
          setMapPins(pins);
        } else {
          setError('핀 데이터를 불러오는데 실패했습니다.');
          // API 오류 시 더미 데이터 사용
          setMapPins(dummyPins);
        }
      } catch (err) {
        console.error('핀 목록 불러오기 실패:', err);
        setError('핀 데이터를 불러오는데 실패했습니다.');
        // API 오류 시 더미 데이터 사용
        setMapPins(dummyPins);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPins();
  }, []);

  const handlePinClick = async (pin: PinWithMark) => {
    // 같은 핀을 다시 클릭하면 장소 카드 토글
    if (selectedPinId === pin.pinId) {
      setSelectedPinId(null);
      setShowPlaceCard(false);
      return;
    }
    
    setSelectedPinId(pin.pinId);
    setShowPlaceCard(false); // 새 핀 클릭시 장소 카드 초기화
    setIsLoading(true);
    
    try {
      // API에서 핀 상세 정보 가져오기
      const response = await getPinDetail(pin.pinId);
      console.log('API 응답 전체:', response); // 전체 응답 로그
      console.log('API 응답 데이터:', response.data); // 디버깅용 로그 추가
      console.log('API reviews 필드:', response.data.reviews); // reviews 필드 확인
      console.log('reviews 타입:', typeof response.data.reviews); // reviews의 타입 확인
      
      if (response.code === 's2000') {
        const data = response.data;
        
        // API 응답의 reviews 배열 처리
        const reviewsData = Array.isArray(data.reviews) ? data.reviews : 
                           typeof data.reviews === 'string' ? [data.reviews] : [];
        console.log('Reviews 데이터(처리 후):', reviewsData); // 처리 후 데이터 확인
        
        // API에서 받아온 데이터를 LocationDetail 형식으로 변환
        const placeDetail: LocationDetail = {
          id: data.pinId.toString(),
          title: data.placeName, // 장소 이름
          location: data.regionName || data.placeName, // 지역 이름
          regionName: data.regionName || data.placeName, // 지역 이름
          description: reviewsData.length > 0 ? reviewsData.join(', ') : '', // 비어있으면 빈 문자열 반환
          tag: data.oneLiner,
          imageUrl: data.image,
          positivePercent: data.likeRate,
          negativePercent: data.hateLate,
          reviews: reviewsData.length > 0 ? reviewsData : [], // 리뷰 배열이 비어있어도 tag를 보여주기 위해 빈 배열 전달
        };
        
        console.log('변환된 장소 데이터:', placeDetail); // 디버깅용 로그 추가
        console.log('태그 값:', data.oneLiner); // tag(oneLiner) 값 확인
        
        setSelectedPlace(placeDetail);
        setSelectedPlaceId(data.pinId.toString());
        
        // API에서 받아온 투표 상태에 따라 초기 투표 상태 설정
        if (data.likeRate > data.hateLate) {
          setVoteState('positive'); // 맞아유 비율이 높으면 '맞아유' 상태
        } else if (data.hateLate > data.likeRate) {
          setVoteState('negative'); // 아니어유 비율이 높으면 '아니어유' 상태
        } else {
          // 핀 타입에 따른 기본 상태 설정
          if (pin.defaultMark === 'X') {
            setVoteState('positive');
          } else if (pin.defaultMark === 'O') {
            setVoteState('negative');
          } else {
            setVoteState('none');
          }
        }
        
        // 데이터 로드 완료 후 장소 카드 표시
        setShowPlaceCard(true);
      } else {
        setError('장소 정보를 불러오는데 실패했습니다.');
        setShowPlaceCard(false);
      }
    } catch (err) {
      console.error('핀 상세 정보 불러오기 실패:', err);
      setError('장소 정보를 불러오는데 실패했습니다.');
      setShowPlaceCard(false);
    } finally {
      setIsLoading(false);
    }
    
    setFillOpacity(0);
    console.log('Pin clicked:', pin);
  };

  // 도장 효과 활성화 함수
  const activateStamp = (type: 'yes' | 'no') => {
    setModalType(type);
    setShowModal(true);
    // 배경색 변경 (fill 효과)
    setFillOpacity(0.5);
  };

  // 투표 처리 함수
  const handleVote = (id: string, isPositive: boolean) => {
    console.log(`Vote on place ${id}: ${isPositive ? '맞아유' : '아니어유'}`);
    
    // 투표 상태 업데이트
    setVoteState(isPositive ? 'positive' : 'negative');
    
    // 실제로는 여기서 API 호출하여 투표 결과 전송
    // 예: postVote(id, isPositive);
    
    // 임시로 로컬 상태 업데이트 (실제로는 서버에서 업데이트된 값을 받아와야 함)
    if (selectedPlace) {
      const updatedPlace = {...selectedPlace};
      
      if (isPositive) {
        updatedPlace.positivePercent = Math.min(updatedPlace.positivePercent + 5, 100);
        updatedPlace.negativePercent = Math.max(updatedPlace.negativePercent - 5, 0);
      } else {
        updatedPlace.positivePercent = Math.max(updatedPlace.positivePercent - 5, 0);
        updatedPlace.negativePercent = Math.min(updatedPlace.negativePercent + 5, 100);
      }
      
      setSelectedPlace(updatedPlace);
    }
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Fill 효과 스타일
  const fillStyle = {
    backgroundColor: `rgba(0, 0, 0, ${fillOpacity})`,
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    pointerEvents: 'none' as const
  };

  if (isLoading && !selectedPinId) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      {/* Fill 레이어 (투표 후 배경색 변경) */}
      {fillOpacity > 0 && <div style={fillStyle} />}
      
      {/* 네이버 맵 */}
      <NaverMap pins={mapPins} selectedPinId={selectedPinId} onPinClick={handlePinClick} />

      {/* 장소 카드 리스트 - 핀 클릭 시에만 표시 */}
      {showPlaceCard && selectedPlace && (
        <PlaceCardList 
          places={[selectedPlace]} 
          selectedPlaceId={selectedPlaceId}
          voteState={voteState}
          onVote={handleVote}
          activateStamp={activateStamp}
        />
      )}

      {/* 도장 모달 */}
      {showModal && (
        <Modal 
          onClose={handleCloseModal} 
          type={modalType} 
        />
      )}
    </div>
  );
};

export default MainPage;