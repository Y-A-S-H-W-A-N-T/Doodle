import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import axios from 'axios'

export default function classes() {

  const router = useRouter()
  const params = useLocalSearchParams()

  const [classes,setClasses] = useState()

  const URL = 'http://192.168.29.130:8000'
  
  const getClass = async()=>{
    axios.post(`${URL}/getClasses`).then((res)=>setClasses(res.data))
  }

  console.log("classes = ",classes)

  useEffect(()=>{
    getClass()
  },[])

  return (
    <View>
      <Text>Assigned Classes : </Text>
      <Text>Choose Subject</Text>
      <View>
        <FlatList
          data={classes}
          key={(data)=>data._id}
          renderItem={({item})=>(
            <View style={styles.box}>
              <TouchableOpacity onPress={()=>router.push({pathname: `teacher/${params.task}`, params: {class: item.standard, section: item.section, class_id: item._id}})}>
                <Text>{item.standard}</Text>
                <Text>{item.section}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: 'cyan',
    margin: 10
  }
})