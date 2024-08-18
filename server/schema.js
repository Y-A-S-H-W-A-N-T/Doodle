const mongoose = require('mongoose')

const { Schema } = mongoose

const subject_marks = new Schema({
    name_subject: {
        type: String
    },
    marks_subject: {
        type: String
    }
})

const student = new Schema({
    name: {
        type: String
    },
    marks: [subject_marks],
})

const question = new Schema({
    que: String,
    opt1: String,
    opt2: String,
    opt3: String,
    ans: String
})

const score = new Schema({
    student_id: String,
    student_name: String,
    marks_scored: String
})

const test = new Schema({
    test_name: {
        type: String
    },
    questions: [question],
    scores: [score]
})

const lecture = new Schema({
    lecture_name: String,
    lecture_video: String,
})

const chapter = new Schema({
    chapter_name: String,
    lectures: [lecture]
})

const subject = new Schema({
    name: String,
    syllabus: String,
    chapters: [chapter]
})

const material = new Schema({
    subject_name: String,
    material_title: String,
    media: String,
    url: String
})

const days = new Schema({
    day: String,
    timings: [String]
})

const periods = new Schema({
    period: String,
    period_days: [days]
})

const students_attendance = new Schema({
    student_id: String,
    student_name: String,
    attendance: String
})

const ClassesSchema = new Schema({
    standard: {
        type: String,
    },
    section: {
        type: String
    },
    students: [student],
    subjects: [subject],
    notes: [material],
    time_table: [periods],
    tests: [test],
    attendance: [students_attendance]
})

const StudentSchema = new Schema({
    student_id: String,
    student_name: String,
    student_class: String,
    student_section: String,
    password: String
})

const Classes = mongoose.models['classes'] || mongoose.model('classes', ClassesSchema)
const Student = mongoose.models['student'] || mongoose.model('student', StudentSchema)

module.exports = { Classes, Student }