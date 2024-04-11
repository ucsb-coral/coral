import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {AuthStackPageProps} from '../../../navigation/navigators/StackNavigator';
import coralPinkPng from '../../../assets/pngs/coralPink.png';
import {coral, white} from '../../../utilities/colors';
import {sfProTextRegular} from '../../../utilities/textfont';
import {scale} from '../../../utilities/scale';
import storkePng from './assets/storke';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {AntDesign} from '@expo/vector-icons';
import {enterAuthFlow} from '../../../../auth/useAuth';

export type WelcomeScreenProps = EmptyProps;

export default function WelcomeScreen({
  route,
  navigation,
}: AuthStackPageProps<'welcome'>) {
  const {bottom} = useSafeAreaInsets();
  return (
    <SafeAreaView
      edges={['top']}
      style={{
        display: 'flex',
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={coralPinkPng}
          style={{
            width: '80%',
            height: scale(100),
            resizeMode: 'contain',
          }}
        />
        <Text
          style={{
            color: coral,
            fontFamily: sfProTextRegular,
            fontSize: scale(16),
          }}>
          {'connect · collaborate · create'}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          flex: 1,
        }}>
        <Image
          source={storkePng}
          style={{
            position: 'absolute',
            height: '100%',
            right: '15%',
          }}
        />
        <TouchableOpacity
          onPress={enterAuthFlow}
          activeOpacity={0.7}
          style={{
            position: 'absolute',
            bottom: bottom + scale(20),
            left: '15%',
            height: scale(54),
            width: '50%',
            backgroundColor: white,
            borderRadius: scale(30),
            borderColor: coral,
            borderWidth: scale(2),
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: scale(20),
            paddingRight: scale(16),
          }}>
          <Text
            style={{
              color: coral,
              fontFamily: sfProTextRegular,
              fontSize: scale(24),
            }}>
            {'enter'}
          </Text>
          <AntDesign name="arrowright" size={scale(28)} color={coral} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
