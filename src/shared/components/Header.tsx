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
    <div className="w-full py-4 px-4 flex items-center">
      {showBackButton && (
        <button 
          onClick={handleBackClick}
          className="w-11 h-11 flex items-center justify-center"
        >
          <img src={ArrowLeftIcon} alt="Back" className="w-6 h-6" />
        </button>
      )}
      <h1 className="text-body-bold-17 ml-2">{title}</h1>
    </div>
  );
};

export default Header; 