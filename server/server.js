const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const mongoose = require('mongoose')
const { Classes, Student } = require('./schema.js')

app.use(bodyParser.json())
app.use(cors())


mongoose.connect('mongodb+srv://raoyashwant132:Xchange@mobile.qd2x1vb.mongodb.net/Doodle?retryWrites=true&w=majority&appName=Mobile').then(()=>{
    console.log("Connected")
})

app.listen(8000,(err)=>{
    if(err) return err
    console.log("Server Running")
})

app.post('/getTests',async(req,res)=>{
    console.log("Data : ",req.body)
    const Tests = await Classes.find({ standard: req.body.class, section: req.body.section },'tests').lean()
    res.send(Tests)
})

app.post('/getClasses',async(req,res)=>{
    const classes = await Classes.find({},'standard section')
    res.send(classes)
})

app.post('/submitTest',async(req,res)=>{

    console.log(
        req.body
    )
    const classes = await Classes.updateOne(
        {
            _id: req.body.Class_id,
            'tests._id': req.body.Test_id
        },
        { 
            $push: { 
              'tests.$.scores': {
                student_id: req.body.student_id,
                student_name: req.body.student_name,
                marks_scored: req.body.score
              }
            }
        }
    )
    res.status(200).json({msg: 'Success'})
})

// app.get('getTests_student',async(req,res)=>{
//     const Tests = await Classes.findOne({standard: req.body.standard, section: req.body.section}, 'tests')
//     res.send(Tests)
// })

app.post('/login',async(req,res)=>{
    const result = await Student.findOne({student_id: '19292', password: '19292'})
    result!==null ? res.status(200).send(result) : res.status(404).json({err: 'User Not Found'})
})

app.post('/uploadSyllabus', async (req, res) => {
    const { class_id, PDF, subject } = req.body
    console.log(req.body)
    try {
        const updatedClass = await Classes.findByIdAndUpdate(
            class_id,
            {
                $push: {
                    subjects: {
                        name: subject,
                        syllabus: PDF
                    }
                }
            },
        );

        if (!updatedClass) {
            return res.status(404).send('Class not found');
        }
        res.status(200).json({msg: "success", updatedClass});
    } catch (error) {
        console.log(error)
        res.status(500).send().json({msg: "error"})
    }
})


app.post('/getSyllabus',async(req,res)=>{
    const { class_id } = req.body
    const result = await Classes.findOne({_id: class_id}, 'subjects')
    res.status(200).send(result.subjects)
})


// adding chapter to subjects


app.post('/addChapter', async (req, res) => {

    const { class_id, subject_name, chapter_name} = req.body;

    try {
        const updatedClass = await Classes.findOneAndUpdate(
            { _id: class_id, 'subjects.name': subject_name },
            {
                $push: { 'subjects.$.chapters': { chapter_name: chapter_name } }
            },
            { new: true }
        );

        if (!updatedClass) {
            return res.status(404).json({ message: 'Class or subject not found' });
        }
        console.log(updatedClass)
        res.status(200).json({ message: 'Chapter Added', updatedClass });
    } catch (error) {
        console.error('Error adding chapter:', error);
        res.status(500).json({ message: 'Error while adding the chapter' });
    }
})

app.post('/upload_lecture_video',async(req,res)=>{
    const { class_id, subject_id, chapter_id, video_URL, lecture_name,  } = req.body

    const lecture = {
        lecture_name: lecture_name,
        lecture_video: video_URL
    }

  try {
    const result = await Classes.updateOne(
      { _id: class_id, "subjects._id": subject_id, "subjects.chapters._id": chapter_id },
      { $push: { "subjects.$[s].chapters.$[c].lectures": lecture } },
      {
        arrayFilters: [
          { "s._id": subject_id },
          { "c._id": chapter_id }
        ]
      }
    )
    console.log(result)
    res.status(200).send('Lecture added successfully');
  } catch (error) {
    res.status(500).send('Error adding lecture');
  }
})