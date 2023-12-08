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
  height?: number;
  label: string;
  rounded?: boolean;
};

export default function Button({
  height,
  label,
  rounded,
  style,
  ...rest
}: Props) {
  const resolvedHeight = height ?? scale(40);
  const fontSize = resolvedHeight * 0.42;
  const borderRadius = rounded ? resolvedHeight / 2 : resolvedHeight * 0.32;
  return (
    <TouchableOpacity
      style={{
        ...{
          backgroundColor: coral,
          height: resolvedHeight,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: borderRadius,
          paddingLeft: scale(16),
          paddingRight: scale(16),
        },
        ...(style as {}),
      }}
      {...rest}>
      <Text
        style={{
          color: white,
          textAlign: 'center',
          fontFamily: avenirBlackCentered,
          fontSize,
          includeFontPadding: false,
          textAlignVertical: 'center',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
