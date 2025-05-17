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

  useEffect(() => {
    const handlePopState = () => {
      navigate('/main', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleBack = () => {
    if (standalone) {
      navigate('/main', { replace: true });
    } else if (onBack) {
      onBack();
    }
  };

  return <ReviewPlace category={category} onBack={handleBack} />;
};

export default ReviewPlaceContainer; 