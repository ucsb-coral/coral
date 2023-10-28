import {View} from 'react-native';
import LoadingSpinner from '../../assets/lotties/loadingSpinner/LoadingSpinner';

export type LoadingScreenProps = EmptyProps;

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LoadingSpinner size={100} />
    </View>
  );
}
