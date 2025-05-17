declare global {
  interface Window {
    naver: typeof naver;
  }

  namespace naver {
    namespace maps {
      class LatLng {
        constructor(lat: number, lng: number);
      }

      class Map {
        constructor(element: HTMLElement, options: any);
        setCenter(latlng: LatLng): void;
      }

      class Marker {
        constructor(options: any);
        setMap(map: Map | null): void;
      }

      class Polyline {
        constructor(options: any);
      }

      class LatLngBounds {
        constructor(sw: LatLng, ne: LatLng);
        getCenter(): LatLng;
      }

      class Size {
        constructor(width: number, height: number);
      }

      class Point {
        constructor(x: number, y: number);
      }

      namespace Event {
        function addListener(
          instance: any,
          eventName: string,
          listener: (...args: any[]) => void
        ): void;
      }

      enum Position {
        TOP_RIGHT,
      }
    }
  }
}

export {};
