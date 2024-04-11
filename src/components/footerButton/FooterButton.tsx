import {
  Text,
  TextInput,
  TextInputProps,
  Touchable,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {GreyUseForButton, coral, darkGrey, white} from '../../utilities/colors';
import {
  NameFont,
  avenirBlackCentered,
  buttonFont,
} from '../../utilities/textfont';
import {scale} from '../../utilities/scale';

export type Props = TouchableOpacityProps & {
  label: string;
};

export default function FooterButton({label, style, ...rest}: Props) {
  return (
    <TouchableOpacity
      style={{
        ...{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: coral,
          width: '100%',
          height: scale(50),
        },
        ...(style as {}),
      }}
      {...rest}>
      <Text
        style={{
          color: white,
          textAlign: 'center',
          fontFamily: avenirBlackCentered,
          fontSize: scale(15),
          includeFontPadding: false,
          textAlignVertical: 'center',
        }}>
        Join
      </Text>
    </TouchableOpacity>
  );
}
