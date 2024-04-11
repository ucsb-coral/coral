import {Dimensions} from 'react-native';
export type ScaleOptionsType = {
  type?: ScaleType;
  round?: RoundType;
  minimumValue?: number;
  maximumValue?: number;
};
export type ScaleType = 'EVEN' | 'VERTICAL' | 'HORIZONTAL';
export type RoundType = 'CEIL' | 'FLOOR' | 'ROUND';

const {height, width} = Dimensions.get('screen');

const scaleNumber = (number: number, type?: ScaleType) => {
  switch (type) {
    case 'VERTICAL':
      return (number * height) / 926;
    case 'HORIZONTAL':
      return (number * width) / 428;
    default:
      return number * Math.sqrt((width * height) / (428 * 926));
  }
};

const roundNumber = (number: number, type?: RoundType) => {
  if (!type) return number;
  switch (type) {
    case 'CEIL':
      return Math.ceil(number);
    case 'FLOOR':
      return Math.floor(number);
    case 'ROUND':
      return Math.round(number);
  }
};

const scale = (number: number, options?: ScaleOptionsType) => {
  let scaledNumber = scaleNumber(number, options?.type);
  if (!options) return scaledNumber;
  const {round, minimumValue, maximumValue} = options;
  if (round) scaledNumber = roundNumber(scaledNumber, round);
  if (minimumValue) scaledNumber = Math.max(scaledNumber, minimumValue);
  if (maximumValue) scaledNumber = Math.min(scaledNumber, maximumValue);
  return scaledNumber;
};

const standardMargin = scale(16);

export {width, height, scale, standardMargin};
