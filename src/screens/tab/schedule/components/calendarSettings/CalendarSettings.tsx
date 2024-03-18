import {Alert, Linking, Switch, Text, View} from 'react-native';
import {sfProTextSemibold} from '../../../../../utilities/textfont';
import Button from '../../../../../components/button/Button';
import {
  black,
  coral,
  grey3,
  grey4,
  grey5,
} from '../../../../../utilities/colors';
import {Dispatch, SetStateAction, useRef, useState} from 'react';
import useCalendarData, {
  deleteCalendar,
  shareToPersonalEmail,
  syncCalendarEvents,
} from '../../../../../firebaseReduxUtilities/useCalendarData';
import {IconButton} from 'react-native-paper';
import {scale} from '../../../../../utilities/scale';
import ShareModal from './ShareModal';
import {emailRegex} from '../../../../../utilities/regexes';

export type Props = {
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export default function CalendarSettings({setLoading}: Props) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [personalEmail, setPersonalEmail] = useState<string>('');
  const loadingTimeout = useRef<NodeJS.Timeout | null>(null);
  const {
    isSynced,
    withRemindersOptimistic,
    setWithRemindersOptimistic,
    toggleWithReminders,
  } = useCalendarData();

  const withLoadingAsync = async (fn: () => Promise<void>) => {
    setLoading(true);
    loadingTimeout.current = setTimeout(() => {
      Alert.alert('Error', 'Failed to update');
      setLoading(false);
    }, 60000);
    fn().then(() => {
      if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
      setLoading(false);
    });
  };

  const syncCalendarWithAlert = () =>
    Alert.alert(
      'Sync Google Calendar',
      'Would you like to add your courses to your ucsb.edu Google Calendar? This may take up to a minute.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sync',
          onPress: () => withLoadingAsync(syncCalendarEvents),
        },
      ],
      {cancelable: true},
    );

  const resyncCalendarWithAlert = () =>
    Alert.alert(
      'Resync Google Calendar',
      'Would you like to replace your ucsb.edu google calendar with an updated version? This will replace any changes you have made to these events',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sync',
          onPress: () => withLoadingAsync(syncCalendarEvents),
        },
      ],
      {cancelable: true},
    );

  const toggleRemindersWithAlert = () => {
    setWithRemindersOptimistic(wr => !wr);
    Alert.alert(
      `Turn ${withRemindersOptimistic ? 'off' : 'on'} Reminders`,
      `Would you like to ${
        withRemindersOptimistic ? 'remove reminders from' : 'add reminders to'
      } your ucsb.edu Google Calendar? This may take up to a minute.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => setWithRemindersOptimistic(wr => !wr),
        },
        {
          text: `Turn ${withRemindersOptimistic ? 'Off' : 'On'}`,
          onPress: () => withLoadingAsync(toggleWithReminders),
        },
      ],
      {cancelable: true},
    );
  };

  const handleDeleteWithAlert = () => {
    Alert.alert(
      `Delete Calendar`,
      `Would you like to remove the UCSB Courses Calendar from your ucsb.edu Google Calendar? This will remove all events from your calendar.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: `Delete`,
          style: 'destructive',
          onPress: () => withLoadingAsync(deleteCalendar),
        },
      ],
      {cancelable: true},
    );
  };

  const onPersonalEmailSubmit = () => {
    const condition = new RegExp(emailRegex, 'g');
    if (!condition.test(personalEmail)) Alert.alert('Invalid Email');
    else {
      setModalOpen(false);
      withLoadingAsync(async () => shareToPersonalEmail(personalEmail));
      setPersonalEmail('');
    }
  };

  return (
    <View
      style={{
        width: '100%',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row-reverse',
          alignItems: 'center',
          marginLeft: 16,
          marginRight: 16,
          marginBottom: 16,
        }}>
        {isSynced && (
          <>
            <IconButton
              icon="delete-outline"
              iconColor={coral}
              size={scale(24)}
              containerColor={grey4}
              style={{borderRadius: scale(6), margin: 0}}
              onPress={handleDeleteWithAlert}
            />
            <IconButton
              icon="refresh"
              iconColor={coral}
              size={scale(24)}
              containerColor={grey4}
              style={{borderRadius: scale(6)}}
              onPress={resyncCalendarWithAlert}
            />
          </>
        )}
        <View style={{flex: 1}}>
          <Button
            label={isSynced ? 'Open Calendar' : 'Sync Google Calendar'}
            onPress={
              isSynced
                ? () =>
                    Linking.openURL(
                      'https://calendar.google.com/calendar?authuser=your@email.com',
                    )
                : syncCalendarWithAlert
            }
          />
        </View>
      </View>
      {isSynced ? (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginLeft: scale(16),
            marginRight: scale(16),
            marginBottom: scale(16),
          }}>
          <View
            style={{
              flex: 1,
              marginRight: 8,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: black,
                fontFamily: sfProTextSemibold,
                fontSize: scale(20),
                marginRight: scale(6),
              }}>
              Reminders:
            </Text>
            <Switch
              trackColor={{true: coral}}
              onValueChange={toggleRemindersWithAlert}
              value={withRemindersOptimistic}
            />
          </View>
          <View style={{flex: 1, marginLeft: 8}}>
            <Button
              label={'Link Personal Email'}
              onPress={() => setModalOpen(true)}
            />
          </View>
        </View>
      ) : null}
      <ShareModal
        isOpen={modalOpen}
        setOpen={setModalOpen}
        email={personalEmail}
        setEmail={setPersonalEmail}
        onSubmit={onPersonalEmailSubmit}
      />
    </View>
  );
}
