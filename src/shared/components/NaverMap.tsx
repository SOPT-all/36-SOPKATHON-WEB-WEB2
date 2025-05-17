import { useEffect, useRef, useState } from 'react';

interface NaverMapProps {
  className?: string;
  latitude?: number;
  longitude?: number;
  useCurrentLocation?: boolean;
}

declare global {
  interface Window {
    naver: any;
    navermap_authFailure?: () => void;
  }
}

export default function NaverMap({ 
  className, 
  latitude = 37.5665, 
  longitude = 126.9780,
  useCurrentLocation = true
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [location, setLocation] = useState({ lat: latitude, lng: longitude });
  const [isLoading, setIsLoading] = useState(useCurrentLocation);
  const [map, setMap] = useState<any>(null);

  // 현재 위치 가져오기
  useEffect(() => {
    if (!useCurrentLocation) {
      setLocation({ lat: latitude, lng: longitude });
      setIsLoading(false);
      return;
    }

    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: currentLat, longitude: currentLng } = position.coords;
          console.log('현재 위치:', currentLat, currentLng);
          setLocation({ lat: currentLat, lng: currentLng });
          setIsLoading(false);
          
          // 이미 지도가 생성되어 있다면 위치 업데이트
          if (map) {
            const newCenter = new window.naver.maps.LatLng(currentLat, currentLng);
            map.setCenter(newCenter);
            
            // 마커도 이동 (변수 선언 없이 직접 생성)
            new window.naver.maps.Marker({
              position: newCenter,
              map: map
            });
          }
        },
        (error) => {
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

  useEffect(() => {
    if (isLoading) return; // 위치 정보가 로드될 때까지 대기

    // 인증 실패 핸들러
    window.navermap_authFailure = () => console.error('네이버 지도 API 인증 실패');

    // 지도 초기화 함수
    const initMap = () => {
      if (!window.naver || !window.naver.maps) return;

      const mapInstance = new window.naver.maps.Map('map', {
        center: new window.naver.maps.LatLng(location.lat, location.lng),
        zoom: 15,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      });
      
      // 마커 추가
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(location.lat, location.lng),
        map: mapInstance
      });

      setMap(mapInstance);
    };

    // 스크립트 로드
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=xggulbmz22`;
    mapScript.onload = initMap;
    document.head.appendChild(mapScript);

    return () => {
      const script = document.querySelector('script[src*="map.naver.com"]');
      if (script) document.head.removeChild(script);
      delete window.navermap_authFailure;
    };
  }, [location, isLoading]);

  return (
    <>
      {isLoading ? (
        <div className={`w-full h-full flex-shrink-0 flex justify-center items-center ${className || ''}`}>
          <p>위치 정보를 가져오는 중...</p>
        </div>
      ) : (
        <div id="map" ref={mapRef} className={`w-full h-full flex-shrink-0 ${className || ''}`}></div>
      )}
    </>
  );
} 