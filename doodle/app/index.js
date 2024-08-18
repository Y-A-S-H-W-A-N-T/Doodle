import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { useRouter } from 'expo-router'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userContext } from '../components/MyContext'

export default function login() {

  const router = useRouter()
  
  const { user, setUser } = useContext(userContext)

  const user_type = 'student'

  const URL = 'http://192.168.29.130:8000'


  const Student_Login  = async()=>{
    await axios.post(`${URL}/login`).then(async(val)=>{
      if(val.status === 200){
        // await AsyncStorage.setItem('student_id', val.data.student_id)
        // await AsyncStorage.setItem('student_class', val.data.student_class)
        // await AsyncStorage.setItem('student_section', val.data.student_section)
        // await AsyncStorage.setItem('student_name', val.data.student_name)
        // await AsyncStorage.setItem('user_role', 'student')
        setUser({
          student_id: val.data.student_id,
          student_class: val.data.student_class,
          student_section: val.data.student_section,
          student_name: val.data.student_name,
          user_role: 'teacher'
        })
        router.replace('(tabs)/profile')
      }
    })
  }

  const Teacher_Login = async()=>{
    // Task : check in teacher database
    // Task : set role as teacher
    router.replace('(tabs)/profile')
  }

  return (
    <View>
      <Text style={styles.temp}>Login here</Text>
      <Button title='LOGIN' onPress={()=>user_type === 'student' ? Student_Login() : Teacher_Login()}/>
    </View>
  )
}

const styles = StyleSheet.create({
  temp: {
    marginTop: 100
  }
})