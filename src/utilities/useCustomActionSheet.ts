import {
  ActionSheetOptions,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import {NativeModules} from 'react-native';
import {coral} from './colors';

const {RNIconActionSheet} = NativeModules;

type PressableArrowFunction = () => void | Promise<void>;

export type CustomActionSheetOptionsDataType = {
  title: string;
  onPress: PressableArrowFunction;
  isDestructive?: boolean;
  icon?: JSX.Element;
};

export type CustomActionSheetOptions = Omit<ActionSheetOptions, 'options'> & {
  options: CustomActionSheetOptionsDataType[];
};

const parseOptions = (optionsData: CustomActionSheetOptionsDataType[]) => {
  const options: string[] = [];
  const onPressMap: {[key: number]: PressableArrowFunction} = {};
  const destructiveButtonIndex: number[] = [];
  optionsData.forEach(
    (
      {title, isDestructive, onPress}: CustomActionSheetOptionsDataType,
      index: number,
    ) => {
      options.push(title);
      if (isDestructive) destructiveButtonIndex.push(index);
      onPressMap[index] = onPress;
    },
  );
  options.push('Cancel');
  return {
    options: {options},
    destructiveButtonIndex,
    callback: (buttonIndex?: number) => {
      if (buttonIndex !== undefined && buttonIndex !== options.length - 1)
        onPressMap[buttonIndex]();
    },
  };
};
export default function useCustomActionSheet() {
  const {showActionSheetWithOptions} = useActionSheet();
  const showCustomActionSheet = (
    CustomActionSheetOptions: CustomActionSheetOptions,
  ) => {
    const customOptions = CustomActionSheetOptions.options;
    const {options, destructiveButtonIndex, callback} =
      parseOptions(customOptions);
    showActionSheetWithOptions(
      {
        ...{
          userInterfaceStyle: 'light',
          tintColor: coral,
          cancelButtonIndex: customOptions.length,
          destructiveButtonIndex,
        },
        ...customOptions,
        ...options,
      },
      callback,
    );
  };
  return {showCustomActionSheet};
}
