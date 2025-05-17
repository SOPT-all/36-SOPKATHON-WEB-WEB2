export interface PinBase {
  pinId: number;
  latitude: number;
  longitude: number;
  defaultMark: 'O' | 'X';
}

export interface PinWithMark extends PinBase {
  defaultMark: 'O' | 'X';
}
