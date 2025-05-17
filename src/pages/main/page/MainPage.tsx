import { useEffect, useState } from 'react';

import NaverMap from '@/shared/components/naverMap/NaverMap';
import type { PinWithMark } from '@/shared/components/pin/pinInterface';
import Modal from '@/shared/components/modal/Modal';
import { PlaceCardList } from '../components';
import type { LocationDetail } from '@/shared/constants/mockData';
import Header from '@/pages/main/components/header/Header';
import { getPinsList, getPinDetail } from '@/shared/apis/pins';
import type { PinListItem } from '@/shared/types/api';
import Plus from '../components/plus/Plus';
import { Button } from '@/shared/components';
import Ic_pin from '@/shared/assets/svg/ic_pin.svg';
import { GetPins } from '@/shared/apis/main/GetPins';

// Place 인터페이스 정의
interface Place {
  id: string;
  positivePercent: number;
  negativePercent: number;
  // 필요한 추가 속성
}

type VoteStateType = 'positive' | 'negative' | null;
type ModalType = 'yes' | 'no';

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
  const [mapPins, setMapPins] = useState<PinWithMark[]>([]);  // dummyPins 제거
  const [showPlaceCard, setShowPlaceCard] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<LocationDetail | null>(null);
  const [isPlusClicked, setIsPlusClicked] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [naverMap, setNaverMap] = useState<any>(null);
  const [pins, setPins] = useState<PinWithMark[]>([]);

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
          // API 오류 시 빈 배열 사용
          setMapPins([]);
        }
      } catch (err) {
        console.error('핀 목록 불러오기 실패:', err);
        setError('핀 데이터를 불러오는데 실패했습니다.');
        // API 오류 시 빈 배열 사용
        setMapPins([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPins();
  }, []);

  useEffect(() => {
    const loadPins = async () => {
      try {
        const res = await GetPins();
        setPins(res.data); // 서버에서 받아온 pin 배열
      } catch (error) {
        console.error('핀 불러오기 실패:', error);
      }
    };
    loadPins();
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
      
      if (response.code === 's2000') {
        const data = response.data;
        
        // API 응답의 reviews 배열 처리
        const reviewsData = Array.isArray(data.reviews) ? data.reviews : 
                           typeof data.reviews === 'string' ? [data.reviews] : [];
        
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
  };

  const handleMapClick = (lat: number, lng: number) => {
    console.log('🔥 클릭됨', lat, lng, naverMap);

    if (!isPlusClicked || !naverMap || selectedLocation) return;

    setSelectedLocation({ lat, lng });
    console.log('Ic_pin:', Ic_pin);
    
    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map: naverMap,
      icon: {
        content: `<div style="
    width: 40px;
    height: 40px;
    background: red;
    border-radius: 50%;
    pointer-events: auto;
    z-index: 9999;
  "></div>`,
        size: new window.naver.maps.Size(40, 40),
        anchor: new window.naver.maps.Point(20, 20),
      },
    });
  };

  // 도장 효과 활성화 함수
  const activateStamp = (type: ModalType) => {
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
    <div>
      {isPlusClicked ? (
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 z-50 w-80 px-2.5 py-3 bg-sky-100 rounded-md flex justify-center items-center">
          <div className="text-teal-400 text-xs font-semibold font-['Pretendard'] leading-tight">
            리뷰 등록을 원하는 장소를 클릭해주세요
          </div>
        </div>
      ) : (
        <Header />
      )}

      <Plus onClick={() => setIsPlusClicked(true)} />

      <NaverMap
        key={`map-${isPlusClicked ? 'plus' : 'normal'}`}
        pins={pins}
        selectedPinId={selectedPinId}
        onPinClick={handlePinClick}
        onMapClick={handleMapClick}
        onMapReady={setNaverMap}
      />

      {isPlusClicked && (
        <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 z-50">
          <Button
            disabled={!selectedLocation}
            className={`w-80 px-2.5 py-4 rounded-xl inline-flex justify-center items-center gap-2.5 ${
              selectedLocation ? 'bg-teal-400 text-white' : 'bg-gray-100 text-gray-400'
            }`}
            onClick={() => {
              if (!selectedLocation) return;
              setShowModal(true);
            }}
          >
            <span className="text-sm font-bold font-['Pretendard'] leading-tight">장소 정하기</span>
          </Button>
        </div>
      )}

      <div className="relative w-full h-screen">
        {fillOpacity > 0 && <div style={fillStyle} />}
        
        {showPlaceCard && selectedPlace && (
          <PlaceCardList 
            places={[selectedPlace]} 
            selectedPlaceId={selectedPlaceId}
            voteState={voteState}
            onVote={handleVote}
            activateStamp={activateStamp}
          />
        )}

        {showModal && (
          <Modal 
            onClose={handleCloseModal} 
            type={modalType} 
          />
        )}
      </div>
    </div>
  );
};

export default MainPage;