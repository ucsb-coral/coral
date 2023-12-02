const courses = ['crsfirebase_uid_1', 'crsfirebase_uid_2', 'crsfirebase_uid_3', 'crsfirebase_uid_4', 'crsfirebase_uid_5', 'crsfirebase_uid_6', 'crsfirebase_uid_7'];

const coursemap: Coursemap = {
  crsfirebase_uid_1: {
    memberIds: [],
    courseId: 'CMPSC 16',
    quarter: '20234',
    enrollCode: '07724',
    gradingOptionCode: 'L',
    unitsAttempted: 4,
    courseTitle: 'PROBLEM SOLVING I',
    session: '',
    repeatTypeCode: 'string',
    timeLocations: [{
      "section": "0100",
      "instructionTypeCode": "LEC",
      "buildingRoom": "ILP 2302",
      "days": "M W",
      "beginTime": "11:00",
      "endTime": "12:15",
      "instructors": [
        {
            "name": "Maryam Majedi",
            "functionCode": "Teaching and in charge"
        }
    ]
  }],
    waitlist: false,
  },
  crsfirebase_uid_2: {
    memberIds: [],
    courseId: 'CMPSC 24',
    quarter: '20234',
    enrollCode: 'string',
    gradingOptionCode: 'string',
    unitsAttempted: 4,
    courseTitle: 'PROBLEM SOLVING II',
    session: 'string',
    repeatTypeCode: 'string',
    timeLocations: [{
      "section": "0101",
      "instructionTypeCode": "LEC",
      "buildingRoom": "Phelps 0000",
      "days": "M W",
      "beginTime": "14:00",
      "endTime": "15:15",
      "instructors": [
        {
            "name": "teacher of24",
            "functionCode": "Teaching and in charge"
        }
    ]
  }],
    waitlist: false,
  },
  crsfirebase_uid_3: {
    memberIds: [],
    courseId: '',
    quarter: '2000F',
    enrollCode: 'string',
    gradingOptionCode: 'string',
    unitsAttempted: 4,
    courseTitle: 'Test Course 3',
    session: 'string',
    repeatTypeCode: 'string',
    timeLocations: [],
    waitlist: false,
  },
  crsfirebase_uid_4: {
    memberIds: [],
    courseId: '',
    quarter: '2000F',
    enrollCode: 'string',
    gradingOptionCode: 'string',
    unitsAttempted: 4,
    courseTitle: 'Test Course 4',
    session: 'string',
    repeatTypeCode: 'string',
    timeLocations: [],
    waitlist: false,
  },
  crsfirebase_uid_5: {
    memberIds: [],
    courseId: '',
    quarter: '2000F',
    enrollCode: 'string',
    gradingOptionCode: 'string',
    unitsAttempted: 4,
    courseTitle: 'Test Course 5',
    session: 'string',
    repeatTypeCode: 'string',
    timeLocations: [],
    waitlist: true,
  },
  crsfirebase_uid_6: {
    memberIds: [],
    courseId: '',
    quarter: '2000F',
    enrollCode: 'string',
    gradingOptionCode: 'string',
    unitsAttempted: 4,
    courseTitle: 'Test Course 6',
    session: 'string',
    repeatTypeCode: 'string',
    timeLocations: [],
    waitlist: true,
  },
  crsfirebase_uid_7: {
    memberIds: [],
    courseId: '',
    quarter: '2000F',
    enrollCode: 'string',
    gradingOptionCode: 'string',
    unitsAttempted: 4,
    courseTitle: 'Test Course 7',
    session: 'string',
    repeatTypeCode: 'string',
    timeLocations: [],
    waitlist: true,
  },
};

export {coursemap, courses};