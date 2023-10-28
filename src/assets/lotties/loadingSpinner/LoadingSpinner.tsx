import AnimatedLottieView from 'lottie-react-native';

export type Props = {
  size: number;
};

export default function LoadingSpinner({size}: Props) {
  return (
    <AnimatedLottieView
      style={{height: size, opacity: 0.9}}
      source={require('./loadingSpinner.json')}
      loop
    />
  );
}
