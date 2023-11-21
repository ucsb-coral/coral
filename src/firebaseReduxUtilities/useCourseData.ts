import firestore from '@react-native-firebase/firestore';
import { store } from '../redux/useRedux';
import { joinCourseAction, leaveCourseAction, loadCoursesAction, setMyUserAction } from '../redux/actions';
import { getUserDocumentRef } from './useUserData';
import { coursemap } from '../redux/dummyData';

/* load course data into coursemap from courses list */
const loadCoursesData = async (courseIds: string[] | null | undefined) => {
  if(!courseIds || courseIds.length == 0) return;
  const courseCollectionRef = firestore().collection('courses');
  try {
    const courseDocs = (await courseCollectionRef.where(firestore.FieldPath.documentId(), 'in', courseIds).get()).docs;
    const coursemap: Coursemap = {};
    courseDocs.forEach(doc => {
      coursemap[doc.id] = doc.data() as Course;
    });
    store.dispatch(loadCoursesAction({ coursemap }));
  } catch (error) {
    console.error('Failed to load courses data: ', error);
  }

};
// adds course data to firestore - move this to backend server later
const addCourses = async (courseIds: string[] | null | undefined) => {
  const courseCollectionRef = firestore().collection('courses');
  try {
    await firestore().runTransaction(async transaction => {
      // get course data from api - currently gets course data from dummyData
      courseIds?.forEach((courseId) => {
        const courseData = coursemap[courseId];
        // const courseData = store.getState().data.coursemap[courseId];
        console.log(courseData);
        
        transaction.set(courseCollectionRef.doc(courseId), courseData)
      })
    })
  } catch (error) {
    console.error('Failed to add courses: ', error);
  }
}

// returns all course ids from firestore
const getCourses = async () => {
  const courseCollectionRef = firestore().collection('courses');
  const courseDocIds = (await courseCollectionRef.get()).docs.forEach(doc => doc.id);
  return courseDocIds
}

const joinCourse = async (courseId: string) => {
  const myUserId = store.getState().data.myUserId;
  const myUserDocumentRef = getUserDocumentRef(myUserId);
  const courseDocumentRef = firestore().collection('courses').doc(courseId);
  try {
    firestore().runTransaction(async transaction => {
      // update user.courses list
      const myUserDocSnapshot = await transaction.get(myUserDocumentRef);
      if (!myUserDocSnapshot.exists) {
        throw 'User does not exist!';
      }
      const user = myUserDocSnapshot.data() as User;
      if (!user.courses) {
        user.courses = [courseId];
      } else {
        if (user.courses.includes(courseId)) {
          throw 'User is already in course with id: ' + courseId;
        }
        user.courses.push(courseId);
      }
      transaction.update(myUserDocumentRef, user);
      store.dispatch(setMyUserAction({ id: myUserId, user }));

      // update course.memberIds list
      const courseDocSnapshot = await transaction.get(courseDocumentRef);
      if (!courseDocSnapshot.exists) {
        throw 'Course does not exist!';
      }
      const course = courseDocSnapshot.data() as Course;
      if (!course.memberIds) {
        course.memberIds = [myUserId];
      } else {
        if (course.memberIds.includes(myUserId)) {
          throw 'Course already has member with id: ' + myUserId;
        }
        course.memberIds.push(myUserId);
      }
      transaction.update(courseDocumentRef, course);
      store.dispatch(joinCourseAction({ id: courseId, course }));

    });
  } catch (error) {
    console.error('Failed to join course: ', error);
    return error
  }
};

const leaveCourse = async (courseId: string) => {
  const myUserId = store.getState().data.myUserId;
  const myUserDocumentRef = getUserDocumentRef(myUserId);
  const courseDocumentRef = firestore().collection('courses').doc(courseId);
  try {
    firestore().runTransaction(async transaction => {
      // update user.courses list
      const myUserDocSnapshot = await transaction.get(myUserDocumentRef);
      if (!myUserDocSnapshot.exists) {
        throw 'User does not exist';
      }
      const user = myUserDocSnapshot.data() as User;
      if (!user.courses) {
        throw 'User is not in any courses';
      }
      const newCourses = user.courses.filter(id => id !== courseId);
      if (newCourses.length === user.courses.length) {
        throw 'User is not in course with id: ' + courseId;;
      } else {
        user.courses = newCourses;
      }
      transaction.update(myUserDocumentRef, user);
      store.dispatch(setMyUserAction({ id: myUserId, user }));

      // update course.memberIds list
      const courseDocSnapshot = await transaction.get(courseDocumentRef);
      if (!courseDocSnapshot.exists) {
        throw 'Course does not exist';
      }
      const course = courseDocSnapshot.data() as Course;
      if (!course.memberIds) {
        throw 'Course has no members';
      }
      const newMemberIds = course.memberIds.filter(id => id !== myUserId);
      if (newMemberIds.length === course.memberIds.length) {
        throw 'Course does not have member with id: ' + myUserId;
      } else {
        course.memberIds = newMemberIds;
      }
      transaction.update(courseDocumentRef, course);
      store.dispatch(leaveCourseAction({ id: courseId, course }));

    });
  } catch (error) {
    console.error('Failed to leave course: ', error);
  }
};

export default function useCourseData() {
  return {};
}

export { useCourseData, loadCoursesData, joinCourse, leaveCourse, addCourses, getCourses};
