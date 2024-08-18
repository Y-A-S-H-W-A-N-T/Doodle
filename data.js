data = {
    standard: 'V',
    section: 'A',
    students: [{
        name: 'Yashwant',
        marks: [{
            name_subject: 'Maths',
            marks_subject: '82'
        },
        {
            name_subject: 'English',
            marks_subject: '95'
        }]
    },
    {
        name: 'Abish',
        marks: [{
            name_subject: 'Maths',
            marks_subject: '80'
        },
        {
            name_subject: 'English',
            marks_subject: '90'
        }]
    }],
    subjects: [{
        name: 'Maths',
        syllabus: 'PDF URL',
        chapters: [{
            chapter_name: 'Ecosystem',
            lectures: [{
                lecture_name: 'unit 1',
                lecture_video: 'video_link'
            },
            {
                lecture_name: 'unit 2',
                lecture_video: 'video_link'
            }]
        }]
    },
    {
        name: 'English',
        syllabus: 'PDF URL'
    }],
    notes: [{
        subject_name: 'Maths',
        material_title: 'Excercise : 5.6',
        media: 'dummy URL',
        url: 'dummy URL'
    },
    {
        subject_name: 'Science',
        material_title: 'Unit 5',
        media: 'dummy URL',
        url: 'dummy URL'
    }],
    time_table: [{
        period: 'Maths',
        period_days: [{
            day: 'Monday',
            timings: ['8:45-9:45','10:45-12:45']
        },
        {
            day: 'Tuesday',
            timings: ['11:45-12:45']
        }]
    },
    {
        period: 'English',
        period_day: [{
            day: 'Wednesday',
            timings: ['8:45-9:45','10:45-12:45']
        },
        {
            day: 'Friday',
            timings: ['11:45-12:45']
        }]
    }],
    tests: [{
        test_name: 'Maths',
        questions: [{
            que: '2+2',
            opt1: '2',
            opt2: '3',
            opt3: '5',
            ans: '4'
        },
        {
            que: '2+5',
            opt1: '2',
            opt2: '25',
            opt3: '4',
            ans: '7'
        }],
        scores: [{
            student_id: '19292',
            student_name: 'Yashwant',
            marks_scored: '100'
        },
        {
            student_id: '19240',
            student_name: 'Surya',
            marks_scored: '90'
        }]
    },
    {
        test_name: 'English',
        questions: [{
            que: '2+3',
            opt1: '2',
            opt2: '3',
            opt3: '2',
            ans: '5'
        },
        {
            que: '2+5',
            opt1: '0',
            opt2: '0',
            opt3: '0',
            ans: '7'
        }],
        scores: [{
            student_id: '19292',
            student_name: 'Yashwant',
            marks_scored: '99'
        },
        {
            student_id: '19240',
            student_name: 'Surya',
            marks_scored: '98'
        }]
    }
    ],
    attendance: [{
        student_id: '19292',
        student_name: 'Yashwant',
        attendance: '40%'
    },
    {
        student_id: '19240',
        student_name: 'Surya',
        attendance: '75%'
    }]
}