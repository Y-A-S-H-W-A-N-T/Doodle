import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userContext } from '../../components/MyContext'

export default function AddTest() {

    const params = useLocalSearchParams()
    const router = useRouter()

    const { user } = useContext(userContext)

    const user_id = '19231'  // Task : Change the id with actual user after creating DB, store it in user slice. Now using Async Storage

    useEffect(() => {
      if (user.student_class && user.student_section) {
        getTests()
      }
    }, [user]);

    const URL = 'http://192.168.29.130:8000'

    const getTests = async()=>{
      await axios.post(`${URL}/getTests`,{ class: user.student_class, section: user.student_section })
      .then((res)=>{
        setTests(res.data[0].tests)
        setPending_tests(res.data[0].tests.filter((test)=>!test.scores.some(score => score.student_id === user.student_id)))
      })
    }

    const [tests,setTests] = useState()
    const [Pending_Tests, setPending_tests] = useState()
    
    const Take_To_Test = (item)=>{
      router.push(
        {
          pathname: '/student/takeTest',
          params: {
            class_id: params.class_id,
            test_id: item._id,
            test_name: item.test_name,
            questions: JSON.stringify(item.questions)
            }
        })
    }

  return (
    <View>
      <View>
        <FlatList
            data={Pending_Tests}
            key={({item,index})=>item._id}
            renderItem={({ item })=>(
              <View>
                <TouchableOpacity onPress={()=>Take_To_Test(item)}>
                  <Text>{item.test_name}🗑️</Text>
                  <Text>{item.questions[0].que}</Text>
                </TouchableOpacity>
              </View>
            )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})