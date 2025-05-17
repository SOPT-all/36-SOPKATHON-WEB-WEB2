import PropertyO from '@/shared/assets/svg/Property 1=O.svg';
import PropertyX from '@/shared/assets/svg/Property 1=X.svg';

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
}

export const categories: CategoryItem[] = [
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