import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import * as DocumentPicker from 'expo-document-picker';
import * as Linking from 'expo-linking';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';
import { storage, ref, uploadBytesResumable, getDownloadURL } from '../../../Firebase/config';
import Syllabus_Modal from '../../../components/addSyllabus_Modal';
import axios from 'axios';

export default function Syllabus() {

    const params = useLocalSearchParams()

    const [modal,openModal] = useState(false)

    const [subjectSyllabus,setSubject_Syllabus] = useState()

    const [pdf,setPDF] = useState()
    // fetch all subjects pdfs here

    const URL = 'http://192.168.29.130:8000'

    async function fetchSyllabus() {
      await axios.post(`${URL}/getSyllabus`,{ class_id: params.class_id })
      .then((res)=>{
        res.status === 200 ? setSubject_Syllabus(res.data) : alert("error Fetching Subject & Syllabus")
      })
    }

    useEffect(()=>{
      fetchSyllabus()
    },[])

    const OpenPDF = (PDF)=>{
      Linking.openURL(PDF)
    }

    console.log(subjectSyllabus)

  return (
    <View>
      <Text>{params.class}{params.section}</Text>
      <Text onPress={()=>openModal(true)}>ADD</Text>
      <FlatList
        data={subjectSyllabus}
        key={(val)=>val._id}
        renderItem={({ item })=>(
          <View>
              <View>
                <Text>Subject : {item.name}</Text>
                <Text onPress={()=>OpenPDF(item.syllabus)}>Open PDF</Text>
                <Text onPress={()=>setPDF(item.syllabus)}>Download PDF</Text>
              </View>
          </View>
        )}
      />
      {pdf && <WebView
          source={{ uri: pdf }}
          style={{ flex: 1 }}
      />}
      {modal && <Syllabus_Modal openModal={openModal} class_id={params.class_id}/>}
    </View>
  )
}

const styles = StyleSheet.create({})