import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, SafeAreaView} from 'react-native';
const tabbarHeight = 54;
const iconHeight = 40;
const iconWidth = 40;

export default function Tabbar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <SafeAreaView
      style={{
        height: tabbarHeight,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
      {state.routes.map((route, index: number) => {
        const {options} = descriptors[route.key];
        const isFocused = state.index === index;
        const label: string = route.name;

        const onPress = () => navigation.navigate(route.name);
        console.log('state.routes', state.routes);

        return (
          <TouchableOpacity
            key={route.name}
            style={{
              height: iconHeight,
              width: iconWidth,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isFocused ? 'white' : 'grey',
            }}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}></TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
}
