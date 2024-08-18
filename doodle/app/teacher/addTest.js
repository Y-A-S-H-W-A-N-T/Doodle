import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import axios from 'axios'

export default function AddTest() {

    const params = useLocalSearchParams()
    const router = useRouter()

    console.log(params)
    
    const [tests,setTests] = useState()

    const URL = 'http://192.168.29.130:8000'

    const getTests = async()=>{
      axios.post(`${URL}/getTests`,{ class: params.class, section: params.section })
      .then((res)=>{
        setTests(res.data[0].tests)
      })
    }


    useEffect(()=>{
      getTests()
    },[])

    const UploadTest = ()=>{
        router.push({pathname: 'UploadTest', params: {class_id: params.class_id, task: params.task}})
    }

  return (
    <View>
      <Text>All Tests : </Text>
      <View>
        <View>
            <Button title='Upload Test' onPress={UploadTest}/>
        </View>
        <FlatList
            data={tests}
            key={({item,index})=>item._id}
            renderItem={({ item })=>(
              <View>
                <TouchableOpacity>
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