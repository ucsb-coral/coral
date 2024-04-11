import {View, ViewProps, ViewStyle} from 'react-native';
import LoadingSpinner from '../assets/lotties/loadingSpinner/LoadingSpinner';
import {ReactNode} from 'react';

export type LoadingScreenProps = ViewProps & {
  isLoading?: boolean;
};

export default function LoadingOverlay({
  isLoading,
  children,
  style,
  ...rest
}: LoadingScreenProps) {
  return (
    <>
      {children}
      {isLoading ? (
        <View
          style={{
            ...{
              position: 'absolute',
              height: '100%',
              width: '100%',
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
            ...(style as {}),
          }}>
          <LoadingSpinner size={170} />
        </View>
      ) : null}
    </>
  );
}
