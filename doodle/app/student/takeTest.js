import { FlatList, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { RadioButton } from 'react-native-paper';
import axios from 'axios'
import { userContext } from '../../components/MyContext';

export default function takeTest() {

    const { class_id, test_id, test_name, questions } = useLocalSearchParams()
    
    const { user } = useContext(userContext)


    const Question = JSON.parse(questions)

    console.log("TEST : ",Question)
    
    const [currentQuestion,setCurrentQuestion] = useState(0)
    const [selectedOption,setSelectedOption] = useState(null)
    console.log(selectedOption)

    const option = Question[currentQuestion]
    const options = [option.opt1, option.opt2, option.opt3, option.ans]

    const [marks,setMarks] = useState(0)

    const nextQuestion = ()=>{
      Calculate_Marks()
      setCurrentQuestion(currentQuestion+1)
      setSelectedOption(null)
    }

    const Calculate_Marks = ()=>{
      option.ans === selectedOption ? setMarks(marks+1) : ''
    }

    console.log("Total Marks : ",marks)
    const URL = 'http://192.168.29.130:8000'

    const SubmitTest = async()=>{
      Calculate_Marks()
      axios.post(`${URL}/submitTest`,{
        Test_id: test_id,
        Class_id: class_id,
        student_id: user.student_id, // Task : store id in redux user slice
        student_name: user.student_name, // Task : store name in redux user slice
        score: marks,
      })
      .then((res)=>{
        res.status===200? router.push('/(tabs)/profile') : alert("Error in Test Submission")
      })
    }

  return (
    <View>
      <View>
        <Text>{test_name}</Text>
        <View>
          <Text>{Question[currentQuestion].que}</Text>
          {
            options.map((option,ind)=>(
              <RadioButton.Group value={selectedOption} onValueChange={val => setSelectedOption(val)} key={ind}>
                <View>
                  <Text>{option}</Text>
                  <RadioButton value={option} />
                </View>
              </RadioButton.Group>
            ))
          }
          {!(currentQuestion == Question.length-1) && <Button title='NEXT' onPress={nextQuestion} disabled={currentQuestion == Question.length-1}/>}
          {(currentQuestion == Question.length-1) && <Button title='SUBMIT' onPress={SubmitTest}/>}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})