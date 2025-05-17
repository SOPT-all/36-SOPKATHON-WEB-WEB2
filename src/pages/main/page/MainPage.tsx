// MainPage.tsx
import { useEffect, useState } from 'react';
import NaverMap from '@/shared/components/naverMap/NaverMap';
import type { PinWithMark } from '@/shared/components/pin/pinInterface';
import Modal from '@/shared/components/modal/Modal';
import Header from '@/pages/main/components/header/Header';
import Plus from '../components/plus/Plus';
import { Button } from '@/shared/components';
import Ic_pin from '@/shared/assets/svg/ic_pin.svg';
import { GetPins } from '@/shared/apis/main/GetPins';

const MainPage = () => {
  const [selectedPinId, setSelectedPinId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
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
    console.log('🔥 클릭됨', lat, lng, naverMap); // ✅ 꼭 이거 찍혀야 함

    if (!isPlusClicked || !naverMap || selectedLocation) return;

    setSelectedLocation({ lat, lng });
    console.log('Ic_pin:', Ic_pin);
    // ⛳️ 여기서 절대경로 or public URL 나와야 함
    // 예: '/assets/ic_pin.abc123.svg'
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

      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default MainPage;
