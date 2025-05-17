import { useEffect, useRef, useState } from 'react';
import type { PinWithMark } from '../../pin/pinInterface';
import { CHUNGBUK_COORD_PAIRS } from '../constant/coords';
import IC_Pin_default from '@/shared/assets/svg/ic_pin_default.svg';
import IC_Pin_x_default from '@/shared/assets/svg/ic_pin_x_default.svg';
import IC_Pin_click from '@/shared/assets/svg/ic_pin_click.svg';
import IC_Pin_x_click from '@/shared/assets/svg/ic_pin_x_click.svg';

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
  pins?: PinWithMark[];
  selectedPinId?: number | null;
  onPinClick?: (pin: PinWithMark) => void;
}

export const useNaverMap = ({
  latitude = 37.5665,
  longitude = 126.978,
  useCurrentLocation = true,
  pins = [],
  selectedPinId = null,
  onPinClick,
}: UseNaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [, setMapCenter] = useState({ lat: latitude, lng: longitude });
  const [isLoading, setIsLoading] = useState(useCurrentLocation);
  const [map, setMap] = useState<any>(null);
  const markerRefs = useRef<naver.maps.Marker[]>([]); // ✅ 마커들 참조

  // 현재 위치 가져오기
  useEffect(() => {
    if (!useCurrentLocation) {
      setMapCenter({ lat: latitude, lng: longitude });
      setIsLoading(false);
      return;
    }

    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude: currentLat, longitude: currentLng } = position.coords;
          setMapCenter({ lat: currentLat, lng: currentLng });
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

  // 지도 초기화 (최초 1회)
  useEffect(() => {
    if (isLoading) return;

    window.navermap_authFailure = () => console.error('네이버 지도 API 인증 실패');

    const initMap = () => {
      if (!window.naver || !window.naver.maps || !mapRef.current) return;

      const bounds = new window.naver.maps.LatLngBounds(
        new window.naver.maps.LatLng(36.0, 126.8),
        new window.naver.maps.LatLng(37.2, 128.0)
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

      // 충북 경계선
      const chungbukCoords = CHUNGBUK_COORD_PAIRS.map(
        ([lat, lng]) => new window.naver.maps.LatLng(lat, lng)
      );

      new window.naver.maps.Polyline({
        path: chungbukCoords,
        map: mapInstance,
        strokeColor: '#42BDCC',
        strokeOpacity: 0.8,
        strokeWeight: 3,
      });

      setMap(mapInstance); // ✅ 이후 마커 렌더링은 별도 effect
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=xggulbmz22';
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      const existing = document.querySelector('script[src*="map.naver.com"]');
      if (existing) document.head.removeChild(existing);
      delete window.navermap_authFailure;
    };
  }, [isLoading]);

  // 마커 렌더링은 따로 관리 (selectedPinId 변경 대응)
  useEffect(() => {
    if (!map) return;

    // 이전 마커 제거
    markerRefs.current.forEach(marker => marker.setMap(null));
    markerRefs.current = [];

    // 새 마커 렌더링
    pins.forEach(pin => {
      const position = new window.naver.maps.LatLng(pin.latitude, pin.longitude);
      const type = pin.defaultMark;
      const isSelected = pin.pinId === selectedPinId;

      const marker = new window.naver.maps.Marker({
        position,
        map,
        icon: {
          content: `<img src="${
            type === 'O'
              ? isSelected
                ? IC_Pin_click
                : IC_Pin_default
              : isSelected
                ? IC_Pin_x_click
                : IC_Pin_x_default
          }" alt="핀 아이콘 (${type})" style="width: 24px; height: 24px; pointer-events: auto; cursor: pointer;" />`,
          size: new window.naver.maps.Size(24, 24),
          anchor: new window.naver.maps.Point(12, 12),
        },
      });

      window.naver.maps.Event.addListener(marker, 'click', () => {
        if (onPinClick) onPinClick(pin);
      });

      markerRefs.current.push(marker); // 마커 저장
    });
  }, [map, pins, selectedPinId]);

  return { mapRef, isLoading };
};
