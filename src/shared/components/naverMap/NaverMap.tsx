import { useNaverMap } from './hooks/useNaverMap';
import type { PinWithMark } from '../pin/pinInterface';

interface NaverMapProps {
  className?: string;
  latitude?: number;
  longitude?: number;
  useCurrentLocation?: boolean;
  pins?: PinWithMark[];
  selectedPinId?: number | null;
  onPinClick?: (pin: PinWithMark) => void;
}

declare global {
  interface Window {
    naver: any;
    navermap_authFailure?: () => void;
  }
}

export default function NaverMap({
  className,
  latitude = 36.6357,
  longitude = 127.4917,
  useCurrentLocation = false,
  pins = [],
  selectedPinId = null,
  onPinClick,
}: NaverMapProps) {
  const { mapRef, isLoading } = useNaverMap({
    latitude,
    longitude,
    useCurrentLocation,
    pins,
    selectedPinId,
    onPinClick,
  });

  return (
    <>
      {isLoading ? (
        <div
          className={`w-full h-full flex-shrink-0 flex justify-center items-center ${className || ''}`}
        >
          <p>위치 정보를 가져오는 중...</p>
        </div>
      ) : (
        <div
          id="map"
          ref={mapRef}
          className={`w-full h-full flex-shrink-0 ${className || ''}`}
        ></div>
      )}
    </>
  );
}
