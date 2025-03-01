import { PONDERATIONS, BLACK_COLOR, WHITE_COLOR } from './constants';

export const getBrightness = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return PONDERATIONS.R * r + PONDERATIONS.G * g + PONDERATIONS.B * b;
};

export const returnBlackOrWhite = (hex: string) => {
  const brightness = getBrightness(hex);
  return brightness > 128 ? BLACK_COLOR : WHITE_COLOR;
};
