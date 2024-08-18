import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { storage, getDownloadURL, ref, uploadBytesResumable } from '../Firebase/config'
import axios from 'axios'
import { Video } from 'expo-av';
import { Link, router, useLocalSearchParams, useRouter } from 'expo-router'
import Add_Lecture_Videos from '../components/addLecture_Videos'

export default function chapter_lectures() {

  const params = useLocalSearchParams()
  const router = useRouter()

  console.log("DATA : ",params)

  const [modal,openModal] = useState(false)
  const [lectures,setLectures] = useState()

  const URL = 'http://192.168.29.130:8000'

  const fetch_Lectures = async()=>{
    axios.post(`${URL}/fetch_lectures`,{
      class_id: params.class_id,
      subject_id: params.subject_id,
      chapter_id: params.chapter_id
    })
    .then((res)=>{
      if(res.status === 200){
        setLectures(res.data)
      }
      else{
        alert("Error in fetching lectures, Try Again After Some Time")
      }
    })
  }

  useEffect(()=>{
    fetch_Lectures()
  },[])

  console.log("Lectures : ",lectures)
  
  return (
    <View>
      <Text onPress={()=>openModal(true)}>Add Lecture</Text>
      {modal && <Add_Lecture_Videos openModal={openModal}/>}
      <View>
        <Text>ALL LECTURES</Text>
        {
          <FlatList
            data={lectures}
            key={(val)=>val._id}
            renderItem={({ item })=>(
              <View>
                <TouchableOpacity onPress={()=>router.push({
                  pathname: '/play_lecture',
                  params: {
                    video: encodeURIComponent(item.lecture_video)
                  }
                })}>
                  {console.log("ALL VIDEOS = ",item.lecture_video)}
                  <Text>{item.lecture_name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

})