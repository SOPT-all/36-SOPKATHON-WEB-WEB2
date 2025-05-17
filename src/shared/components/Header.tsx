import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '@/shared/assets/svg/ic_arrow_left_43.svg';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header = ({ title, showBackButton = true, onBackClick }: HeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="pt-4 pb-6">
      {showBackButton && (
        <div className="left-0 top-0 absolute">
          <button onClick={handleBackClick} className="p-2">
            <img src={ArrowLeftIcon} alt="Back" />
          </button>
        </div>
      )}
      
      {title && (
        <div className="left-[16px] top-[59px] absolute">
          <h1 className="text-black text-lg font-bold font-pretendard leading-relaxed">
            {title}
          </h1>
        </div>
      )}
    </header>
  );
};

export default Header;
