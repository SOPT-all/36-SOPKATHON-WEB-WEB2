
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