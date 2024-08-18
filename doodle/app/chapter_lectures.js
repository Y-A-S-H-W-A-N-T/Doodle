import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { storage, getDownloadURL, ref, uploadBytesResumable } from '../Firebase/config'
import axios from 'axios'
import { Video } from 'expo-av';
import { useLocalSearchParams } from 'expo-router'

export default function chapter_lectures() {

  const params = useLocalSearchParams()

  console.log("chapter lectures : ",params)
  
  const [videoURI,setVideoURI] = useState()
  const [lecture_name,setLecture_name] = useState()

  const URL = 'http://192.168.29.130:8000'

  const uploadVideo = async () => {
    try {
      const response = await fetch(videoURI);
      const blob = await response.blob();
      console.log("BLOB : ",blob)
      const storageRef = ref(storage, `videos/${lecture_name}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);
  
      const getURL = new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Observe progress
            console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error(error);
            reject(error);
          },
          () => {
            // Handle successful uploads and get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              resolve(downloadURL)
            });
          }
        )
      })
      getURL.then((URL)=>{
        if(!URL) return alert("Please Try Again Later")
        console.log("YE : ",URL)
        Upload_Video_To_Firebase(URL)
      })
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }

  async function Upload_Video_To_Firebase(video_URL){
    await axios.post(`${URL}/upload_lecture_video`,{
      video_URL: video_URL,
      lecture_name: lecture_name,
      class_id: params.class_id,
      subject_id: params.subject_id,
      chapter_id: params.chapter_id
    })
    .then((res)=>{
      res.status === 200 ? alert("Video Upload") : alert("Error in Uploading Video")
    })
  }
  
const Pick_Video = async()=>{
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
    quality: 1,
  })
  console.log(result.assets[0].uri)
  if (!result.canceled) {
    setVideoURI(result.assets[0].uri)
  }
}
  return (
    <View>
      <Text>Upload lecture videos here</Text>
      <TextInput placeholder='lecture name' onChangeText={(val)=>setLecture_name(val)}/>
      <Button title="Pick Video" onPress={Pick_Video} />
      {videoURI && <Button title="Upload Video" onPress={uploadVideo} />}
      {/* <Text>TO DO : PUT ADD LECTURE OPTION FOR TEACHER ONLY</Text> */}
      {/* Fetch all lectures here. Display ONLY lecture names, navigate to another screen for lecture video */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 320,
    height: 200,
  },
})