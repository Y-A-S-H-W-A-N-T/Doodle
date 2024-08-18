import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { userContext } from '../../components/MyContext';

export default function Task() {

    const router = useRouter()

    const [role,setRole] = useState()

    const { user } = useContext(userContext)


  if(user.user_role === 'teacher'){
    return (
        <View>
          <Text>TASKS</Text>
          <View>
          <Text onPress={()=>router.push(
            {
              pathname: 'teacher/classes',
              params: {task: 'addTest'}
            }
          )}
          >ADD TEST</Text>
          <Text>Test Results</Text>
          <Text onPress={()=>router.push({pathname: 'teacher/classes', params: {task: 'syllabus'}})}>SYLLABUS</Text>
          </View>
        </View>
      )
  }
  else if(user.user_role === 'student'){
    return (
        <View>
          <Text>TASKS</Text>
          <Text onPress={()=>router.push(
            {
              pathname: 'student/tests'
            }
          )}
          >GO TO TEST</Text>
        </View>
      )
  }
}

const styles = StyleSheet.create({})