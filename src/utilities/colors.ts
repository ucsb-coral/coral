const white = '#FFFFFF';
const black = '#000000';
const grey = 'grey';
const grey0 = '#8E8E93';
const grey1 = '#AEAEB2';
const grey2 = '#C7C7CC';
const grey3 = '#D1D1D6';
const grey4 = '#E5E5EA';
const grey5 = '#F2F2F7';

const coral = '#F88379';

const red = '#FF0000';

// this color is used on Binyu user page welcome to use
const lightGrey = '#999'; //for user Email
const darkGrey = '#666'; //for user Name
const GreyUseForButton = '#333'; //for user button
const ButtonBackground = '#F883791A'; //for user button background

const transparent = 'transparent';

const opacityToHex = (opacity: number) => {
  return (opacity * 255).toString(16).substr(0, 2);
};

const opacity = (color?: string, opacity?: number) => {
  return `${color ?? '#FFFFFF'}${opacityToHex(opacity ?? 1)}`;
};

export {
  white,
  red,
  black,
  grey,
  grey0,
  grey1,
  grey2,
  grey3,
  grey4,
  grey5,
  coral,
  lightGrey,
  darkGrey,
  transparent,
  GreyUseForButton,
  ButtonBackground,
  opacity,
};
