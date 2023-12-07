import React, { Dispatch, Key, SetStateAction, useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, Button, TouchableOpacity, FlatList } from 'react-native';
import { AppStackPageProps, appStackNavigate } from '../../../navigation/navigators/StackNavigator';
import { useSelector } from 'react-redux';
import { black, coral, grey, opacity, white, ButtonBackground, } from '../../../utilities/colors';
// import { joinCourseChat } from '../../../firebaseReduxUtilities/useChatData';
import { addCourses, joinCourse, leaveCourse, loadCoursesData } from '../../../firebaseReduxUtilities/useCourseData';
import { FontAwesome } from '@expo/vector-icons';
import { scale, standardMargin } from '../../../utilities/scale';
import Header from '../../../components/header/Header';
import { CompositeScreenProps } from '@react-navigation/native';
import { TabPageProps } from '../../../navigation/navigators/TabNavigator';
import { courses } from '../../../redux/dummyData';
import { Calendar } from 'react-native-big-calendar'
import { styles } from './ScheduleScreenStyles';
export type ScheduleScreenProps = EmptyProps;

// workaround for navigating from tab page to app stack page - not sure if this actually works
type SchedulePageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'schedule'>
>;

export default function ScheduleScreen({ route, navigation }: SchedulePageProps) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const tempCourses = useSelector((state: ReduxState) => state.data.usermap[myUserId!].courses);
  const userCourses: string[] = tempCourses ? tempCourses : [];
  // console.log('userCourses', userCourses);
  // addCourses(courses) // uncomment this and refresh to reset/load dummy data into firebase
  // leaveCourse(userCourses[0])
  // load user.courses list into coursemap
  useEffect(() => {
    loadCoursesData(userCourses);
  }, [userCourses]);

  const userCoursemap = useSelector((state: ReduxState) => state.data.coursemap);
  // console.log('userCoursemap', userCoursemap['crsfirebase_uid_1']);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<string>("");
  const [showCourses, setShowCourses] = useState(true);

  function splitTime(time: string) {
    const parts = time.split(':');
    return [parseInt(parts[0]), parseInt(parts[1])];
  };
  function weekDayToNum(daysString:string) {
    const daysMap = {
      'S': 0,  // Sunday
      'M': 1,  // Monday
      'T': 2,  // Tuesday
      'W': 3,  // Wednesday
      'R': 4,  // Thursday
      'F': 5,  // Friday
      'U': 6   // Saturday
    };
  
    const dayNumbers = daysString.split('').map(day => daysMap[day]);
  
    return dayNumbers;
  }

  // const hr = splitTime('10:19')[0];
  // const min = splitTime('10:19')[1];
  // console.log("testing", hr);
  // console.log("testing", min);

  console.log('userCourses', userCourses);

  // function extractCourseInfo(userCourses: string[]) {
  //   return userCoursemap[userCourses[0]]?.courseId;
  // }
  // console.log('testing extractCourseInfo', extractCourseInfo(userCourses));

  function extractCourseInfo1(userCourses: string[], userCoursemap: string[]) {
    return userCourses.map(courseId => {
      const course = userCoursemap[courseId];
      if (!course || !course.timeLocations || course.timeLocations.length === 0) {
        return null; // here to filter out null values
      }

      const { beginTime, buildingRoom, days, endTime, instructors } = course.timeLocations[0];
      return {
        courseId: course.courseId,
        courseTitle: course.courseTitle,
        beginTime,
        buildingRoom,
        days,
        endTime,
        // instructors
      };
    }).filter(courseInfo => courseInfo !== null); // here to filter out null values
  }

  const extractCoursesInfo = extractCourseInfo1(userCourses, userCoursemap);
  console.log('extractCoursesInfo: \n', extractCoursesInfo);

  // console.log('testing', extractCoursesInfo[0]?.beginTime);

  function generateTestingEvents2(extractCoursesInfo: any) {

  }
  // const testingEvents2 = generateTestingEvents2(extractCoursesInfo);

