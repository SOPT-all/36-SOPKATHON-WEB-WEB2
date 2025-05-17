import { useState, useEffect } from 'react';
import NaverMap from '@/shared/components/naverMap/NaverMap';
import { dummyPins } from './dummy';
import type { PinWithMark } from '@/shared/components/pin/pinInterface';
import Modal from '@/shared/components/modal/Modal';
import { PlaceCardList } from '../components';
import { mockLocationDetails } from '@/shared/constants/mockData';
import type { LocationDetail } from '@/shared/constants/mockData';

const MainPage = () => {
  const [selectedPinId, setSelectedPinId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'yes' | 'no'>('yes');
  const [places, setPlaces] = useState<LocationDetail[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | undefined>(undefined);
  const [voteState, setVoteState] = useState<'none' | 'positive' | 'negative'>('none');
  const [fillOpacity, setFillOpacity] = useState(0);

  // 컴포넌트 마운트 시 장소 데이터 불러오기
  useEffect(() => {
    // API 요청으로 대체 가능
    setPlaces(mockLocationDetails);
  }, []);

  const handlePinClick = (pin: PinWithMark) => {
    setSelectedPinId(prevId => (prevId === pin.pinId ? null : pin.pinId));
    
    // PIN ID에 해당하는 장소 ID 찾기 (실제로는 API 연동 시 추가 정보 필요)
    const placeIndex = (pin.pinId - 1) % places.length;
    const placeId = places[placeIndex]?.id;
    setSelectedPlaceId(placeId);
    
    // 핀 타입에 따라 초기 투표 상태 설정
    if (pin.defaultMark === 'X') {
      setVoteState('positive'); // X는 '맞아유' 선택 상태로 설정
    } else if (pin.defaultMark === 'O') {
      setVoteState('negative'); // O는 '아니어유' 선택 상태로 설정
    } else {
      setVoteState('none'); // 기본 상태
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
    
    // 임시로 로컬 상태 업데이트 (실제로는 서버에서 업데이트된 값을 받아와야 함)
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
    <div className="relative w-full h-screen">
      {/* Fill 레이어 (투표 후 배경색 변경) */}
      {fillOpacity > 0 && <div style={fillStyle} />}
      
      {/* 네이버 맵 */}
      <NaverMap pins={dummyPins} selectedPinId={selectedPinId} onPinClick={handlePinClick} />

      {/* 장소 카드 리스트 */}
      {places.length > 0 && (
        <PlaceCardList 
          places={places} 
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
