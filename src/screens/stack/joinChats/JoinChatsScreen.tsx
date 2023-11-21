import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Pressable,
  Button,
  Modal,
} from 'react-native';
import {useSelector} from 'react-redux';
import {AppStackPageProps} from '../../../navigation/navigators/StackNavigator';
import {appStackNavigate} from '../../../navigation/navigators/StackNavigator';
import {coral, grey} from '../../../utilities/colors';
// import {coursemap, courses} from '../../../redux/dummyData';
import {joinCourseChat} from '../../../firebaseReduxUtilities/useChatData';
import {styles} from './ChatJoinStyle';
import Header from '../../../components/header/Header';
import {FontAwesome} from '@expo/vector-icons';
import {scale} from '../../../utilities/scale';
import { avenirBlackCentered } from '../../../utilities/textfont';

export type JoinChatsScreenProps = EmptyProps;

export default function JoinChatsScreen({
  route,
  navigation,
}: AppStackPageProps<'joinChats'>) {
  const myUserId = useSelector((state: ReduxState) => state.data.myUserId);
  const chats = useSelector(
    (state: ReduxState) => state.data.usermap[myUserId!].chats,
  );
  const tempCourses = useSelector((state: ReduxState) => state.data.usermap[myUserId!].courses);
  const courses: string[] = tempCourses ? tempCourses : [];
  const coursemap = useSelector((state: ReduxState) => state.data.coursemap);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState<string>(courses[0]);
  const [searchText, setSearchText] = useState<string>('');

  const openCourseModal = (id: string) => {
    setModalData(id);
    setModalVisible(true);
  };

  function generateCourseCards(courseId: string, index: number) {
    const course: Course = coursemap[courseId];
    // const title = `${courseId.replaceAll(/\s+/g, ' ').trim()} - ${
    // course.courseTitle
    // }`;
    if (
      course.courseTitle
        .toLowerCase()
        .replace(/\s/g, '')
        .includes(searchText.toLowerCase().replace(/\s/g, '').trim())
    ) {
      return (
        <View key={index} style={styles.courseCard}>
          <Text style={styles.courseCardTitle}>{course.courseTitle}</Text>
          <Pressable
            style={
              chats?.includes(courseId)
                ? styles.courseCardButtonDisabled
                : styles.courseCardButton
            }
            disabled={chats?.includes(courseId)}
            onPress={() => openCourseModal(courseId)}>
            <Text
              style={
                chats?.includes(courseId)
                  ? styles.courseCardButtonTextDisabled
                  : styles.courseCardButtonText
              }>
              {' '}
              {chats?.includes(courseId) ? 'Joined' : 'Join Chat'}
            </Text>
          </Pressable>
        </View>
      );
    }
  }

  function generateCourseModal(courseId: string) {
    const course = coursemap[courseId];
    // const title = `${courseId.replaceAll(/\s+/g, ' ').trim()}`;
    return (
      <View style={styles.courseModalContainer}>
        <Text style={styles.courseModalText}>
          Join {course?.courseTitle} chat?
        </Text>
        <Pressable
          style={styles.courseModalButton}
          onPress={() => {
            joinCourseChat(courseId);
            setModalVisible(false);
            appStackNavigate(navigation, 'chat', {id: courseId});
          }}>
          <Text style={styles.courseModalButtonText}> {'Yes!!!'}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header leftHandler={navigation.goBack} centerElement={'Join Chat'} />
      {/* <SearchBar
      containerStyle={{
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        width: '97%',
      }}
      inputContainerStyle={{backgroundColor: '#EEEEEE'}}
      placeholder="Search by course name"
      //@ts-ignore
      onChangeText={text => setSearchText(text)}
      value={searchText}
    /> */}

      {courses.length === 0 ? 
      <Text style={{ alignSelf: 'center', marginTop: 20, fontFamily: avenirBlackCentered, fontSize: 20, color: 'black' }}>
        You are not enrolled in any courses
      </Text>
       : null}
       
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
            <View>{generateCourseModal(modalData)}</View>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <FontAwesome
                name="close"
                size={scale(24)}
                color={coral}
                style={{alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
