import {Text, View} from 'react-native';
import {red} from '../../../../../../../utilities/colors';
import {styles} from '../../../../ChatScreenStyles';
import { useSelector } from 'react-redux';
export type Props = Message & {
  myUserId: string;
};

export default function MessageBubble({myUserId, fromUserName, fromUserId, content}: Props) {
  const userName = useSelector((state: ReduxState) => state.data.usermap[myUserId!]);
  
  return (
    <View style={[styles.messageBlock]}>
      <Text
        style={
          fromUserId === myUserId ? styles.mySenderId : styles.otherSenderId
        }>
        {fromUserName}
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
