import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import { useLocalSearchParams, useRouter } from 'expo-router'
import Add_Chapter_Modal from '../../components/addChapters'

export default function Add_Chapter_Lectures() {

    const router = useRouter()

    const params = useLocalSearchParams()

    const [modal,openModal] = useState(false)
    const chapters = JSON.parse(params.chapters)

    console.log(params)


  return (
    <View>
      <Text> {params.subject_name} </Text>
      <Text>SHOW ALL CHAPTERS HERE</Text>
      <FlatList
        data={chapters}
        key={(val)=>val._id}
        renderItem={({ item, index })=>(
          <TouchableOpacity onPress={()=>router.push({
            pathname: 'chapter_lectures',
            params: {
              lectures: JSON.stringify(chapters[index]),
              class_id: params.class_id,
              subject_id: params.subject_id,
              chapter_id: item._id
            }
          })}>
              <Text>{item.chapter_name}</Text>
          </TouchableOpacity>
        )}
      />
      <Text onPress={()=>openModal(true)}> ADD CHAPTERS </Text>
      {/* <Text>PUT ADD Chapter OPTION FOR TEACHER ONLY</Text>
      TO DO :  */}
      {modal && <Add_Chapter_Modal class_id={params.class_id} subject_name={params.subject_name} openModal={openModal}/>}
    </View>
  )
}

const styles = StyleSheet.create({})