import React, { Key, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Modal, Linking } from 'react-native';
import { TabPageProps } from '../../../navigation/navigators/TabNavigator';
import { AppStackPageProps } from '../../../navigation/navigators/StackNavigator';
import { CompositeScreenProps } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { coral, grey } from '../../../utilities/colors';
import { Course, courses } from './CourseFixtures';
import { Icon } from 'react-native-elements';

export type SchedulePageProps = EmptyProps;

// workaround for navigating from tab page to app stack page - not sure if this actually works
type ScheduleScreenProps = CompositeScreenProps<AppStackPageProps<any>, TabPageProps<any>>;

export default function SchedulePage({
  route,
  navigation,
}: ScheduleScreenProps) {

  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const user = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!],
  );

  // get user courses from usermap
  // const userCourseIds = user.courses
  // temp data
  const userCourseUids = [
    "firebase_uid_3",
    "firebase_uid_4",
    "firebase_uid_5",
  ];

  // map user course uids to course data from firebase
  // const courses = useCourseData()
  // currently, this pulls dummy data from fixtures
  const coursesData = userCourseUids.map((courseuid) => courses[courseuid]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<Course>(courses.firebase_uid_1);

  const openCourseModal = (data: Course) => {
    setModalVisible(true);
    setModalData(data);
  };

  const convertTime = (time: string) => {
    let hours_24 = parseInt(time.slice(0, 2));
    let suffix = hours_24 <= 12 ? "AM" : "PM";
    let hours_12 = ((hours_24 + 11) % 12 + 1).toString();
    return `${hours_12 + time.slice(2)} ${suffix}`;
  };

  function generateCourseCards(course: Course, index:Key) {
    const title = `${course.courseInfo.courseId.replaceAll(/\s+/g, ' ').trim()} - ${course.courseInfo.title}`;
    const timeLocation = course.classSections['0100'].timeLocations[0];
    const instructors = course.classSections['0100'].instructors[0];
    return (
      <Pressable key={index} style={styles.courseCard} onPress={() => openCourseModal(course)}>
        <Text style={styles.courseTitle}>{title}</Text>
        <Text style={styles.courseText}>{timeLocation.days.replaceAll(/\s+/g, ' ').trim()} - {convertTime(timeLocation.beginTime)} to {convertTime(timeLocation.endTime)}</Text>
        <Text style={styles.courseText}>{timeLocation.building} {timeLocation.room}</Text>
        <Text style={styles.courseText}>{instructors.instructor}</Text>
      </Pressable>
    );
  }
  function generateCourseModal(course: Course) {
    const title = `${course.courseInfo.courseId.replaceAll(/\s+/g, ' ').trim()}`;
    const timeLocation = course.classSections['0100'].timeLocations[0];
    const instructors = course.classSections['0100'].instructors[0];
    return (
      <View>
        <Text style={styles.courseTitle}>{title}</Text>
        <Text style={styles.courseTitle}>{course.courseInfo.title}</Text>
        <Text style={styles.courseText}>{timeLocation.days.replaceAll(/\s+/g, ' ').trim()} - {convertTime(timeLocation.beginTime)} to {convertTime(timeLocation.endTime)}</Text>
        <Text style={styles.courseText}>{timeLocation.building}, {timeLocation.room}</Text>
        <Text style={styles.courseText}>{instructors.instructor}</Text>
        <Text style={styles.courseText}>{course.courseInfo.description}</Text>
        <Text style={styles.courseText}>Grading: {course.classSections['0100'].gradingOptionCode}</Text>
        <Text style={styles.courseText}>Units: {course.courseInfo.unitsFixed}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Courses</Text>
      <ScrollView style={styles.courseList} contentContainerStyle={styles.courseListContainer}>
        {coursesData.map((course, index) => generateCourseCards(course, index))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable onPress={() => setModalVisible(false)} style={{}}>
              <Icon name='close' type='font-awesome' color={coral} style={{alignSelf:'flex-end'}}/>
            </Pressable>
            <View>{generateCourseModal(modalData)}</View>
          </View>
        </View>
      </Modal>

      <Pressable
        style={styles.manageButton}
        onPress={() => Linking.openURL('https://my.sa.ucsb.edu/gold/Home.aspx')}
      >
        <Text style={styles.manageButtonText}>Manage Courses</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black'
  },
  courseList: {
    flex: 1,
  },
  courseListContainer: {
    alignItems: 'center',
  },
  courseCard: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#F883791A',
    alignItems: 'center',
    margin: 8,
    padding: 8,
  },
  courseTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16
  },
  courseText: {
    color: grey,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: 300,
    padding: 16,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  manageButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F883791A',
    borderRadius: 50,
    padding: 10,
  },
  manageButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});