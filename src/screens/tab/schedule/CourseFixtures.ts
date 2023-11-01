
type CourseLocation = {
    room: string;
    building: string;
    roomCapacity: number;
    days: string;
    beginTime: string;
    endTime: string;
};

type Instructor = {
    instructor: string;
    functionCode: string;
};

type ClassSection = {
    enrollCode: string;
    section: string;
    session: string | null;
    classClosed: string | null;
    courseCancelled: string | null;
    gradingOptionCode: string;
    enrolledTotal: number;
    maxEnroll: number;
    secondaryStatus: string | null;
    departmentApprovalRequired: boolean;
    instructorApprovalRequired: boolean;
    restrictionLevel: string | null;
    restrictionMajor: string | null;
    restrictionMajorPass: string | null;
    restrictionMinor: string | null;
    restrictionMinorPass: string | null;
    concurrentCourses: string[];
    timeLocations: CourseLocation[];
    instructors: Instructor[];
};

type CourseInfo = {
    courseId: string;
    quarter: string;
    title: string;
    description: string;
    objLevelCode: string;
    unitsFixed: string;
};

type Course = {
    courseInfo: CourseInfo;
    classSections: Record<string,ClassSection>;
};

type Courses = Record<string, Course>;

const courses: Courses = {
    "firebase_uid_1": {
        "courseInfo": {
            "courseId": "CMPSC    16  ",
            "quarter": "20234",
            "title": "PROBLEM SOLVING I",
            "description": "Fundamental building blocks for solving problems using computers. Topics include basic computer organization and programming constructs: memory CPU, binary arithmetic, variables, expressions, statements, conditionals, iteration, functions, parameters, recursion, primitive and composite data types, and basic operating system and debugging tools.",
            "objLevelCode": "U",
            "unitsFixed": "4",
        },
        "classSections": {
            "0100": {
                "enrollCode": "07724",
                "section": "0100",
                "session": null,
                "classClosed": null,
                "courseCancelled": null,
                "gradingOptionCode": "L",
                "enrolledTotal": 150,
                "maxEnroll": 150,
                "secondaryStatus": null,
                "departmentApprovalRequired": false,
                "instructorApprovalRequired": false,
                "restrictionLevel": null,
                "restrictionMajor": "+CMPEN+CMPCS+EE",
                "restrictionMajorPass": "2",
                "restrictionMinor": null,
                "restrictionMinorPass": null,
                "concurrentCourses": [],
                "timeLocations": [
                    {
                        "room": "2302",
                        "building": "ILP",
                        "roomCapacity": 250,
                        "days": "M W    ",
                        "beginTime": "11:00",
                        "endTime": "12:15"
                    }
                ],
                "instructors": [
                    {
                        "instructor": "Maryam Majedi",
                        "functionCode": "Teaching and in charge"
                    }
                ]
            }
        }
    },
    "firebase_uid_2": {
        "courseInfo": {
            "courseId": "CMPSC    24  ",
            "quarter": "20234",
            "title": "PROBLEM SOLVING II",
            "description": "Intermediate building blocks for solving problems using computers. Topics include intermediate object-oriented programming, data structures, object-oriented design, algorithms for manipulating these data structures and their run-time analyses. Data structures introduced include stacks, queues, lists, trees, and sets.",
            "objLevelCode": "U",
            "unitsFixed": "4",
        },
        "classSections": {
            "0100": {
                "enrollCode": "07773",
                "section": "0100",
                "session": null,
                "classClosed": null,
                "courseCancelled": null,
                "gradingOptionCode": "L",
                "enrolledTotal": 150,
                "maxEnroll": 150,
                "secondaryStatus": null,
                "departmentApprovalRequired": false,
                "instructorApprovalRequired": false,
                "restrictionLevel": null,
                "restrictionMajor": "+CMPEN+CMPCS",
                "restrictionMajorPass": "2",
                "restrictionMinor": null,
                "restrictionMinorPass": null,
                "concurrentCourses": [],
                "timeLocations": [
                    {
                        "room": "1701",
                        "building": "TD-W",
                        "roomCapacity": 150,
                        "days": "M W    ",
                        "beginTime": "12:30",
                        "endTime": "13:45"
                    }
                ],
                "instructors": [
                    {
                        "instructor": "Diba Mirza",
                        "functionCode": "Teaching and in charge"
                    }
                ]
            }
        }
    },
    "firebase_uid_3": {
        "courseInfo": {
            "courseId": "CMPSC    32  ",
            "quarter": "20234",
            "title": "OBJ ORIENT DESIGN",
            "description": "Advanced topics in object-oriented computing. Topics include encapsulation, data hiding, inheritance, polymorphism, compilation, linking and loading, memory management, and debugging; recent advances in design and development tools, practices, libraries, and operating system support.",
            "objLevelCode": "U",
            "unitsFixed": "4",
        },
        "classSections": {
            "0100": {
                "enrollCode": "07831",
                "section": "0100",
                "session": null,
                "classClosed": null,
                "courseCancelled": null,
                "gradingOptionCode": "L",
                "enrolledTotal": 150,
                "maxEnroll": 150,
                "secondaryStatus": null,
                "departmentApprovalRequired": false,
                "instructorApprovalRequired": false,
                "restrictionLevel": null,
                "restrictionMajor": "+CMPEN+CMPCS",
                "restrictionMajorPass": null,
                "restrictionMinor": null,
                "restrictionMinorPass": null,
                "concurrentCourses": [],
                "timeLocations": [
                    {
                        "room": "1701",
                        "building": "TD-W",
                        "roomCapacity": 150,
                        "days": "M W    ",
                        "beginTime": "14:00",
                        "endTime": "15:15"
                    }
                ],
                "instructors": [
                    {
                        "instructor": "Kevin Burk",
                        "functionCode": "Teaching and in charge"
                    }
                ]
            }
        }
    },
    "firebase_uid_4": {
        "courseInfo": {
            "courseId": "CMPSC   130A ",
            "quarter": "20234",
            "title": "DATA STRUCT ALGOR",
            "description": "Data structures and applications with proofs of correctness and analysis. Hash tables, priority queues (heaps); balanced search trees. Graph traversal techniques and their applications.",
            "objLevelCode": "U",
            "unitsFixed": "4",
        },
        "classSections": {
            "0100": {
                "enrollCode": "08045",
                "section": "0100",
                "session": null,
                "classClosed": null,
                "courseCancelled": null,
                "gradingOptionCode": "L",
                "enrolledTotal": 150,
                "maxEnroll": 136,
                "secondaryStatus": null,
                "departmentApprovalRequired": false,
                "instructorApprovalRequired": false,
                "restrictionLevel": null,
                "restrictionMajor": "+CMPEN+CMPCS+EE",
                "restrictionMajorPass": null,
                "restrictionMinor": null,
                "restrictionMinorPass": null,
                "concurrentCourses": [],
                "timeLocations": [
                    {
                        "room": "1101",
                        "building": "ILP",
                        "roomCapacity": 175,
                        "days": "M W    ",
                        "beginTime": "09:30",
                        "endTime": "10:45"
                    }
                ],
                "instructors": [
                    {
                        "instructor": "Eric Vigoda",
                        "functionCode": "Teaching and in charge"
                    }
                ]
            }
        }
    },
    "firebase_uid_5": {
        "courseInfo": {
            "courseId": "CMPSC   184  ",
            "quarter": "20234",
            "title": "MOBILE APP DEV",
            "description": "An introduction to programming mobile computing devices. Students will learn about and study the shift in software development from desktop to mobile device applications. Topics will include software engineering and design practices, advances in programming practice, and support tools for mobile application development and testing. Students will develop and deploy mobile applications as part of their course work.",
            "objLevelCode": "U",
            "unitsFixed": "4",
        },
        "classSections": {
            "0100": {
                "enrollCode": "52894",
                "section": "0100",
                "session": null,
                "classClosed": null,
                "courseCancelled": null,
                "gradingOptionCode": "L",
                "enrolledTotal": 76,
                "maxEnroll": 76,
                "secondaryStatus": null,
                "departmentApprovalRequired": false,
                "instructorApprovalRequired": false,
                "restrictionLevel": null,
                "restrictionMajor": "+CMPEN+CMPCS",
                "restrictionMajorPass": null,
                "restrictionMinor": null,
                "restrictionMinorPass": null,
                "concurrentCourses": [],
                "timeLocations": [
                    {
                        "room": "1431",
                        "building": "South Hall",
                        "roomCapacity": 76,
                        "days": "M W    ",
                        "beginTime": "14:00",
                        "endTime": "15:15"
                    }
                ],
                "instructors": [
                    {
                        "instructor": "Tobias Hollerer",
                        "functionCode": "Teaching and in charge"
                    }
                ]
            }
        }
    },
};

export {courses, Course}