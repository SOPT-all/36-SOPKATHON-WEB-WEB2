import { useEffect, useState } from 'react';

import NaverMap from '@/shared/components/naverMap/NaverMap';
import type { PinWithMark } from '@/shared/components/pin/pinInterface';
import Modal from '@/shared/components/modal/Modal';
import { PlaceCardList } from '../components';
import type { LocationDetail } from '@/shared/constants/mockData';
import Header from '@/pages/main/components/header/Header';
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
  const [modalType, setModalType] = useState<ModalType>('yes');
  const [fillOpacity, setFillOpacity] = useState(0);
  const [voteState, setVoteState] = useState<VoteStateType>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlaceId] = useState<string | null>(null);

  const [isPlusClicked, setIsPlusClicked] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [naverMap, setNaverMap] = useState<any>(null);
  const [pins, setPins] = useState<PinWithMark[]>([]);

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

  const handlePinClick = (pin: PinWithMark) => {
    setSelectedPinId(prevId => (prevId === pin.pinId ? null : pin.pinId));
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
    
    // 임시로 로컬 상태 업데이트
    setPlaces(prevPlaces => 
      prevPlaces.map(place => {
        if (place.id === id) {
          if (isPositive) {
            return {
              ...place,
              positivePercent: Math.min(place.positivePercent + 5, 100),
              negativePercent: Math.max(place.negativePercent - 5, 0)
            };
          } else {
            return {
              ...place,
              positivePercent: Math.max(place.positivePercent - 5, 0),
              negativePercent: Math.min(place.negativePercent + 5, 100)
            };
          }
        }
        return place;
      })
    );
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

  return (
    <>
      {isPlusClicked && (
        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 z-50 w-80 px-2.5 py-3 bg-sky-100 rounded-md flex justify-center items-center">
          <div className="text-teal-400 text-xs font-semibold font-['Pretendard'] leading-tight">
            리뷰 등록을 원하는 장소를 클릭해주세요
          </div>
        </div>
      )}
      {!isPlusClicked && <Header />}

      <Plus onClick={() => setIsPlusClicked(true)} />

      <NaverMap
        key={isPlusClicked.toString()}
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
        {/* Fill 레이어 (투표 후 배경색 변경) */}
        {fillOpacity > 0 && <div style={fillStyle} />}
        
        {/* 네이버 맵 (dummyPins 대신 pins 사용) */}
        <NaverMap pins={pins} selectedPinId={selectedPinId} onPinClick={handlePinClick} />

        {/* 장소 카드 리스트 */}
        {places.length > 0 && (
          <PlaceCardList 
            places={places as LocationDetail[]}
            selectedPlaceId={selectedPlaceId || ''}
            voteState={voteState || 'none'} 
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
    </>
  );
};

export default MainPage;
