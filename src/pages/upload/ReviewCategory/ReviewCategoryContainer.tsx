import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components';
import { CategoryCard } from './components';
import { categories } from './data/categories';
import type { CategoryItem } from './data/categories';
import ArrowLeftIcon from '@/shared/assets/svg/ic_arrow_left_43.svg';

interface ReviewCategoryContainerProps {
  onNext?: (category: string) => void;
  standalone?: boolean;
}

const ReviewCategoryContainer = ({ onNext, standalone = false }: ReviewCategoryContainerProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      navigate('/main', { replace: true });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBackClick = () => {
    navigate('/main', { replace: true });
  };
  
  const handleNextClick = () => {
    if (selectedCategory) {
      if (standalone) {
        localStorage.setItem('selectedCategory', selectedCategory);
        navigate('/upload/place');
      } else if (onNext) {
        onNext(selectedCategory);
      }
    }
  };

  return (
    <div className="mobile-layout">
      <header className="pt-4 pb-6">
      <div className="left-0 top-0 absolute">
          <button onClick={handleBackClick} className="p-2">
          <img src={ArrowLeftIcon} alt="Back" />
        </button>
      </div>

      <div className="left-[16px] top-[59px] absolute">
        <h1 className="text-black text-lg font-bold font-pretendard leading-relaxed">
            리뷰 카테고리를 선택해주세요!
        </h1>
      </div>
      </header>

      <main className="flex flex-col gap-[16px] w-full items-center top-[104px] absolute">
        {categories.map((category: CategoryItem) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            imgSrc={category.imgSrc}
            selected={selectedCategory === category.id}
            onClick={() => handleCategorySelect(category.id)}
          />
        ))}
      </main>

      <footer className="px-4 w-full bottom-[12px] absolute">
        <Button 
          disabled={!selectedCategory} 
          className="w-full"
          onClick={handleNextClick}
        >
          다음
        </Button>
      </footer>
    </div>
  );
};

export default ReviewCategoryContainer;
