import {
  Text,
  TextInput,
  TextInputProps,
  Touchable,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {GreyUseForButton, coral, darkGrey} from '../../utilities/colors';
import {NameFont, buttonFont} from '../../utilities/textfont';
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
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: coral,
          width: '100%',
          height: scale(50),
        },
        ...(style as {}),
      }}
      {...rest}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: 'white',
          textAlign: 'center',
          fontFamily: buttonFont,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
