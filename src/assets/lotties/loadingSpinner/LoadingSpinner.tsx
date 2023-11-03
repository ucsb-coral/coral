import AnimatedLottieView from 'lottie-react-native';

export type Props = {
  size: number;
};

export default function LoadingSpinner({size}: Props) {
  return (
    <AnimatedLottieView
      style={{height: size, width: size}}
      source={require('./loadingSpinner.json')}
      autoPlay
      loop
    />
  );
}
