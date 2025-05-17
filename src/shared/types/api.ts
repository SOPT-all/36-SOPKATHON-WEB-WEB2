export interface CreatePinRequest {
  isCorrect: boolean;
  region: string;
  placeName: string;
  imageUrl?: string;
  latitude: number;
  longitude: number;
  reviews: string[];
  oneliner: string;
}

export interface PinResponse {
  code: string;
  message: string;
  data: {
    pinId: number;
    latitude: number;
    longitude: number;
    image: string;
    oneLiner: string;
    reviews: string[];
    likeRate: number;
    hateLate: number;
  };
}

// API 응답 기본 구조
export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

// 핀 상세 정보 응답 데이터
export interface PinDetailResponse {
  pinId: number;
  latitude: number;
  longitude: number;
  image: string;
  placeName: string;
  regionName?: string;
  oneLiner: string;
  reviews: string[];
  likeRate: number;
  hateLate: number;
}

// 핀 목록의 핀 데이터
export interface PinListItem {
  pinId: number;
  latitude: number;
  longitude: number;
  defaultMark: string; // "O" 또는 "X"
}

// 핀 목록 응답 데이터
export interface PinsListResponse {
  pins: PinListItem[];
}
