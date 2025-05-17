import { Button } from '@/shared/components';
import { useNavigate } from 'react-router-dom';

const Splash = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/main');
  };

  return (
    <div className="relative flex flex-col justify-center items-center bg-[#E1FCFF]  min-h-screen">
      <img src="/path-to-your-logo.svg" alt="Logo" className="mb-8" />
      <Button onClick={handleClick} variant="teal" className="absolute bottom-8 ">
        등록하기
      </Button>
    </div>
  );
};

export default Splash;
