import * as Haptics from 'expo-haptics';

export enum HapticFeedback {
  IMPACT,
  RESULT,
  SELECTION,
}

type HapticFeedbackStyleArgument = {
  [HapticFeedback.IMPACT]: [weight: Haptics.ImpactFeedbackStyle];
  [HapticFeedback.RESULT]: [result: Haptics.NotificationFeedbackType];
  [HapticFeedback.SELECTION]: [];
};

type HapticArgument = {
  [K in HapticFeedback]: [type: K, ...rest: HapticFeedbackStyleArgument[K]];
}[HapticFeedback];

const haptic: (...args: HapticArgument) => void = (
  type: HapticFeedback,
  arg2?,
) => {
  switch (type) {
    case HapticFeedback.IMPACT:
      Haptics.impactAsync(arg2);
      return;
    case HapticFeedback.RESULT:
      Haptics.notificationAsync(arg2);
      return;
    case HapticFeedback.SELECTION:
      Haptics.selectionAsync();
  }
};

export {haptic};
