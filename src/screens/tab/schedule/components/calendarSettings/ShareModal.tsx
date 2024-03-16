import {Dispatch, SetStateAction} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {scale} from '../../../../../utilities/scale';
import {black, coral, grey4, white} from '../../../../../utilities/colors';
import {IconButton} from 'react-native-paper';
import {
  sfProTextBold,
  sfProTextRegular,
  sfProTextSemibold,
} from '../../../../../utilities/textfont';
import Input from '../../../../../components/input/Input';

export type Props = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
};
export default function ShareModal({
  isOpen,
  setOpen,
  email,
  setEmail,
  onSubmit,
}: Props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      collapsable={true}
      onRequestClose={() => {
        () => setOpen(false);
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: white,
            borderRadius: scale(10),
            padding: scale(20),
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            maxWidth: '94%',
          }}>
          <IconButton
            icon="close"
            iconColor={black}
            size={scale(22)}
            style={{position: 'absolute', top: scale(4), right: scale(4)}}
            onPress={() => setOpen(false)}
          />
          <Text
            style={{
              fontFamily: sfProTextBold,
              fontSize: scale(20),
              color: black,
              marginBottom: scale(10),
            }}>
            Add To Personal Calendar
          </Text>
          <Text
            style={{
              fontFamily: sfProTextRegular,
              fontSize: scale(16),
              color: black,
              marginBottom: scale(16),
            }}>
            share your calendar from your ucsb.edu account to your personal
            email address
          </Text>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{flex: 1}}>
              <Input
                placeholder="myemail@gmail.com"
                value={email}
                onChangeText={setEmail}
                positionStyle={{padding: 0}}
                autoCapitalize="none"
              />
            </View>
            <IconButton
              icon="plus"
              iconColor={coral}
              size={scale(32)}
              containerColor={grey4}
              style={{borderRadius: scale(6), marginLeft: scale(8)}}
              onPress={onSubmit}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
