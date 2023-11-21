import React, { Dispatch, Key, SetStateAction, useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  AppStackPageProps,
  appStackNavigate,
} from '../../../navigation/navigators/StackNavigator';
import { useSelector } from 'react-redux';
import { black, coral, grey, opacity } from '../../../utilities/colors';
import { joinCourseChat } from '../../../firebaseReduxUtilities/useChatData';
import { addCourses, joinCourse, leaveCourse, loadCoursesData } from '../../../firebaseReduxUtilities/useCourseData';
import { FontAwesome } from '@expo/vector-icons';
import { scale, standardMargin } from '../../../utilities/scale';
import Header from '../../../components/header/Header';
import { CompositeScreenProps } from '@react-navigation/native';
import { TabPageProps } from '../../../navigation/navigators/TabNavigator';
import { avenirBlackCentered } from '../../../utilities/textfont';
import { courses } from '../../../redux/dummyData';

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

export default function ScheduleScreen({ route, navigation }: SchedulePageProps) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const chats = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!].chats,
  );
  const tempCourses = useSelector((state: ReduxState) => state.data.usermap[myUserId!].courses);
  const userCourses: string[] = tempCourses ? tempCourses : [];

  // uncomment this and refresh to reset/load dummy data into firebase
  // addCourses(courses)

  // load user.courses list into coursemap
  useEffect(() => {
    loadCoursesData(userCourses);
  }, [userCourses]);

  const userCoursemap = useSelector((state: ReduxState) => state.data.coursemap);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<string>("");

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

  function renderItem({ item: courseId, index }: { item: string; index: number; }) {
    const course: Course = userCoursemap[courseId];
    const title = `${course?.courseId?.replaceAll(/\s+/g, ' ').trim()} - ${course.courseTitle}`;
    const timeLocation = course?.timeLocations?.find((timeloc) => timeloc.instructionTypeCode === 'LEC');
    const instructors = timeLocation?.instructors[0];
    return (
      <Pressable
        key={index}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: 'auto',
          padding: 8,
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
        <Text style={styles.courseText}>{timeLocation?.days.replaceAll(/\s+/g, ' ').trim()} - {convertTime(timeLocation?.beginTime)} to {convertTime(timeLocation?.endTime)}</Text>
        <Text style={styles.courseText}>{timeLocation?.buildingRoom}</Text>
        <Text style={styles.courseText}>{instructors?.name}</Text>
      </Pressable>
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
      const course = userCoursemap[courseId];
      const title = `${course?.courseId.replaceAll(/\s+/g, ' ').trim()}`;
      const timeLocation = course?.timeLocations?.find((timeloc) => timeloc.instructionTypeCode === 'LEC');
      const instructors = timeLocation?.instructors[0];

      return (
        <View>
          <Text
            style={{
              color: black,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
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
          <Button
            title={chats?.includes(courseId) ? 'Open Chat' : 'Join Chat'}
            color={coral}
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
                style={{ alignSelf: 'flex-end' }}
              />
            </TouchableOpacity>
            {generateCourseModal(modalData)}
          </View>
        </View>
      </Modal>
    );
  }


  return (
    <View
      style={{
        flex: 1,
      }}>
      <Header centerElement={'Your Courses'} />
      <View style={{ flex: 1, width: '100%' }}>

        {userCourses.length == 0 ?
          <Text style={{ alignSelf: 'center', marginTop: 20, fontFamily: avenirBlackCentered, fontSize: 20, color: 'black' }}>
            You are not enrolled in any courses
          </Text>
          :
          <FlatList
            style={{}}
            contentContainerStyle={{
              position: 'absolute',
              display: 'flex',
              width: '100%',
              paddingLeft: standardMargin,
              paddingRight: standardMargin,
            }}
            data={userCourses}
            renderItem={renderItem}
            bounces={false}
          />
        }
      </View>
      <CourseInfoModal
        isOpen={modalVisible}
        setIsOpen={setModalVisible}
        modalData={modalData}
        chats={chats}
        openCoursePage={(id: string) =>
          appStackNavigate(navigation, 'chat', { id })
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
          appStackNavigate(navigation, 'joinCourses', { id: 'joinCourses' })
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

