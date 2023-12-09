// UserSettingPage.tsx
import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import IconButton from '../../../../components/iconButton/IconButton';
import {appStackNavigate} from '../../../../navigation/navigators/StackNavigator';
import {Ionicons} from '@expo/vector-icons';
import {getStatusIcon} from '../../../../utilities/status';
import {scale} from '../../../../utilities/scale';
import {
  ButtonBackground,
  GreyUseForButton,
  cardBackground,
  coral,
} from '../../../../utilities/colors';
import Button from '../../../../components/button/Button';
import {buttonFont} from '../../../../utilities/textfont';

export type Props = {
  chatId: string;
  navigation: any;
};

export default function Participants({chatId, navigation}: Props) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const memberIds = useSelector(
    (state: ReduxState) => state.data.chatmap[chatId].memberIds,
  );
  const usermap = useSelector((state: ReduxState) => state.data.usermap);
  const myUser = usermap[myUserId];
  console.log('memberIds:', memberIds, usermap);
  return (
    <>
      <View
        style={{
          margin: scale(16),
          display: 'flex',
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: GreyUseForButton,
            textAlign: 'left',
            fontFamily: buttonFont,
            marginBottom: scale(6),
          }}>
          Participants:
        </Text>
        <View style={{borderRadius: scale(10), overflow: 'hidden'}}>
          <ParticipantCard
            id={myUserId}
            user={myUser}
            navigation={navigation}
            isMyUser
          />
          {memberIds.map((memberId: string) => {
            if (memberId === myUserId) return null;

            const user = usermap[memberId];
            return (
              <ParticipantCard
                id={memberId}
                user={user}
                navigation={navigation}
              />
            );
          })}
        </View>
      </View>
    </>
  );
}

type ParticipantCardProps = {
  isMyUser?: boolean;
  id: string;
  user: User;
  navigation: any;
};
function ParticipantCard({
  isMyUser,
  id,
  user,
  navigation,
}: ParticipantCardProps) {
  const {firstName, lastName, preferredName, status} = user;
  const displayName = preferredName ?? `${firstName} ${lastName}`;
  return (
    <IconButton
      onPress={() => appStackNavigate(navigation, 'userProfile', {id})}
      label={displayName}
      Icon={Ionicons}
      iconName={getStatusIcon(status)}
      noRound
      style={{
        backgroundColor: isMyUser ? ButtonBackground : cardBackground,
      }}
    />
  );
}
