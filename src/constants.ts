import { Dimensions } from 'react-native';

export const MAX_HEX_VALUE = 16777215; // (256 x 256 x 256) -1
export const WHITE_COLOR = '#FFFFFF';
export const BLACK_COLOR = '#000000';

export const PONDERATIONS = {
  R: 0.2126,
  G: 0.7152,
  B: 0.0722,
};

export const BOX_SIZE = Dimensions.get('window').width / 5;
