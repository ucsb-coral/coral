import React, {
  Dispatch,
  useRef,
  Key,
  SetStateAction,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList,
  RecursiveArray,
  ViewStyle,
  RefreshControl,
  Alert,
  Linking,
} from 'react-native';
import {
  AppStackPageProps,
  appStackNavigate,
} from '../../../navigation/navigators/StackNavigator';
import {useSelector} from 'react-redux';
import {
  black,
  coral,
  grey,
  opacity,
  white,
  ButtonBackground,
} from '../../../utilities/colors';
// import { joinCourseChat } from '../../../firebaseReduxUtilities/useChatData';
// import { addCourses, joinCourse, leaveCourse, loadCoursesData } from '../../../firebaseReduxUtilities/useCourseData';
import {FontAwesome} from '@expo/vector-icons';
import {scale, standardMargin} from '../../../utilities/scale';
import Header from '../../../components/header/Header';
import {CompositeScreenProps} from '@react-navigation/native';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
import {
  Calendar,
  EventRenderer,
  ICalendarEventBase,
  formatStartEnd,
} from 'react-native-big-calendar';
import dayjs from 'dayjs';
import {styles} from './ScheduleScreenStyles';
import Button from '../../../components/button/Button';
import {joinCourseChat} from '../../../firebaseReduxUtilities/useChatData';
import {getCurrentCourses} from '../../../firebaseReduxUtilities/useCourseData';
import CourseCard from './components/CourseCard';
import useCalendarData, {
  syncCalendarEvents,
} from '../../../firebaseReduxUtilities/useCalendarData';
import LoadingOverlay from '../../../components/LoadingOverlay';

export type ScheduleScreenProps = EmptyProps;

// workaround for navigating from tab page to app stack page - not sure if this actually works
type SchedulePageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'schedule'>
>;

