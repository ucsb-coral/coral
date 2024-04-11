import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {TextStyle} from 'react-native';
import {Dispatch, SetStateAction} from 'react';
import {coral, opacity, transparent, white} from '../../../../utilities/colors';
import {
  sfProTextBold,
  sfProTextRegular,
  sfProTextSemibold,
} from '../../../../utilities/textfont';

export type Props = {
  mealtime: Mealtime;
  setMealtime: Dispatch<SetStateAction<Mealtime>>;
  scrollToTop: () => void;
};

const SELECTION_PADDING = 4;

const mealtimes: Mealtime[] = ['breakfast', 'lunch', 'dinner'];

export default function MealtimeSelector({
  mealtime,
  setMealtime,
  scrollToTop,
}: Props) {
  const fullBoxStyle = {flex: 1, padding: SELECTION_PADDING};
  const selectionBoxStyle = (boxType: Mealtime): StyleProp<ViewStyle> => ({
    flex: 1,
    backgroundColor: mealtime === boxType ? coral : transparent,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  });
  const textStyle = (boxType: Mealtime): StyleProp<TextStyle> => ({
    fontFamily: mealtime === boxType ? sfProTextBold : sfProTextSemibold,
    fontSize: 17,
    color: mealtime === boxType ? white : coral,
    marginLeft: 5,
  });

  return (
    <View
      style={{
        height: 46,
        width: '90%',
        backgroundColor: white,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
      }}>
      {mealtimes.map(mt => (
        <View style={fullBoxStyle}>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={mealtime === mt}
            onPress={() => setMealtime(mt)}
            style={selectionBoxStyle(mt)}>
            <Text style={textStyle(mt)}>{mt}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}
