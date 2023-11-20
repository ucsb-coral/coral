import React, {Key, useState, useEffect} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Modal,
  Linking,
  Button,
} from 'react-native';
import {
  appStackNavigate,
} from '../../../navigation/navigators/StackNavigator';
import {useSelector} from 'react-redux';
import {coral, grey} from '../../../utilities/colors';
import {Icon} from 'react-native-elements';
import {coursemap, courses} from '../../../redux/dummyData';
import {joinCourseChat} from '../../../firebaseReduxUtilities/useChatData';
import { loadCoursesData } from '../../../firebaseReduxUtilities/useCourseData';

export type SchedulePageProps = EmptyProps;

export default function SchedulePage({route, navigation}: SchedulePageProps) {
  const dummyCoursemap = coursemap;
  const dummyCourses = courses;

  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const chats = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!].chats,
  );
  const userCourses = useSelector((state: ReduxState) => state.data.usermap[myUserId!].courses);

  // load user courses into coursemap
  useEffect(() => {
    loadCoursesData(userCourses)
  }, [userCourses])

  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<string>(courses[0]);

  const openCourseModal = (id: string) => {
    setModalData(id);
    setModalVisible(true);
  };

  const convertTime = (time: string) => {
    let hours_24 = parseInt(time.slice(0, 2));
    let suffix = hours_24 <= 12 ? 'AM' : 'PM';
    let hours_12 = (((hours_24 + 11) % 12) + 1).toString();
    return `${hours_12 + time.slice(2)} ${suffix}`;
  };

  function generateCourseCards(courseId: string, index: number) {
    const course: Course = coursemap[courseId];
    const title = `${courseId.replaceAll(/\s+/g, ' ').trim()} - ${
      course.courseTitle
    }`;
    // const timeLocation = course.classSections['0100'].timeLocations[0];
    // const instructors = course.classSections['0100'].instructors[0];
    return (
      <Pressable
        key={index}
        style={styles.courseCard}
        onPress={() => openCourseModal(courseId)}>
        <Text style={styles.courseTitle}>{title}</Text>
        {/* <Text style={styles.courseText}>{timeLocation.days.replaceAll(/\s+/g, ' ').trim()} - {convertTime(timeLocation.beginTime)} to {convertTime(timeLocation.endTime)}</Text>
        <Text style={styles.courseText}>{timeLocation.building} {timeLocation.room}</Text>
        <Text style={styles.courseText}>{instructors.instructor}</Text> */}
      </Pressable>
    );
  }
  function generateCourseModal(courseId: string) {
    const course = coursemap[courseId];
    const title = `${courseId.replaceAll(/\s+/g, ' ').trim()}`;
    // const timeLocation = course.classSections['0100'].timeLocations[0];
    // const instructors = course.classSections['0100'].instructors[0];
    return (
      <View>
        <Text style={styles.courseTitle}>{course.courseTitle}</Text>
        <Text style={styles.courseText}>
          {/* {timeLocation.days.replaceAll(/\s+/g, ' ').trim()} -{' '}
          {convertTime(timeLocation.beginTime)} to{' '}
          {convertTime(timeLocation.endTime)} */}
        </Text>
        <Text style={styles.courseText}>
          {/* {timeLocation.building}, {timeLocation.room} */}
        </Text>
        {/* <Text style={styles.courseText}>{instructors.instructor}</Text> */}
        {/* <Text style={styles.courseText}>{course.}</Text> */}
        <Text style={styles.courseText}>
          {/* Grading: {course.classSections['0100'].gradingOptionCode} */}
        </Text>
        <Text style={styles.courseText}>
          {/* Units: {course.courseInfo.unitsFixed} */}
        </Text>
        <Button
          title={chats?.includes(courseId) ? 'Open Chat' : 'Join Chat'}
          onPress={
            chats?.includes(courseId)
              ? () => {
                  setModalVisible(false);
                  appStackNavigate(navigation, 'chat', {id: courseId});
                }
              : () => {
                  joinCourseChat(courseId);
                  setModalVisible(false);
                  appStackNavigate(navigation, 'chat', {id: courseId});
                }
          }
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Courses</Text>
      <ScrollView
        style={styles.courseList}
        contentContainerStyle={styles.courseListContainer}>
        {courses.map(generateCourseCards)}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Pressable onPress={() => setModalVisible(false)} style={{}}>
              <Icon
                name="close"
                type="font-awesome"
                color={coral}
                style={{alignSelf: 'flex-end'}}
              />
            </Pressable>
            <View>{generateCourseModal(modalData)}</View>
          </View>
        </View>
      </Modal>

      <Pressable
        style={styles.manageButton}
        onPress={() =>
          Linking.openURL('https://my.sa.ucsb.edu/gold/Home.aspx')
        }>
        <Text style={styles.manageButtonText}>Manage Courses</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
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
    fontSize: 16,
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
