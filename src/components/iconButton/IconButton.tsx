import {
  Text,
  TextInput,
  TextInputProps,
  Touchable,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {
  ButtonBackground,
  GreyUseForButton,
  black,
  coral,
  darkGrey,
  grey0,
  white,
} from '../../utilities/colors';
import {
  NameFont,
  avenirBlackCentered,
  buttonFont,
} from '../../utilities/textfont';
import {scale} from '../../utilities/scale';
import {Icon} from 'react-native-vector-icons/Icon';

export type Props = TouchableOpacityProps & {
  label: string;
  noRound?: boolean;
  Icon: any;
  iconName: string;
  iconSize?: number;
  iconColor?: string;
};

export default function IconButton({
  label,
  Icon,
  iconName,
  iconSize,
  iconColor,
  noRound,
  style,
  ...rest
}: Props) {
  const height = scale(46);
  const fontSize = height * 0.42;
  const borderRadius = noRound ? undefined : scale(10);
  const resolvedSize = iconSize ?? scale(25);
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{
        ...{
          height,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: ButtonBackground,
          display: 'flex',
          borderRadius: borderRadius,
          paddingLeft: scale(16),
          paddingRight: scale(16),
          width: '100%',
        },
        ...(style as {}),
      }}
      {...rest}>
      <Text
        style={{
          fontWeight: '700',
          color: GreyUseForButton,
          textAlign: 'left',
          fontFamily: buttonFont,
          fontSize,
          includeFontPadding: false,
          textAlignVertical: 'center',
        }}>
        {label}
      </Text>
      <Icon
        name={iconName}
        size={resolvedSize}
        color={iconColor ?? black}
        style={{}}
      />
    </TouchableOpacity>
  );
}
