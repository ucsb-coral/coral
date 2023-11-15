import {Text, View} from 'react-native';
import {red} from '../../../../../../../utilities/colors';
import {styles} from '../../../../ChatScreenStyles';

export type Props = Message & {
  myUserId: string;
};

export default function MessageBubble({myUserId, fromUserId, content}: Props) {
  return (
    <View style={[styles.messageBlock]}>
      <Text
        style={
          fromUserId === myUserId ? styles.mySenderId : styles.otherSenderId
        }>
        {fromUserId}
      </Text>
      <View
        style={
          fromUserId === myUserId
            ? styles.myMessageContainer
            : styles.otherMessageContainer
        }>
        <Text style={styles.message}>{content}</Text>
      </View>
    </View>
  );
}
