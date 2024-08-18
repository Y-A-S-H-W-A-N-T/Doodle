import { Button, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'


export default function Subjects() {

  const params = useLocalSearchParams()
  const router = useRouter()

  const URL = 'http://192.168.29.130:8000'

  const [subjects,setSubjects] = useState()

  async function fetchSubjects() {
    await axios.post(`${URL}/getSyllabus`,{ class_id: params.class_id })
    .then((res)=>{
      res.status === 200 ? setSubjects(res.data) : alert("error Fetching Subject & Syllabus")
    })
  }

  useEffect(()=>{
    fetchSubjects()
  },[])

  return (
    <View>
      <FlatList
        data={subjects}
        key={(val)=>val._id}
        renderItem={({ item, index })=>(
          <View>
              <TouchableOpacity onPress={()=>router.push({
                pathname: 'teacher/Chapters',
                params: {
                    class_id: params.class_id,
                    subject_name: item.name,
                    chapters: JSON.stringify(item.chapters),
                    subject_id: item._id
                  }
                })
              }>
                <Text>Subject : {item.name}</Text>
              </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({})