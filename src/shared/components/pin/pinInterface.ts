export interface PinBase {
  pinId: number;
  latitude: number;
  longitude: number;
}

export interface PinWithMark extends PinBase {
  defaultMark: 'O' | 'X';
}
