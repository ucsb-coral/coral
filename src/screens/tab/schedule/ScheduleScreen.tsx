import React, {Dispatch, Key, SetStateAction, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Modal,
  Linking,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {TabPageProps} from '../../../navigation/navigators/TabNavigator';
import {
  AppStackPageProps,
  appStackNavigate,
} from '../../../navigation/navigators/StackNavigator';
import {CompositeScreenProps} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {black, coral, grey, opacity} from '../../../utilities/colors';
import {coursemap, courses} from '../../../redux/dummyData';
import {joinCourseChat} from '../../../firebaseReduxUtilities/useChatData';
import {FontAwesome} from '@expo/vector-icons';
import {scale, standardMargin} from '../../../utilities/scale';
import Header from '../../../components/header/Header';

export type ScheduleScreenProps = EmptyProps;

// workaround for navigating from tab page to app stack page - not sure if this actually works
type SchedulePageProps = CompositeScreenProps<
  AppStackPageProps<'tabNavigator'>,
  TabPageProps<'schedule'>
>;

const styles = StyleSheet.create({
  courseText: {
    color: grey,
  },
});

export default function ScheduleScreen({route, navigation}: SchedulePageProps) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const chats = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!].chats,
  );

  // get user courses from usermap
  // const userCourseIds = user.courses
  // temp data

  // map user course uids to course data from firebase
  // const courses = useCourseData()
  // currently, this pulls dummy data from fixtures

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

  function renderItem({item: courseId, index}: {item: string; index: number}) {
    const course: Course = coursemap[courseId];
    const title = `${courseId.replaceAll(/\s+/g, ' ').trim()} - ${
      course.courseTitle
    }`;
    // const timeLocation = course.classSections['0100'].timeLocations[0];
    // const instructors = course.classSections['0100'].instructors[0];
    return (
      <Pressable
        key={index}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 40,
          borderRadius: 20,
          backgroundColor: opacity(coral, 0.2),
          marginBottom: standardMargin,
        }}
        onPress={() => openCourseModal(courseId)}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          {title}
        </Text>
        {/* <Text style={styles.courseText}>{timeLocation.days.replaceAll(/\s+/g, ' ').trim()} - {convertTime(timeLocation.beginTime)} to {convertTime(timeLocation.endTime)}</Text>
        <Text style={styles.courseText}>{timeLocation.building} {timeLocation.room}</Text>
        <Text style={styles.courseText}>{instructors.instructor}</Text> */}
      </Pressable>
    );
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header centerElement={'Your Courses'} />
      <FlatList
        style={{flex: 1, width: '100%'}}
        contentContainerStyle={{
          position: 'absolute',
          display: 'flex',
          width: '100%',
          paddingLeft: standardMargin,
          paddingRight: standardMargin,
        }}
        data={courses}
        renderItem={renderItem}
        bounces={false}
      />
      <CourseInfoModal
        isOpen={modalVisible}
        setIsOpen={setModalVisible}
        modalData={modalData}
        chats={chats}
        openCoursePage={(id: string) =>
          appStackNavigate(navigation, 'chat', {id})
        }
      />
      <Pressable
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F883791A',
          borderRadius: 50,
          padding: 10,
        }}
        onPress={() =>
          Linking.openURL('https://my.sa.ucsb.edu/gold/Home.aspx')
        }>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
          }}>
          Manage Courses
        </Text>
      </Pressable>
    </View>
  );
}

type CourseInfoModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  modalData: string;
  chats: string[] | null | undefined;
  openCoursePage: (id: string) => void;
};
function CourseInfoModal({
  isOpen,
  setIsOpen,
  modalData,
  chats,
  openCoursePage,
}: CourseInfoModalProps) {
  function generateCourseModal(courseId: string) {
    const title = `${courseId.replaceAll(/\s+/g, ' ').trim()}`;
    const course = coursemap[courseId];
    // const timeLocation = course.classSections['0100'].timeLocations[0];
    // const instructors = course.classSections['0100'].instructors[0];

    return (
      <View>
        <Text
          style={{
            color: black,
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          {course.courseTitle}
        </Text>
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
                  setIsOpen(false);
                  openCoursePage(courseId);
                }
              : () => {
                  joinCourseChat(courseId);
                  setIsOpen(false);
                  openCoursePage(courseId);
                }
          }
        />
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
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}>
        <View
          style={{
            width: 300,
            padding: 16,
            borderRadius: 10,
            backgroundColor: 'white',
          }}>
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
