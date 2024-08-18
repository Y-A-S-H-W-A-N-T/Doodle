import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { storage, getDownloadURL, ref, uploadBytesResumable } from '../Firebase/config'
import axios from 'axios'
import { Video } from 'expo-av';
import { useLocalSearchParams } from 'expo-router'

export default function chapter_lectures() {
  
  const params = useLocalSearchParams()

  return (
    <View>
      <View style={styles.container}>
          <View style={styles.video}>
            <Video
              source={{ uri: params.video }}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="cover"
              shouldPlay
              useNativeControls
              style={styles.video}
            />
          </View>
      </View>
      <Text>Enter into full screen</Text>
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
    width: 350,
    height: 500,
    marginTop: 200
  },
})