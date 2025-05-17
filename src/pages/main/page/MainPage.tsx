
import { useState } from 'react';
import NaverMap from '@/shared/components/naverMap/NaverMap';
import { dummyPins } from './dummy';
import type { PinWithMark } from '@/shared/components/pin/pinInterface';

const MainPage = () => {
  const [selectedPinId, setSelectedPinId] = useState<number | null>(null);

  const handlePinClick = (pin: PinWithMark) => {
    setSelectedPinId(prevId => (prevId === pin.pinId ? null : pin.pinId));
    // TODO: 여기에 서버 요청 로직 추가
    console.log('Pin clicked:', pin);
  };

  return (
    <>
      <NaverMap pins={dummyPins} selectedPinId={selectedPinId} onPinClick={handlePinClick} />
    </>
  );

};

export default MainPage;
