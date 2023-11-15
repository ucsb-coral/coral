import * as Font from 'expo-font';

const NameFont = 'Inter-Bold'; //Font weight 700
const EmailFont = 'Inter'; //Font weight 700
const buttonFont = 'Roboto-Bold'; //Font weight 700

const sfProTextRegular = 'sfProTextRegular';
const sfProTextSemibold = 'sfProTextSemibold';
const sfProTextBold = 'sfProTextBold';
const avenirBlack = 'avenirBlack';
const avenirBook = 'avenirBook';
const avenirRoman = 'avenirRoman';

const loadFonts = async () =>
  Font.loadAsync({
    [sfProTextRegular]: require('../assets/fonts/sfProText/sfProTextRegular.ttf'),
    [sfProTextSemibold]: require('../assets/fonts/sfProText/sfProTextSemibold.otf'),
    [sfProTextBold]: require('../assets/fonts/sfProText/sfProTextBold.ttf'),
    [avenirBlack]: require('../assets/fonts/avenir/avenirBlack.otf'),
    [avenirBook]: require('../assets/fonts/avenir/avenirBook.otf'),
    [avenirRoman]: require('../assets/fonts/avenir/avenirRoman.otf'),
  });

export {
  loadFonts,
  sfProTextRegular,
  sfProTextSemibold,
  sfProTextBold,
  avenirBlack,
  avenirBook,
  avenirRoman,
  buttonFont,
  NameFont,
  EmailFont,
};
