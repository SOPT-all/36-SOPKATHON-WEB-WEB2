import { useEffect } from 'react';
import Ic_No from '@/shared/assets/svg/ic_no.svg';
import Ic_Yes from '@/shared/assets/svg/ic_yes.svg';

interface ModalProps {
  onClose: () => void;
}

const Modal = ({ onClose }: ModalProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1500); // 3초 후 자동 닫힘

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/50">
      <img src={Ic_Yes} alt="model img" />
    </div>
  );
};

export default Modal;
