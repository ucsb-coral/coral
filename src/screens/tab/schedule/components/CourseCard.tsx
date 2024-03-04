import {Pressable, Text, View} from 'react-native';
import {
  sfProTextBold,
  sfProTextRegular,
  sfProTextSemibold,
} from '../../../../utilities/textfont';
import Button from '../../../../components/button/Button';
import {joinCourseChat} from '../../../../firebaseReduxUtilities/useChatData';
import {black, coral, grey0, opacity} from '../../../../utilities/colors';

export type Props = {
  id: string;
  course: Course;
  joined: boolean;
  openChat: (courseId: string) => void;
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

export default function CourseCard({id, course, joined, openChat}: Props) {
  const {courseId, courseTitle, timeLocations} = course;
  const courseNumber = courseId?.replaceAll(/\s+/g, ' ').trim();

  //   const title = `${courseId?.replaceAll(/\s+/g, ' ').trim()} - ${courseTitle}`;
  const timeLocation =
    timeLocations?.find(timeloc => timeloc?.instructionTypeCode === 'LEC') ||
    timeLocations?.find(timeloc => timeloc?.instructionTypeCode === 'LAB');
  const instructors = timeLocation?.instructors[0];
  return (
    <Pressable
      style={{
        marginBottom: 16,
        width: '100%',
      }}
      // onPress={() => openCourseModal(courseId)}
    >
      <Text
        style={{
          fontFamily: sfProTextBold,
          fontSize: 26,
          color: black,
          //   marginBottom: 8,
        }}>
        {courseId}
      </Text>
      <Text
        style={{
          fontFamily: sfProTextSemibold,
          fontSize: 18,
          color: grey0,
          marginBottom: 8,
        }}>
        {courseTitle}
      </Text>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <View style={{display: 'flex'}}>
          <Text
            style={{
              fontFamily: sfProTextRegular,
              fontSize: 14,
              marginBottom: 4,
              color: grey0,
            }}>
            {timeLocation?.days.replaceAll(/\s+/g, ' ').trim()} -{' '}
            {timeLocation?.beginTime
              ? `${convertTime(timeLocation?.beginTime)} to ${convertTime(
                  timeLocation?.endTime,
                )}`
              : 'TBA'}
          </Text>
          <Text
            style={{
              fontFamily: sfProTextRegular,
              fontSize: 14,
              marginBottom: 4,
              color: grey0,
            }}>
            {timeLocation?.buildingRoom}
          </Text>
          <Text
            style={{
              fontFamily: sfProTextRegular,
              fontSize: 14,
              color: grey0,
            }}>
            {instructors?.name}
          </Text>
        </View>
        <Button
          label={joined ? 'Open Chat' : 'Join Chat'}
          style={{alignSelf: 'flex-end', backgroundColor: opacity(coral, 0.9)}}
          onPress={() => {
            if (!joined) joinCourseChat(id);
            openChat(id);
          }}
        />
      </View>
    </Pressable>
  );
}
