import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {coral} from '../../../utilities/colors';
import { courses} from '../../../redux/dummyData';
import {styles} from '../joinChats/ChatJoinStyle';
import Header from '../../../components/header/Header';
import {FontAwesome} from '@expo/vector-icons';
import { joinCourse, loadCoursesData } from '../../../firebaseReduxUtilities/useCourseData';
import SearchInput from '../../../components/searchInput/SearchInput';
import { standardMargin } from '../../../utilities/scale';

export type JoinCoursesScreenProps = EmptyProps;

export default function JoinCoursesScreen({
  route,
  navigation,
}: AppStackPageProps<'joinCourses'>) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const tempCourses = useSelector((state: ReduxState) => state.data.usermap[myUserId!].courses);
  const userCourses: string[] = tempCourses ? tempCourses : [];
  const userCoursemap = useSelector((state: ReduxState) => state.data.coursemap);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<string>(userCourses[0]);
  const [searchText, setSearchText] = useState<string>('');

  // loads dummy courses into coursemap
  useEffect(() => {
    loadCoursesData(courses);
  }, [courses]);

  const openCourseModal = (id: string) => {
    setModalData(id);
    setModalVisible(true);
  };

  function generateCourseCards(courseId: string, index: number) {
    const course: Course = userCoursemap[courseId];

    if (
        course.courseId
        .toLowerCase()
        .replace(/\s/g, '')
        .includes(searchText.toLowerCase().replace(/\s/g, '').trim())
    ) {
      return (
        <View key={index} style={styles.courseCard}>
          <Text style={styles.courseCardTitle}>{course.courseId}</Text>
          <Pressable
            style={
              userCourses?.includes(courseId)
                ? styles.courseCardButtonDisabled
                : styles.courseCardButton
            }
            disabled={userCourses?.includes(courseId)}
            onPress={() => openCourseModal(courseId)}>
            <Text
              style={
                userCourses?.includes(courseId)
                  ? styles.courseCardButtonTextDisabled
                  : styles.courseCardButtonText
              }>
              {' '}
              {userCourses?.includes(courseId) ? 'Joined' : 'Join Course'}
            </Text>
          </Pressable>
        </View>
      );
    }
  }

  function generateCourseModal(courseId: string) {
    const course = userCoursemap[courseId];
    return (
      <View style={styles.courseModalContainer}>
        <Text style={styles.courseModalText}>
          Join {course?.courseTitle}?
        </Text>
        <Pressable
          style={styles.courseModalButton}
          onPress={() => {
            joinCourse(courseId);
            setModalVisible(false);
            navigation.goBack();
          }}>
          <Text style={styles.courseModalButtonText}> {'Yes!!!'}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header leftHandler={navigation.goBack} centerElement={'Join Courses'} />

      <SearchInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search by course name"
        style={{
          marginLeft: standardMargin,
          marginRight: standardMargin,
        }}
      />

      <ScrollView
        style={styles.courseList}
        contentContainerStyle={styles.courseListContainer}>
        {/* currently, users can only see and join courses from the dummy data */}
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
            <View>{generateCourseModal(modalData)}</View>
            <Pressable onPress={() => setModalVisible(false)} style={{}}>
              <FontAwesome
                name="close"
                color={coral}
                style={{alignSelf: 'flex-end'}}
              />
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
