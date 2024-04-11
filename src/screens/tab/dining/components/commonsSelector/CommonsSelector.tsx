import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import {TextStyle} from 'react-native';
import {Dispatch, SetStateAction} from 'react';
import {
  black,
  coral,
  opacity,
  transparent,
  white,
} from '../../../../../utilities/colors';
import {
  sfProTextBold,
  sfProTextRegular,
  sfProTextSemibold,
} from '../../../../../utilities/textfont';
import {Checkbox} from 'react-native-paper';
import {scale} from '../../../../../utilities/scale';

export type Props = {
  selectedCommons: Set<string>;
  setSelectedCommons: Dispatch<SetStateAction<Set<string> | null>>;
  commons: DiningCommonsMap;
  scrollToTop: () => void;
};

export default function CommonsSelector({
  selectedCommons,
  setSelectedCommons,
  commons,
  scrollToTop,
}: Props) {
  const commonIds = Object.keys(commons);
  const all = selectedCommons.size === commonIds.length;

  const firstHalf = commonIds.slice(0, Math.ceil(commonIds.length / 2));
  const secondHalf = commonIds.slice(Math.ceil(commonIds.length / 2));

  console.log(selectedCommons);

  const handleSelect = (id: string) => {
    console.log('handleSelect', id);
    var newSelectedCommons = new Set(selectedCommons);
    if (all) newSelectedCommons = new Set();
    if (newSelectedCommons.has(id)) {
      if (newSelectedCommons.size > 1) newSelectedCommons.delete(id);
    } else {
      newSelectedCommons.add(id);
    }
    setSelectedCommons(newSelectedCommons);
  };

  const handleSelectAll = () => {
    var newSelectedCommons = new Set(commonIds);
    setSelectedCommons(newSelectedCommons);
  };

  return (
    <View
      style={{
        display: 'flex',
        marginTop: scale(10),
        width: '95%',
        alignSelf: 'center',
        left: '5%',
      }}>
      <Text
        style={{
          fontFamily: sfProTextSemibold,
          fontSize: scale(16),
          color: black,
          marginBottom: scale(14),
        }}>
        {'Dinning Commons:'}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        <View style={{marginRight: scale(30)}}>
          <CommonsItem isSelected={all} onPress={handleSelectAll} label="All" />
        </View>
        <View style={{marginRight: scale(30)}}>
          {firstHalf.map((id: string) => {
            const {name} = commons[id];
            const isSelected = selectedCommons.has(id) && !all;
            return (
              <CommonsItem
                isSelected={isSelected}
                onPress={() => handleSelect(id)}
                label={name}
              />
            );
          })}
        </View>
        <View style={{marginRight: scale(30)}}>
          {secondHalf.map((id: string) => {
            const {name} = commons[id];
            const isSelected = selectedCommons.has(id) && !all;
            return (
              <CommonsItem
                isSelected={isSelected}
                onPress={() => handleSelect(id)}
                label={name}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

type CommonsItemProps = {
  isSelected: boolean;
  onPress: () => void;
  label: string;
};

const size = scale(26);
const marginBottom = size * 0.3;

const circleSize = size;
const circleBorderWidth = size * 0.12;

const innerCircleSize = size * 0.44;

const labelSize = circleSize * 0.5;
const labelMargin = circleSize * 0.3;

function CommonsItem({isSelected, onPress, label}: CommonsItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: circleSize,
          width: circleSize,
          borderColor: coral,
          borderWidth: circleBorderWidth,
          borderRadius: circleSize / 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {isSelected && (
          <View
            style={{
              height: innerCircleSize,
              width: innerCircleSize,
              backgroundColor: coral,
              borderRadius: innerCircleSize / 2,
            }}
          />
        )}
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: sfProTextBold,
          color: black,
          fontSize: labelSize,
          marginLeft: labelMargin,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
