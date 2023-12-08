import {Text, TextInput, TextInputProps, View} from 'react-native';
import {GreyUseForButton, darkGrey} from '../../utilities/colors';
import {NameFont, buttonFont} from '../../utilities/textfont';

export type Props = TextInputProps & {
  label: string;
};

export default function Input({
  label,
  style,
  value,
  maxLength,
  ...rest
}: Props) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: GreyUseForButton,
          textAlign: 'left',
          fontFamily: buttonFont,
        }}>
        {`${label}:`}
      </Text>
      <TextInput
        style={{
          ...{
            fontSize: 20,
            fontWeight: '600',
            fontFamily: NameFont,
            color: darkGrey,
            textAlignVertical: 'top',
            flex: 1,
            padding: 0,
            marginLeft: 2,
          },
          ...(style as {}),
        }}
        value={value}
        maxLength={maxLength}
      />
      {!!maxLength && (
        <Text
          style={{
            fontSize: 12,
            fontWeight: '100',
            color: GreyUseForButton,
            fontFamily: buttonFont,
            textAlign: 'right',
          }}>
          {maxLength - (value?.length ?? 0)}
        </Text>
      )}
    </View>
  );
}