console.log('extractCoursesInfo: \n', extractCoursesInfo[0]);
  function generateEventFromCourse(extractCoursesInfo: any) {

    if (!extractCoursesInfo) {
      return []; // Return an empty array if no courses are available
    }
    
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

    const CourseBeginHours = splitTime(beginTime);
    console.log('CourseBeginHours', CourseBeginHours);
    const CourseEndHours = splitTime(endTime);
    console.log('CourseEndHours', CourseEndHours);
    const CourseWeekDay = weekDayToNum(days);
    console.log('CourseWeekDay', CourseWeekDay);

    const testingEvents = [
      {
        title: courseTitle,
        start: new Date(2023, 11, 7, CourseBeginHours[0], CourseBeginHours[1]),
        end: new Date(2023, 11, 7, CourseEndHours[0], CourseEndHours[1]),
      },
      {
        title: courseTitle,
        start: new Date(2023, 11, 8, CourseBeginHours[0], CourseBeginHours[1]),
        end: new Date(2023, 11, 8, CourseEndHours[0], CourseEndHours[1]),
      },
    ];
    return testingEvents;

  }
  const testingEvents = generateEventFromCourse(extractCoursesInfo[0]);



  // const testingEvents = [
  //   {
  //     title: 'Meeting1',
  //     start: new Date(2023, 11, 7, 15, 45),
  //     end: new Date(2023, 11, 7, 17, 30),
  //   },
  //   {
  //     title: 'Meeting2',
  //     start: new Date(2023, 11, 8, 15, 45),
  //     end: new Date(2023, 11, 8, 16, 30),
  //   },
  // ];

  // end of calendar dummy data for testing
  const openCourseModal = (id: string) => {
    setModalData(id);
    setModalVisible(true);
  };

  const convertTime = (time: string | undefined) => {
    if (!time) return '';
    let hours_24 = parseInt(time.slice(0, 2));
    let suffix = hours_24 <= 12 ? 'AM' : 'PM';
    let hours_12 = (((hours_24 + 11) % 12) + 1).toString();
    return `${hours_12 + time.slice(2)} ${suffix}`;
  };

  type CourseInfoModalProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    modalData: string;
  };

  function renderItem({ item: courseId, index }: { item: string; index: number; }) {
    const course: Course = userCoursemap[courseId];
    const title = `${course?.courseId?.replaceAll(/\s+/g, ' ').trim()} - ${course?.courseTitle}`;
    const timeLocation = course?.timeLocations?.find((timeloc) => timeloc?.instructionTypeCode === 'LEC');
    const instructors = timeLocation?.instructors[0];
    return (
      <Pressable
        key={index}
        style={styles.courseBlock}
        onPress={() => openCourseModal(courseId)}>
        <Text
          style={styles.eachCourseTitle}>
          {title}
        </Text>
        <Text style={styles.courseText}>
          {timeLocation?.days.replaceAll(/\s+/g, ' ').trim()}
          - {convertTime(timeLocation?.beginTime)}
          to {convertTime(timeLocation?.endTime)}
        </Text>
        <Text style={styles.courseText}>{timeLocation?.buildingRoom}</Text>
        <Text style={styles.courseText}>{instructors?.name}</Text>
      </Pressable>
    );
  }

  function CourseInfoModal({ isOpen, setIsOpen, modalData }: CourseInfoModalProps) {
    function generateCourseModal(courseId: string) {
      const course = userCoursemap[courseId];
      const title = `${course?.courseId.replaceAll(/\s+/g, ' ').trim()}`;
      const timeLocation = course?.timeLocations?.find((timeloc) => timeloc?.instructionTypeCode === 'LEC');
      const instructors = timeLocation?.instructors[0];
      return (
        <View>
          <Text style={styles.eachCourseInfoTitle}>
            {title}
          </Text>
          <Text style={styles.courseText}>
            {timeLocation?.days.replaceAll(/\s+/g, ' ').trim()} -{' '}
            {convertTime(timeLocation?.beginTime)} to{' '}
            {convertTime(timeLocation?.endTime)}
          </Text>
          <Text style={styles.courseText}>
            {timeLocation?.buildingRoom}
          </Text>
          <Text style={styles.courseText}>{instructors?.name}</Text>
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
        <View
          style={styles.eachCourseInfoPosition}>
          <View
            style={styles.eachCourseInfoWindow}>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <FontAwesome
                name="close"
                size={scale(24)}
                color={coral}
                style={{ alignSelf: 'flex-end' }}
              />
            </TouchableOpacity>
            {generateCourseModal(modalData)}
          </View>
        </View>
      </Modal>
    );
  }

  // below is the the general return statement block
  return (
    <View
      style={{ flex: 1, backgroundColor: white }}>
      <Header centerElement={'Your Courses'} />
      <View style={{ flex: 1, width: '100%', backgroundColor: white }}>

        {/* Toggle Button */}
        <Pressable
          style={styles.toggleAndManageButton}
          onPress={() => setShowCourses(!showCourses)}>
          <Text style={styles.toggleAndManageButtonText}>
            {showCourses ? "Show Calendar" : "Show Courses"}
          </Text>
        </Pressable>

        {/* Conditional Rendering of FlatList or Calendar */}
        {
          showCourses ? (
              userCourses.length == 0 ? (
                <Text style={styles.notEnrolledText}>
                  You are not enrolled in any courses
                </Text>
              ) : (
                <FlatList
                  style={{}}
                  contentContainerStyle={styles.courseFlatListStyle}
                  data={userCourses}
                  renderItem={renderItem}
                  bounces={false}
                />
              )
          ) : (
            <Calendar
              // mode='3days'
              events={testingEvents}
              ampm={true}
              height={600}
              hourRowHeight={35}
              overlapOffset={0}
              eventCellStyle={{ backgroundColor: coral }}
              weekStartsOn={0}
              scrollOffsetMinutes={300}
            />
          )
        }

      </View>
      <CourseInfoModal
        isOpen={modalVisible}
        setIsOpen={setModalVisible}
        modalData={modalData}
      />
      <Pressable style={styles.toggleAndManageButton}
        onPress={() => appStackNavigate(navigation, 'joinCourses', { id: 'joinCourses' })}
      >
        <Text style={styles.toggleAndManageButtonText}>
          Manage Courses
        </Text>
      </Pressable>
    </View>
  );
}

