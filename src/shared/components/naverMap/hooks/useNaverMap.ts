// hooks/useNaverMap.ts
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    naver: any;
    navermap_authFailure?: () => void;
  }
}

interface UseNaverMapProps {
  latitude?: number;
  longitude?: number;
  useCurrentLocation?: boolean;
}

export const useNaverMap = ({
  latitude = 37.5665,
  longitude = 126.978,
  useCurrentLocation = true,
}: UseNaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState({ lat: latitude, lng: longitude });
  const [isLoading, setIsLoading] = useState(useCurrentLocation);
  const [map, setMap] = useState<any>(null);

  // 위치 가져오기
  useEffect(() => {
    if (!useCurrentLocation) {
      setLocation({ lat: latitude, lng: longitude });
      setIsLoading(false);
      return;
    }

    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude: currentLat, longitude: currentLng } = position.coords;
          console.log('현재 위치:', currentLat, currentLng);
          setLocation({ lat: currentLat, lng: currentLng });
          setIsLoading(false);

          if (map) {
            const newCenter = new window.naver.maps.LatLng(currentLat, currentLng);
            map.setCenter(newCenter);
            new window.naver.maps.Marker({
              position: newCenter,
              map: map,
            });
          }
        },
        error => {
          console.error('위치 정보를 가져오는 데 실패했습니다:', error);
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.error('이 브라우저는 위치 정보를 지원하지 않습니다.');
      setIsLoading(false);
    }
  }, [useCurrentLocation, latitude, longitude]);

  // 지도 초기화
  useEffect(() => {
    if (isLoading) return;

    window.navermap_authFailure = () => console.error('네이버 지도 API 인증 실패');

    const initMap = () => {
      if (!window.naver || !window.naver.maps || !mapRef.current) return;

      const bounds = new window.naver.maps.LatLngBounds(
        new window.naver.maps.LatLng(36.0, 126.8), // 남서쪽
        new window.naver.maps.LatLng(37.2, 128.0) // 북동쪽
      );

      const mapInstance = new window.naver.maps.Map(mapRef.current, {
        center: bounds.getCenter(),
        zoom: 8,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      });

      mapInstance.fitBounds(bounds);

      // ✅ 충북 단순화된 경계 좌표 (예시용)
      const chungbukCoords = [
        new naver.maps.LatLng(37.094, 127.48),
        new naver.maps.LatLng(36.92, 128.1),
        new naver.maps.LatLng(36.4, 128.05),
        new naver.maps.LatLng(36.0, 127.7),
        new naver.maps.LatLng(36.3, 126.9),
        new naver.maps.LatLng(36.8, 127.0),
        new naver.maps.LatLng(37.094, 127.48), // 닫기
      ];

      // ✅ 테두리만 그리기 (Polyline)
      new naver.maps.Polyline({
        path: chungbukCoords,
        map: mapInstance,
        strokeColor: '#42BDCC',
        strokeOpacity: 0.8,
        strokeWeight: 3,
      });

      setMap(mapInstance);
    };

    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = 'https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=xggulbmz22';
    mapScript.onload = initMap;
    document.head.appendChild(mapScript);

    return () => {
      const script = document.querySelector('script[src*="map.naver.com"]');
      if (script) document.head.removeChild(script);
      delete window.navermap_authFailure;
    };
  }, [location, isLoading]);

  return { mapRef, isLoading };
};
