import {Pressable, TextInput, TextInputProps, View} from 'react-native';

import {black, coral, grey3, opacity, white} from '../../utilities/colors';
import {scale} from '../../utilities/scale';
import {useEffect, useRef, useState} from 'react';
import {AntDesign} from '@expo/vector-icons';

export type Props = TextInputProps & {};

const INPUT_HEIGHT = scale(54);
const FONT_SIZE = INPUT_HEIGHT * 0.4;
const ICON_SIZE = INPUT_HEIGHT * 0.5;
const INPUT_FOOTER_NAME = 'search-input-footer';

export default function SearchInput({style, ...rest}: Props) {
  const inputRef = useRef<TextInput | null>(null);
  const [selectedInput, setSelectedInput] = useState<string>('');

  useEffect(() => {
    if (selectedInput === '') inputRef?.current?.blur();
    else if (selectedInput === INPUT_FOOTER_NAME) {
      inputRef?.current?.focus();
    }
  }, [selectedInput]);

  return (
    <Pressable
      onPress={() => setSelectedInput(INPUT_FOOTER_NAME)}
      style={{
        ...{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: grey3,
          borderRadius: scale(5),
          borderWidth: 2,
          borderColor: grey3,

          //   border: `1px solid ${grey3}`,

          // flex: 1,
          // paddingTop: platform === 'ios' ? INPUT_PADDING_VERTICAL : undefined,
          // paddingBottom: platform === 'ios' ? INPUT_PADDING_VERTICAL : undefined,
          // // paddingTop: INPUT_PADDING_VERTICAL,
          // // paddingBottom: INPUT_PADDING_VERTICAL,
          // paddingLeft: INPUT_PADDING_SIDE,
          // paddingRight: INPUT_PADDING_SIDE,
          // marginTop: INPUT_MARGIN_VERTICAL,
          // marginBottom: INPUT_MARGIN_VERTICAL,
          // overflow: 'hidden',
          height: INPUT_HEIGHT,
        },
        ...(style as {}),
      }}>
      <AntDesign
        name="search1"
        size={ICON_SIZE}
        color={white}
        style={{
          marginLeft: scale(10),
          marginRight: scale(10),
        }}
      />
      <TextInput
        ref={inputRef}
        style={{
          //   fontSize: INPUT_LINE_HEIGHT,
          //   fontFamily: 'SFProTextRegular',
          color: black,
          fontSize: FONT_SIZE,
          flex: 1,
          //   paddingTop: platform === 'ios' ? 0 : undefined,
        }}
        selectionColor={coral}
        placeholderTextColor={opacity(white, 0.8)}
        onFocus={() => setSelectedInput(INPUT_FOOTER_NAME)}
        {...rest}
      />
    </Pressable>
  );
}
