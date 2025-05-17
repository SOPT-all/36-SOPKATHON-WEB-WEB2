import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReviewPlace } from "./components";

interface ReviewPlaceContainerProps {
  category?: string | null;
  onBack?: () => void;
  standalone?: boolean;
}

const ReviewPlaceContainer = ({ 
  category: propCategory, 
  onBack, 
  standalone = false 
}: ReviewPlaceContainerProps) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string | null>(propCategory || null);

  useEffect(() => {
    if (standalone) {
      const savedCategory = localStorage.getItem('selectedCategory');
      if (savedCategory) {
        setCategory(savedCategory);
      } else {
        navigate('/upload');
      }
    }
  }, [standalone, navigate]);

  // 브라우저 기본 뒤로가기를 처리하기 위한 효과
  useEffect(() => {
    const handlePopState = () => {
      // 브라우저 뒤로가기 버튼 클릭 시 메인으로 리다이렉트
      navigate('/main', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleBack = () => {
    if (standalone) {
      // 히스토리를 대체하여 뒤로가기 시 이전 페이지들을 건너뛰도록 함
      navigate('/main', { replace: true });
    } else if (onBack) {
      onBack();
    }
  };

  return <ReviewPlace category={category} onBack={handleBack} />;
};

export default ReviewPlaceContainer; 