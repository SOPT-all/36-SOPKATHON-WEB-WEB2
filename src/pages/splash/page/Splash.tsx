import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo1 from '@shared/assets/svg/logo1.svg';
import Logo2 from '@shared/assets/svg/logo2.svg';
import Sudal from '@shared/assets/images/image.png';

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/main');
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex flex-col justify-center items-center bg-[#42BDCC] min-h-screen">
      <img src={Logo1} alt="로고1" className="mt-[79px] mb-[19px]" />
      <img src={Logo2} alt="로고2" className="mb-[35px]" />
      <img src={Sudal} alt="수달" />
    </div>
  );
};

export default Splash;
