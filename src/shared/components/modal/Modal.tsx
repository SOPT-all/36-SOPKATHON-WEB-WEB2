import { useEffect } from 'react';
import Ic_No from '@/shared/assets/svg/ic_no.svg';
import Ic_Yes from '@/shared/assets/svg/ic_yes.svg';

interface ModalProps {
  onClose: () => void;
  type: 'yes' | 'no'; // 도장 타입 (yes: 맞아유, no: 아니어유)
}

const Modal = ({ onClose, type }: ModalProps) => {
  // 디버깅용 로그
  useEffect(() => {
    console.log("Modal opened with type:", type);
    
    const timer = setTimeout(() => {
      console.log("Modal closing after timeout");
      onClose();
    }, 1500);

    return () => {
      console.log("Modal cleanup");
      clearTimeout(timer);
    };
  }, [onClose, type]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30">
      <div className="relative w-full h-full flex justify-center items-center">
        <img 
          src={type === 'yes' ? Ic_Yes : Ic_No} 
          alt={type === 'yes' ? '맞아유' : '아니어유'} 
          className="w-[200px] h-[200px] absolute transform rotate-12"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(12deg)'
          }}
        />
      </div>
    </div>
  );
};

export default Modal;