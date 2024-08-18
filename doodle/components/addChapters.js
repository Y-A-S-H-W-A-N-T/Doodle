import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import * as Linking from 'expo-linking';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';
import { storage, ref, uploadBytesResumable, getDownloadURL } from '../Firebase/config';
import axios from 'axios';

export default function addChapter({ class_id, subject_name, openModal }) {

    const [chapter_name,setChapter_name] = useState()

    const URL = 'http://192.168.29.130:8000'

    async function ADD_CHAPTER() {
        await axios.post(`${URL}/addChapter`,{ class_id: class_id, subject_name: subject_name, chapter_name: chapter_name })
        .then((res)=>{
          res.status === 200 ? openModal(false) : alert("Error Adding Subjects")
        })
    }

    return (
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={() => openModal(false)} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>x</Text>
                </TouchableOpacity>
                <TextInput placeholder='Chapter' style={styles.input} onChangeText={(val)=>setChapter_name(val)}/>
                <Text onPress={ADD_CHAPTER} >ADD 📤</Text>
            </View>
        </View>
    );
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
});
