import { useState } from 'react';
import NaverMap from '@/shared/components/naverMap/NaverMap';
import { dummyPins } from './dummy';
import type { PinWithMark } from '@/shared/components/pin/pinInterface';
import Modal from '@/shared/components/modal/Modal';

const MainPage = () => {
  const [selectedPinId, setSelectedPinId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handlePinClick = (pin: PinWithMark) => {
    setSelectedPinId(prevId => (prevId === pin.pinId ? null : pin.pinId));
    // TODO: 여기에 서버 요청 로직 추가
    console.log('Pin clicked:', pin);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Click</button>
      <NaverMap pins={dummyPins} selectedPinId={selectedPinId} onPinClick={handlePinClick} />

      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default MainPage;
