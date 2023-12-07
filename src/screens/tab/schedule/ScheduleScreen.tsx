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
  // console.log('userCoursemap', userCoursemap);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<string>("");

  // calendar dummy data for testing
  const dummyYearStart = 2023;
  const dummyYearEnd = 2023;
  const dummyMonthStart = 12;
  const dummyDayStart = 1;
  const dummyMonthEnd = 12;
  const dummyDayEnd = 30;
  const [showCourses, setShowCourses] = useState(true);
  const splitTimeHour = (time: string) => {
    return parseInt(time.split(':')[0]);
  }
  // console.log(splitTimeHour('10:00'));
  const splitTimeMinute = (time: string) => {
    return parseInt(time.split(':')[1]);
  }
  // console.log(splitTimeMinute('10:00'));

  const events = [{
    allDay: true,
    title: 'Coffee break',
    start: new Date(2023, 5, 12, 15, 45), // June 12, 2023, at 15:45
    end: new Date(2023, 5, 12, 16, 30),
  }];

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
            {showCourses ? "Show Courses" : "Show Calendar"}
          </Text>
        </Pressable>

        {/* Conditional Rendering of FlatList or Calendar */}
        {userCourses.length == 0 ? (
          <Text style={styles.notEnrolledText}>
            You are not enrolled in any courses
          </Text>
        ) : showCourses ? (
          <FlatList
            style={{}}
            contentContainerStyle={styles.courseFlatListStyle}
            data={userCourses}
            renderItem={renderItem}
            bounces={false}
          />
        ) : (
          <Calendar
            events={events}
            height={600}
            scrollOffsetMinutes={300}
            weekStartsOn={1}
          />
        )}

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

