import React, {Dispatch, SetStateAction, useEffect, useRef} from 'react';
import {Image, Pressable, TextInput, View} from 'react-native';
import {sendPng, sendDisabledPng} from '../../../../../assets/pngs/send';
import plusPng from '../../../../../assets/pngs/plus';
import {scale, standardMargin} from '../../../../../utilities/scale';
import useCustomActionSheet from '../../../../../utilities/useCustomActionSheet';
import {
  black,
  coral,
  grey0,
  grey3,
  lightGrey,
  opacity,
  white,
} from '../../../../../utilities/colors';
import InputFooterButton from './components/InputFooterButton';
import {platform} from '../../../../../utilities/platform';

export type Props = {
  message: string;
  setMessage: (message: string) => void;
  selectedInput: string;
  setSelectedInput: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
};

export const INPUT_FOOTER_NAME = 'chatInputFooter';
const BASE_HEIGHT = scale(54);

export default function InputFooter({
  message,
  setMessage,
  selectedInput,
  setSelectedInput,
  handleSendMessage,
}: Props) {
  const {showCustomActionSheet} = useCustomActionSheet();
  const inputRef = useRef<TextInput | null>(null);
  const MAX_BASE_HEIGHT = BASE_HEIGHT * 2.5;
  const INPUT_LINE_HEIGHT = BASE_HEIGHT * 0.32;
  const INPUT_PADDING_VERTICAL = INPUT_LINE_HEIGHT * 0.56;
  const INPUT_MARGIN_VERTICAL = INPUT_LINE_HEIGHT * 0.45;
  const INPUT_PADDING_SIDE = INPUT_LINE_HEIGHT * 0.64;
  const SIDE_PADDING = standardMargin;
  const PADDING = SIDE_PADDING / 2;

  const handleTakePicture = async () => {};

  const handleUploadImage = async () => {};

  const handleUploadVideo = async () => {};

  const handleUploadFile = async () => {};

  const openPlusAlert = () =>
    showCustomActionSheet({
      options: [
        {
          title: 'Take a Photo',
          onPress: handleTakePicture,
        },
        {
          title: 'Upload an Image',
          onPress: handleUploadImage,
        },
        {
          title: 'Upload a Video',
          onPress: handleUploadVideo,
        },
        {
          title: 'Upload a File',
          onPress: handleUploadFile,
        },
      ],
    });

  useEffect(() => {
    if (selectedInput === '') inputRef?.current?.blur();
    else if (selectedInput === INPUT_FOOTER_NAME) {
      inputRef?.current?.focus();
    }
  }, [selectedInput]);

  return (
    <View style={{backgroundColor: white}}>
      <Pressable
        onPress={() => setSelectedInput(INPUT_FOOTER_NAME)}
        style={{
          minHeight: BASE_HEIGHT,
          maxHeight: MAX_BASE_HEIGHT,
          width: '100%',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <InputFooterButton
            size={BASE_HEIGHT}
            paddingLeft={SIDE_PADDING}
            paddingRight={PADDING}
            onPress={openPlusAlert}>
            <Image
              source={plusPng}
              style={{width: BASE_HEIGHT * 0.44, height: BASE_HEIGHT * 0.44}}
            />
          </InputFooterButton>
          <View
            style={{
              backgroundColor: grey3,
              borderRadius: INPUT_LINE_HEIGHT + INPUT_PADDING_VERTICAL,
              flex: 1,
              paddingTop:
                platform === 'ios' ? INPUT_PADDING_VERTICAL : undefined,
              paddingBottom:
                platform === 'ios' ? INPUT_PADDING_VERTICAL : undefined,
              // paddingTop: INPUT_PADDING_VERTICAL,
              // paddingBottom: INPUT_PADDING_VERTICAL,
              paddingLeft: INPUT_PADDING_SIDE,
              paddingRight: INPUT_PADDING_SIDE,
              marginTop: INPUT_MARGIN_VERTICAL,
              marginBottom: INPUT_MARGIN_VERTICAL,
              overflow: 'hidden',
              maxHeight: MAX_BASE_HEIGHT - INPUT_PADDING_VERTICAL * 2,
            }}>
            <TextInput
              ref={inputRef}
              style={{
                fontSize: INPUT_LINE_HEIGHT,
                fontFamily: 'SFProTextRegular',
                color: black,
                paddingTop: platform === 'ios' ? 0 : undefined,
              }}
              selectionColor={coral}
              value={message}
              onChangeText={setMessage}
              returnKeyType="default"
              onFocus={() => setSelectedInput(INPUT_FOOTER_NAME)}
              placeholder={`Send a chat...`}
              placeholderTextColor={opacity(white, 0.8)}
              multiline
            />
          </View>
          <InputFooterButton
            size={BASE_HEIGHT}
            onPress={handleSendMessage}
            paddingLeft={PADDING}
            paddingRight={SIDE_PADDING}>
            <Image source={sendPng} style={{height: BASE_HEIGHT * 0.44}} />
          </InputFooterButton>
        </View>
      </Pressable>
    </View>
  );
}
