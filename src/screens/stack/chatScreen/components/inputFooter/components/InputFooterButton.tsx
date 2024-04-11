import React, {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';

type InputFooterButtonProps = {
  size: number;
  onPress?: () => void;
  paddingLeft?: number;
  paddingRight?: number;
  disabled?: boolean;
  children: ReactNode;
};

export default function InputFooterButton({
  size,
  onPress,
  paddingLeft,
  paddingRight,
  disabled,
  children,
}: InputFooterButtonProps) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        alignSelf: 'flex-end',
        height: size,
        paddingLeft: paddingLeft ?? 0,
        paddingRight: paddingRight ?? 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {children}
    </TouchableOpacity>
  );
}
