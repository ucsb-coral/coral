import {Text, TextInput, TextInputProps, View, ViewStyle} from 'react-native';
import {
  GreyUseForButton,
  black,
  coral,
  darkGrey,
  grey0,
  grey3,
  grey5,
  opacity,
} from '../../utilities/colors';
import {NameFont, buttonFont} from '../../utilities/textfont';
import {scale} from '../../utilities/scale';
import {CSSProperties} from 'react';

export type Props = TextInputProps & {
  label?: string;
  positionStyle?: ViewStyle;
};

export default function Input({
  label,
  style,
  value,
  maxLength,
  positionStyle,
  ...rest
}: Props) {
  const {multiline} = rest;
  return (
    <View
      style={{
        ...{
          display: 'flex',
          alignItems: 'flex-start',
          width: '100%',
          padding: scale(16),
          paddingBottom: 0,
        },
        ...positionStyle,
      }}>
      {!!label && (
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: GreyUseForButton,
            textAlign: 'left',
            fontFamily: buttonFont,
            marginBottom: scale(6),
          }}>
          {`${label}:`}
        </Text>
      )}

      <View
        style={{
          backgroundColor: opacity(coral, 0.2),
          width: '100%',
          borderRadius: scale(6),
          paddingTop: multiline ? scale(8) : 0,
          paddingBottom: multiline ? scale(12) : 0,
        }}>
        <TextInput
          style={{
            ...{
              fontSize: 20,
              fontWeight: '600',
              fontFamily: NameFont,
              minHeight: multiline ? scale(120) : scale(55),
              padding: 0,
              marginLeft: scale(12),
              color: black,
            },
            ...(style as {}),
          }}
          value={value}
          maxLength={maxLength}
          {...rest}
        />
      </View>
      {!!maxLength && (
        <Text
          style={{
            fontFamily: buttonFont,
            marginTop: scale(4),
            fontSize: scale(12),
            fontWeight: '400',
            color: GreyUseForButton,
            alignSelf: 'flex-end',
          }}>
          {maxLength - (value?.length ?? 0)}
        </Text>
      )}
    </View>
  );
}
