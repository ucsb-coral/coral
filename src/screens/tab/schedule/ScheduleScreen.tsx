import React, {
  Dispatch,
  useRef,
  Key,
  SetStateAction,
  useState,
  useEffect,
  useMemo,
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
//import {addTestEventToCalendar} from '../../../tests/GoogleCalendar/Backend/Integration/ManualTestDemoEventPut';

// import { current } from '@reduxjs/toolkit';

// import { avenirBlackCentered } from '../../../utilities/textfont';
// import { buttonFont, NameFont, EmailFont } from '../../../utilities/textfont';

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
  const [showCourses, setShowCourses] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const refreshTimeout = useRef<NodeJS.Timeout | null>(null);
  var today = new Date();
  var current_day = new Date().getDay();
  console.log('current_day', courses, coursemap);
  function splitTime(time: string) {
    if (!time) return [];
    const parts = time.split(':');
    return [parseInt(parts[0]), parseInt(parts[1])];
  }
  function weekDayToNum(daysString: string) {
    const daysMap: {[key: string]: number} = {
      S: 0, // Sunday
      M: 1, // Monday
      T: 2, // Tuesday
      W: 3, // Wednesday
      R: 4, // Thursday
      F: 5, // Friday
      U: 6, // Saturday
    };

    const dayNumbers = daysString
      .replaceAll(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map(day => daysMap[day]);

    return dayNumbers;
  }

  function extractCourseInfo1() {
    return courses
      .map((courseId: string) => {
        const course = coursemap[courseId];
        if (
          !course ||
          !course.timeLocations ||
          course.timeLocations.length === 0
        ) {
          return null; // here to filter out null values
        }

        const {beginTime, days, endTime} = course.timeLocations[0];
        const section_day = course.timeLocations[1]?.days;
        const section_beginTime = course.timeLocations[1]?.beginTime;
        const section_endTime = course.timeLocations[1]?.endTime;

        return {
          uid: courseId,
          courseId: course.courseId,
          courseTitle: course.courseTitle,
          beginTime,
          days,
          endTime,
          section_day,
          section_beginTime,
          section_endTime,
        };
      })
      .filter(courseInfo => courseInfo !== null); // here to filter out null values
  }

  const extractCoursesInfo = extractCourseInfo1();
  // console.log('extractCoursesInfo: \n', extractCoursesInfo);

  // console.log('testing', extractCoursesInfo[0]?.beginTime);

  function generateTestingEvents2(extractCoursesInfo: any) {}
  // const testingEvents2 = generateTestingEvents2(extractCoursesInfo);

  interface MyCustomEventType extends ICalendarEventBase {
    color?: string;
  }

  const customEventRenderer: EventRenderer<MyCustomEventType> = (
    event,
    touchableOpacityProps,
  ) => {
    console.log('event', event);
    return (
      <TouchableOpacity
        {...touchableOpacityProps}
        style={[
          ...(touchableOpacityProps.style as RecursiveArray<ViewStyle>),
          {
            backgroundColor: event.color,
            borderWidth: 1,
            borderColor: event.color,
            borderLeftColor: event.color,
            borderLeftWidth: 3,
            borderStyle: 'solid',
            borderRadius: 6,
            //alignItems: 'center',
            //justifyContent: 'center'
          },
        ]}>
        {dayjs(event.end).diff(event.start, 'minute') < 32 ? (
          <Text style={[{color: 'black', fontSize: 10}]}>
            {event.title},
            <Text style={[{color: 'black'}]}>
              {dayjs(event.start).format('HH:mm')}
            </Text>
          </Text>
        ) : (
          <>
            <Text style={[{color: 'black', fontSize: 10}]}>{event.title}</Text>
          </>
        )}
      </TouchableOpacity>
    );
  };

  let i: number = 0;

  console.log('extractCoursesInfo: \n', extractCoursesInfo[0]);
  function generateEventFromCourse(extractCoursesInfo: any) {
    console.log('generating events');

    if (!extractCoursesInfo) {
      return []; // Return an empty array if no courses are available
    }

    const colors = [
      '#F4CCCC',
      '#FCE5CD',
      '#FFF2CC',
      '#D9EAD3',
      '#D0E0E3',
      '#CFE2F3',
      '#D9D2E9',
      '#EAD1DC',
    ];
    const eventColor = colors[i];
    // console.log('eventColor', eventColor);

    const uid = extractCoursesInfo?.uid;
    const beginTime = extractCoursesInfo?.beginTime;
    // console.log('beginTime', beginTime);
    const buildingRoom = extractCoursesInfo?.buildingRoom;
    // console.log('buildingRoom', buildingRoom);
    const courseid = extractCoursesInfo?.courseId;
    // console.log('courseid', courseid);
    const courseTitle = extractCoursesInfo?.courseTitle;
    // console.log('courseTitle', courseTitle);
    const days = extractCoursesInfo?.days;
    // console.log('days', days);
    const endTime = extractCoursesInfo?.endTime;
    // console.log('endTime', endTime);
    const section_day = extractCoursesInfo?.section_day;
    // console.log('section_day', section_day);
    const section_beginTime = extractCoursesInfo?.section_beginTime;
    // console.log('section_beginTime', section_beginTime);
    const section_endTime = extractCoursesInfo?.section_endTime;
    // console.log('section_endTime', section_endTime);

    const CourseBeginHours = splitTime(beginTime);
    // console.log('CourseBeginHours', CourseBeginHours);
    const CourseEndHours = splitTime(endTime);
    // console.log('CourseEndHours', CourseEndHours);
    const CourseWeekDay = weekDayToNum(days);
    // console.log('CourseWeekDay', CourseWeekDay);

    const testingEvents: any[] = [];
    for (let i = 0; i < CourseWeekDay.length; i++) {
      const course_day = CourseWeekDay[i];
      const interval = current_day - course_day;
      const courseDate = new Date(
        today.getTime() - interval * 24 * 60 * 60 * 1000,
      );
      const year = courseDate.getFullYear();
      const month = courseDate.getMonth();
      const date = courseDate.getDate();
      testingEvents.push({
        title: courseid + ' - ' + courseTitle,
        start: new Date(
          year,
          month,
          date,
          CourseBeginHours[0],
          CourseBeginHours[1],
        ),
        end: new Date(year, month, date, CourseEndHours[0], CourseEndHours[1]),
        color: eventColor, // Assign the event color
        uid: uid,
      });
    }
    if (section_day) {
      const section_day_num = weekDayToNum(section_day);
      const section_beginHours = splitTime(section_beginTime);
      const section_endHours = splitTime(section_endTime);
      for (let i = 0; i < section_day_num.length; i++) {
        const section_day = section_day_num[i];
        const interval = current_day - section_day;
        const sectionDate = new Date(
          today.getTime() - interval * 24 * 60 * 60 * 1000,
        );
        const year = sectionDate.getFullYear();
        const month = sectionDate.getMonth();
        const date = sectionDate.getDate();
        testingEvents.push({
          title: courseid + ' - ' + courseTitle,
          start: new Date(
            year,
            month,
            date,
            section_beginHours[0],
            section_beginHours[1],
          ),
          end: new Date(
            year,
            month,
            date,
            section_endHours[0],
            section_endHours[1],
          ),
          color: eventColor, // Assign the event color
          uid: uid,
        });
      }
    }

    i = (i + 1) % colors.length;
    console.log('testingEvents', testingEvents);
    return testingEvents;
  }

  function generateCombinedEvents() {
    const extractCoursesLength = extractCoursesInfo.length;
    const combinedEvents = [];
    for (let i = 0; i < extractCoursesLength; i++) {
      const eventsForCourse = generateEventFromCourse(extractCoursesInfo[i]);
      combinedEvents.push(...eventsForCourse); // Spread the events into the combinedEvents array
    }
    combinedEvents.sort(function (a, b) {
      return a.start - b.start;
    });
    return combinedEvents;
  }

  const combinedEvents = useMemo(() => generateCombinedEvents(), [coursemap]);

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
  function renderItem({item: courseId, index}: {item: string; index: number}) {
    const course: Course = coursemap[courseId];
    const title = `${course?.courseId?.replaceAll(/\s+/g, ' ').trim()} - ${
      course?.courseTitle
    }`;
    const timeLocation =
      course?.timeLocations?.find(
        timeloc => timeloc?.instructionTypeCode === 'LEC',
      ) ||
      course?.timeLocations?.find(
        timeloc => timeloc?.instructionTypeCode === 'LAB',
      );
    const instructors = timeLocation?.instructors[0];
    return (
      <Pressable
        key={index}
        style={styles.courseBlock}
        onPress={() => openCourseModal(courseId)}>
        <Text style={styles.eachCourseTitle}>{title}</Text>
        <Text style={styles.courseText}>
          {timeLocation?.days.replaceAll(/\s+/g, ' ').trim()} -{' '}
          {timeLocation?.beginTime
            ? `${convertTime(timeLocation?.beginTime)} to ${convertTime(
                timeLocation?.endTime,
              )}`
            : 'TBA'}
        </Text>
        <Text style={styles.courseText}>{timeLocation?.buildingRoom}</Text>
        <Text style={styles.courseText}>{instructors?.name}</Text>
        <Button
          label={chats?.includes(courseId) ? 'Open Chat' : 'Join Chat'}
          style={{alignSelf: 'flex-end', backgroundColor: opacity(coral, 0.8)}}
          onPress={() => {
            if (!chats?.includes(courseId)) joinCourseChat(courseId);
            appStackNavigate(navigation, 'chat', {id: courseId});
          }}
        />
      </Pressable>
    );
  }

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

  const onRefresh = React.useCallback(() => {
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
  return (
    <View style={{flex: 1, backgroundColor: white}}>
      <Header centerElement={'Your Courses'} />
      <View style={{flex: 1, width: '100%', backgroundColor: white}}>
        {/* Toggle Button */}
        <Button
          label={showCourses ? 'Show Calendar' : 'Show Courses'}
          style={{marginLeft: 16, marginRight: 16, marginBottom: 16}}
          onPress={() => setShowCourses(s => !s)}
        />

        {/* Conditional Rendering of FlatList or Calendar */}
        {courses.length === 0 ? (
          <Text style={styles.notEnrolledText}>
            You are not enrolled in any courses
          </Text>
        ) : showCourses ? (
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
        ) : (
          <>
            <Button
              label="Add Test Event"
              onPress={addTestEventToCalendar}
              style={{
                backgroundColor: '#4CAF50', // Example style, customize as needed
                padding: 10,
                margin: 10,
              }}
            />

            <Calendar
              // only show weekdays
              mode="custom"
              weekStartsOn={1}
              weekEndsOn={5}
              events={combinedEvents}
              ampm={false}
              height={600}
              onPressEvent={(event: any) => openCourseModal(event.uid)}
              overlapOffset={20}
              swipeEnabled={false}
              // showTime={false}
              // eventCellStyle={{ backgroundColor: coral }}
              scrollOffsetMinutes={300}
              renderEvent={customEventRenderer}
            />
          </>
        )}
      </View>
      <CourseInfoModal
        isOpen={modalVisible}
        setIsOpen={setModalVisible}
        modalData={modalData}
      />
    </View>
  );
}
