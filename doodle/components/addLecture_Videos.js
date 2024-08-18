import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { storage, getDownloadURL, ref, uploadBytesResumable } from '../Firebase/config'
import axios from 'axios'
import { useLocalSearchParams } from 'expo-router'

export default function chapter_lectures({ openModal }) {

  const params = useLocalSearchParams()

  console.log("chapter lectures : ",params)
  
  const [videoURI,setVideoURI] = useState()
  const [lecture_name,setLecture_name] = useState()
  const [loading,setLoading] = useState(0)

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
            setLoading(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100))
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
        if (res.status === 200){
            alert("Video Uploaded")
            openModal(false)
        }
        else{
            alert("Error in Uploading Video, Try again Later")
            openModal(false)
        }
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
    <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
            <TouchableOpacity onPress={() => openModal(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>x</Text>
            </TouchableOpacity>
            <View>
                <Text>Upload lecture videos here</Text>
                <TextInput placeholder='lecture name' style={styles.input} onChangeText={(val)=>setLecture_name(val)}/>
                <Button title="Pick Video" onPress={Pick_Video} style={styles.filePicker}/>
                {videoURI && <Button title="Upload Video" onPress={uploadVideo} />}
                {loading?<Text>{loading}</Text> : ''}
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    modalOverlay: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
    },
    modalContainer: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 10,
        alignItems: 'center',
        marginTop: 300,
        height: 300
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        fontSize: 18,
        color: 'red',
    },
    input: {
        borderBottomWidth: 1,
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    filePicker: {
        fontSize: 24,
        marginVertical: 10,
    },
    uploadText: {
        fontSize: 18,
        color: 'blue',
        marginVertical: 10,
    },
})