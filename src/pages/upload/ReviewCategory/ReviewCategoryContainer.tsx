import { useState } from 'react';
import { Button } from '@/shared/components';
import { CategoryCard } from './components';
import PropertyO from '@/shared/assets/svg/Property 1=O.svg';
import PropertyX from '@/shared/assets/svg/Property 1=X.svg';
import ArrowLeftIcon from '@/shared/assets/svg/ic_arrow_left_43.svg';
import { useNavigate } from 'react-router-dom';

interface CategoryItem {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
}

const ReviewCategoryContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const categories: CategoryItem[] = [
    {
      id: '아니어유?',
      title: '아니어유?',
      description: '나와 다른 충북에 대한<br/>이미지에 반박해주세요!',
      imgSrc: PropertyX,
    },
    {
      id: '맞아유!',
      title: '맞아유!',
      description: '내가 생각한 충북에 대한<br/>이미지에 리뷰를 작성해주세요',
      imgSrc: PropertyO,
    },
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="mobile-layout">
      {/* Back Button */}
      <div className="left-0 top-0 absolute">
        <button onClick={handleBackClick}>
          <img src={ArrowLeftIcon} alt="Back" />
        </button>
      </div>

      {/* Title */}
      <div className="left-[16px] top-[59px] absolute">
        <h1 className="text-black text-lg font-bold font-pretendard leading-relaxed">
          리뷰 카테코리를 선택해주세요!
        </h1>
      </div>

      {/* Category Cards */}
      <div className="flex flex-col gap-[16px] w-full items-center top-[104px] absolute">
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            imgSrc={category.imgSrc}
            selected={selectedCategory === category.id}
            onClick={() => handleCategorySelect(category.id)}
          />
        ))}
      </div>

      {/* Next Button */}
      <div className="px-4 w-full bottom-[12px] absolute">
        <Button disabled={!selectedCategory} className="w-full">
          다음
        </Button>
      </div>
    </div>
  );
};

export default ReviewCategoryContainer;
