import {ImpactFeedbackStyle} from 'expo-haptics';
import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {HapticFeedback, haptic} from '../../utilities/haptics';
import {coral, grey, grey5, white} from '../../utilities/colors';
import {avenirBlack, avenirBlackCentered} from '../../utilities/textfont';
import {scale, standardMargin, width} from '../../utilities/scale';
import {AntDesign, Ionicons} from '@expo/vector-icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const headerHeight = scale(52);
const activeOpacity = 0.5;
const fontSize = scale(22);

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
    leftElement ||
    (leftHandler ? (
      <AntDesign name="arrowleft" size={scale(35)} color={grey} />
    ) : undefined);

  const rightElementResolved =
    rightElement ||
    (rightHandler ? (
      <Ionicons name="menu" size={scale(35)} color={grey} />
    ) : undefined);

  const {top} = useSafeAreaInsets();

  return (
    <View
      pointerEvents={'box-none'}
      style={{
        ...{
          paddingTop: top,
          backgroundColor: white,
          paddingBottom: scale(5),
          marginBottom: scale(5),
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderBottomColor: grey5,
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
          activeOpacity={activeOpacity}
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
              fontFamily: avenirBlackCentered,
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
          activeOpacity={activeOpacity}
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
          {rightElementResolved}
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
