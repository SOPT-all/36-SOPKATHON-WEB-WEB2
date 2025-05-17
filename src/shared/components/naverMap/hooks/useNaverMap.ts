// useNaverMap.ts
import { useEffect, useRef, useState } from 'react';
import type { PinWithMark } from '../../pin/pinInterface';
import { CHUNGBUK_COORD_PAIRS } from '../constant/coords';
import IC_Pin_default from '@/shared/assets/svg/ic_pin_default.svg';
import IC_Pin_x_default from '@/shared/assets/svg/ic_pin_x_default.svg';
import IC_Pin_click from '@/shared/assets/svg/ic_pin_click.svg';
import IC_Pin_x_click from '@/shared/assets/svg/ic_pin_x_click.svg';

interface UseNaverMapProps {
  latitude?: number;
  longitude?: number;
  useCurrentLocation?: boolean;
  pins?: PinWithMark[];
  selectedPinId?: number | null;
  onPinClick?: (pin: PinWithMark) => void;
  onMapClick?: (lat: number, lng: number) => void;
  onMapReady?: (map: any) => void;
}

export const useNaverMap = ({
  latitude = 37.5665,
  longitude = 126.978,
  useCurrentLocation = true,
  pins = [],
  selectedPinId = null,
  onPinClick,
  onMapClick,
  onMapReady,
}: UseNaverMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [_mapCenter, setMapCenter] = useState({ lat: latitude, lng: longitude });
  const [isLoading, setIsLoading] = useState(useCurrentLocation);
  const [map, setMap] = useState<any>(null);
  const markerRefs = useRef<naver.maps.Marker[]>([]);

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
        center: new window.naver.maps.LatLng(_mapCenter.lat, _mapCenter.lng),
        zoom: 8,
        zoomControl: true,
        zoomControlOptions: {
          position: window.naver.maps.Position.TOP_RIGHT,
        },
      });

      mapInstance.fitBounds(bounds);

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

      if (onMapClick) {
        window.naver.maps.Event.addListener(mapInstance, 'click', (e: any) => {
          const lat = e.latlng.lat();
          const lng = e.latlng.lng();
          console.log('지도 클릭됨:', lat, lng);
          onMapClick(lat, lng);
        });
      }

      setMap(mapInstance);

      if (onMapReady) {
        onMapReady(mapInstance);
      }
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

  useEffect(() => {
    if (!map) return;

    markerRefs.current.forEach(marker => marker.setMap(null));
    markerRefs.current = [];

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

      markerRefs.current.push(marker);
    });
  }, [map, pins, selectedPinId]);

  return { mapRef, isLoading };
};
