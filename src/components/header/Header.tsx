import {ImpactFeedbackStyle} from 'expo-haptics';
import {Image, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {HapticFeedback, haptic} from '../../utilities/haptics';
import {coral, white} from '../../utilities/colors';
import {avenirBlack} from '../../utilities/textfont';
import arrowPng from '../../assets/pngs/arrow';
import {scale, standardMargin, width} from '../../utilities/scale';

const headerHeight = scale(46);
const arrowHeight = scale(26);
const fontSize = scale(20);
const textHeight = fontSize * 0.88;

export type Props = {
  leftHandler?: () => void;
  rightHandler?: () => void;
  leftElement?: JSX.Element;
  rightElement?: JSX.Element;
  centerElement?: string | JSX.Element;
  positionStyle?: ViewStyle;
};

export default function Header({
  leftHandler,
  rightHandler,
  leftElement,
  rightElement,
  centerElement,
  positionStyle,
}: Props) {
  const leftElementResolved =
    leftElement || leftHandler ? (
      <Image
        source={arrowPng}
        style={{
          height: arrowHeight,
          width: arrowHeight,
          resizeMode: 'contain',
          transform: [{rotate: '180deg'}],
        }}
      />
    ) : undefined;

  return (
    <View
      pointerEvents={'box-none'}
      style={{
        ...{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          backgroundColor: white,
        },
        ...positionStyle,
      }}>
      {leftHandler ? (
        <TouchableOpacity
          hitSlop={standardMargin}
          onPress={() => {
            haptic(HapticFeedback.IMPACT, ImpactFeedbackStyle.Medium);
            leftHandler ? leftHandler() : null;
          }}
          style={{
            height: '100%',
            width: scale(80),
            left: 0,
            paddingLeft: scale(14),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          {leftElementResolved}
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          flex: 1,
          height: headerHeight,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: rightHandler ? 0 : scale(80),
          marginLeft: leftHandler ? 0 : scale(80),
        }}>
        {typeof centerElement === 'string' ? (
          <Text
            style={{
              color: coral,
              fontSize,
              height: textHeight,
              fontFamily: avenirBlack,
              maxWidth: width * 0.7,
            }}
            ellipsizeMode="tail"
            numberOfLines={1}>
            {centerElement.toUpperCase()}
          </Text>
        ) : (
          <View
            pointerEvents="box-none"
            style={{width: '100%', height: '100%'}}>
            {centerElement}
          </View>
        )}
      </View>
      {rightHandler ? (
        <TouchableOpacity
          hitSlop={standardMargin}
          onPress={() => {
            haptic(HapticFeedback.IMPACT, ImpactFeedbackStyle.Medium);
            rightHandler ? rightHandler() : null;
          }}
          style={{
            height: '100%',
            width: scale(70),
            right: 0,
            paddingRight: scale(14),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}>
          {rightElement}
        </TouchableOpacity>
      ) : null}
    </View>
  );
}