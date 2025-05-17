import { useEffect, useState } from 'react';

import NaverMap from '@/shared/components/naverMap/NaverMap';
import type { PinWithMark } from '@/shared/components/pin/pinInterface';
import Modal from '@/shared/components/modal/Modal';
import { PlaceCardList } from '../components';
import type { LocationDetail } from '@/shared/constants/mockData';
import Header from '@/pages/main/components/header/Header';
import Plus from '../components/plus/Plus';
import { Button } from '@/shared/components';
import Ic_pin from '@/shared/assets/svg/ic_pin.svg?url';
import { GetPins } from '@/shared/apis/main/GetPins';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const [selectedPinId, setSelectedPinId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'yes' | 'no'>('yes'); // ✅ 모달 타입 상태 추가
  const [isPlusClicked, setIsPlusClicked] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [naverMap, setNaverMap] = useState<any>(null);
  const [pins, setPins] = useState<PinWithMark[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<LocationDetail | null>(null);
  const [showPlaceCard, setShowPlaceCard] = useState(false);

  useEffect(() => {
    const loadPins = async () => {
      try {
        const res = await GetPins();
        setPins(res.data);
      } catch (error) {
        console.error('핀 불러오기 실패:', error);
      }
    };
    loadPins();
  }, []);

  const handlePinClick = (pin: PinWithMark) => {
    setSelectedPinId(prevId => (prevId === pin.pinId ? null : pin.pinId));

    // 예시: 선택된 핀 정보를 가짜로 설정 (실제로는 API 호출해서 상세 정보를 받아와야 함)
    setSelectedPlace({
      id: pin.pinId.toString(),
      title: `장소 ${pin.pinId}`,
      location: `${pin.latitude}, ${pin.longitude}`,
      regionName: '지역 정보',
      description: '설명 텍스트 예시',
      tag: '태그 예시',
      imageUrl: '',
      positivePercent: 70,
      negativePercent: 30,
      reviews: [],
    });

    setShowPlaceCard(true);
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (!isPlusClicked || !naverMap) return;

    setSelectedLocation({ lat, lng });

    new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(lat, lng),
      map: naverMap,
      icon: {
        content: `<img src="${Ic_pin}" alt="선택된 위치" style="width: 40px; height: 40px; pointer-events: auto; z-index: 9999;" />`,
        size: new window.naver.maps.Size(40, 40),
        anchor: new window.naver.maps.Point(20, 20),
      },
    });
  };

  // ✅ 도장 활성화 함수
  const activateStamp = (type: 'yes' | 'no') => {
    setModalType(type);
    setShowModal(true);
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
              navigate('/upload');
            }}
          >
            <span className="text-sm font-bold font-['Pretendard'] leading-tight">장소 정하기</span>
          </Button>
        </div>
      )}

      {/* ✅ 장소 카드 리스트 */}
      {!isPlusClicked && showPlaceCard && selectedPlace && (
        <div className="absolute bottom-[120px] w-full px-4 z-50">
          <PlaceCardList
            places={[selectedPlace]}
            selectedPlaceId={selectedPlace.id}
            voteState="none"
            onVote={() => {}}
            activateStamp={activateStamp} // ✅ 도장 버튼 누르면 모달 띄우기
          />
        </div>
      )}

      {/* ✅ 모달 */}
      {showModal && <Modal type={modalType} onClose={() => setShowModal(false)} />}
    </>
  );
};

export default MainPage;