export default function ScheduleScreen({route, navigation}: SchedulePageProps) {
  const coursemap = useSelector((state: ReduxState) => state.data.coursemap);
  const courses = Object.keys(coursemap);
  const chats = useSelector(
    (state: ReduxState) => state.data.usermap[state.data.myUserId]?.chats,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const refreshTimeout = useRef<NodeJS.Timeout | null>(null);
  const loadingTimeout = useRef<NodeJS.Timeout | null>(null);
  const {isSynced} = useCalendarData();

  const openCourseModal = (id: string) => {
    setModalData(id);
    setModalVisible(true);
  };

  function convertTime(time: string | undefined) {
    if (!time) {
      return '';
    }
    // Split the input time into hours and minutes
    const [hours, minutes] = time.split(':');

    // Convert hours to a number
    let hoursNum = parseInt(hours, 10);

    // Determine AM or PM
    const period = hoursNum >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hoursNum = hoursNum % 12 || 12;

    // Pad single-digit minutes with a leading zero
    const minutesWithZero = minutes.padStart(2, '0');

    // Form the 12-hour time string
    const time12 = `${hoursNum}:${minutesWithZero} ${period} `;

    return time12;
  }

  type CourseInfoModalProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    modalData: string;
  };

  const openChat = (id: string) => appStackNavigate(navigation, 'chat', {id});

  const renderItem = ({
    item: courseId,
    index,
  }: {
    item: string;
    index: number;
  }) => {
    const course: Course = coursemap[courseId];
    return (
      <CourseCard
        course={course}
        joined={!!chats?.includes(courseId)}
        openChat={openChat}
      />
    );
  };

  function CourseInfoModal({
    isOpen,
    setIsOpen,
    modalData,
  }: CourseInfoModalProps) {
    function generateCourseModal(courseId: string) {
      const course = coursemap[courseId];
      const title = `${course?.courseId.replaceAll(/\s+/g, ' ').trim()}`;
      const timeLocation_LEC = course?.timeLocations?.find(
        timeloc => timeloc?.instructionTypeCode === 'LEC',
      );
      const instructors_LEC = timeLocation_LEC?.instructors;
      const timeLocation_SEC = course?.timeLocations?.find(
        timeloc =>
          timeloc?.instructionTypeCode === 'DIS' ||
          timeloc?.instructionTypeCode === 'LAB',
      );
      const instructors_SEC = timeLocation_SEC?.instructors;

      return (
        <View>
          <Text style={styles.eachCourseInfoTitle}>{title}</Text>
          {timeLocation_LEC ? (
            <View>
              <Text style={styles.courseText}>
                Lecture: {'\n'}
                {timeLocation_LEC?.days.replaceAll(/\s+/g, ' ').trim()} -{' '}
                {convertTime(timeLocation_LEC?.beginTime)} to{' '}
                {convertTime(timeLocation_LEC?.endTime)}
              </Text>
              <Text style={styles.courseText}>
                {timeLocation_LEC?.buildingRoom}
              </Text>
              <Text style={styles.courseText}>
                {instructors_LEC
                  ?.map(instructor => instructor?.name)
                  .join(', ')}
              </Text>
            </View>
          ) : null}

          {timeLocation_SEC ? (
            <View>
              <Text style={styles.courseText}>
                {timeLocation_SEC?.instructionTypeCode === 'DIS'
                  ? 'Section: '
                  : 'Lab: '}
                {'\n'}
                {timeLocation_SEC?.days.replaceAll(/\s+/g, ' ').trim()} -{' '}
                {convertTime(timeLocation_SEC?.beginTime)} to{' '}
                {convertTime(timeLocation_SEC?.endTime)}
              </Text>
              <Text style={styles.courseText}>
                {timeLocation_SEC?.buildingRoom}
              </Text>
              <Text style={styles.courseText}>
                {instructors_SEC
                  ?.map(instructor => instructor?.name)
                  .join(', ')}
              </Text>
            </View>
          ) : null}
        </View>
      );
    }
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}>
        <View style={styles.eachCourseInfoPosition}>
          <View style={styles.eachCourseInfoWindow}>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <FontAwesome
                name="close"
                size={scale(24)}
                color={coral}
                style={{alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
            {generateCourseModal(modalData)}
          </View>
        </View>
      </Modal>
    );
  }

  const onRefresh = useCallback(() => {
    console.log('refreshing');
    setRefreshing(true);
    refreshTimeout.current = setTimeout(() => {
      Alert.alert('Error', 'Failed to refresh courses');
      setRefreshing(false);
    }, 5000);
    getCurrentCourses({}).then(res => {
      if (res) {
        if (refreshTimeout.current) clearTimeout(refreshTimeout.current);
        setRefreshing(false);
      }
    });
  }, []);

  const syncCalendar = async () => {
    setLoading(true);
    loadingTimeout.current = setTimeout(() => {
      Alert.alert('Error', 'Failed to sync courses');
      setLoading(false);
    }, 60000);
    syncCalendarEvents().then(() => {
      if (loadingTimeout.current) clearTimeout(loadingTimeout.current);
      setLoading(false);
    });
  };

  const syncCalendarWithAlert = () =>
    Alert.alert(
      'Sync Google Calendar',
      'Would you like to add your courses to your google calendar? This may take up to a minute.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Download',
          onPress: syncCalendar,
        },
      ],
      {cancelable: true},
    );

  return (
    <LoadingOverlay isLoading={loading}>
      <View style={{flex: 1, backgroundColor: white}}>
        <Header centerElement={'Your Courses'} />
        <View style={{flex: 1, width: '100%', backgroundColor: white}}>
          <Button
            label={isSynced ? 'Open Calendar' : 'Sync Google Calendar'}
            onPress={
              isSynced
                ? () =>
                    Linking.openURL(
                      'https://calendar.google.com/calendar?authuser=your@email.com',
                    )
                : syncCalendar
            }
            style={{marginLeft: 16, marginRight: 16, marginBottom: 16}}
          />
          {/* Conditional Rendering of FlatList or Calendar */}
          {courses.length === 0 ? (
            <Text style={styles.notEnrolledText}>
              You are not enrolled in any courses
            </Text>
          ) : (
            <FlatList
              contentContainerStyle={styles.courseFlatListStyle}
              data={courses}
              renderItem={renderItem}
              bounces={true}
              refreshControl={
                <RefreshControl
                  enabled
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
              // refreshing={refreshing}
              // onRefresh={onRefresh}
            />
          )}
        </View>
        <CourseInfoModal
          isOpen={modalVisible}
          setIsOpen={setModalVisible}
          modalData={modalData}
        />
      </View>
    </LoadingOverlay>
  );
}
