export interface LocationDetail {
  id: string;
  title: string;
  location: string;
  regionName: string;
  description: string;
  tag: string;
  imageUrl: string;
  positivePercent: number;
  negativePercent: number;
  reviews: string[];
}

export const mockLocationDetails: LocationDetail[] = [
  {
    id: '1',
    title: '청주시 어느 느낌 카페',
    location: '청주시',
    regionName: '청주시',
    description:
      '여기 너무 좋은데 사람들이 너무 많아요. 조용한 분위기에서 커피를 마시고 싶었는데 사람 소리가 너무 시끄러워요.',
    tag: '사람이 너무 많아요',
    imageUrl: '../assets/images/place-image.jpg',
    positivePercent: 75,
    negativePercent: 25,
    reviews: ['방문객수', '서비스', '접근성', '위생', '안전성'],
  },
  {
    id: '2',
    title: '서울 홍대 맛집',
    location: '서울시 마포구',
    regionName: '서울시 마포구',
    description: '맛은 정말 좋은데 가격이 너무 비싸요. 양도 적어서 조금 아쉬웠어요.',
    tag: '가격이 비싸요',
    imageUrl: '../assets/images/place-image.jpg',
    positivePercent: 60,
    negativePercent: 40,
    reviews: ['서비스', '접근성', '위생'],
  },
  {
    id: '3',
    title: '부산 해운대 카페',
    location: '부산시 해운대구',
    regionName: '부산시 해운대구',
    description: '바다가 보이는 뷰가 정말 좋아요. 하지만 주차가 너무 어려워서 불편했어요.',
    tag: '주차가 어려워요',
    imageUrl: '../assets/images/place-image.jpg',
    positivePercent: 80,
    negativePercent: 20,
    reviews: ['접근성', '안전성', '역사문화', '기타'],
  },
];
