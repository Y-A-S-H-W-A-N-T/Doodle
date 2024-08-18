import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import * as Linking from 'expo-linking';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';
import { storage, ref, uploadBytesResumable, getDownloadURL } from '../Firebase/config';
import axios from 'axios';

export default function Syllabus_Modal({ openModal, class_id }) {

    const params = useLocalSearchParams();

    const [PDF, setPDF] = useState();
    const [PDF_URL, setPDF_URL] = useState();
    const [subject_name,setSubject_Name] = useState()

    const pickPDF = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
        });
        console.log("This is the PDF : ", result.assets[0].uri);
        setPDF(result);
    };

    const Upload = async () => {
        const { uri, name } = PDF;
        const response = await fetch(PDF.assets[0].uri).catch((err) => console.log(err, "UPLOAD ERROR"));
        const blob = await response.blob();
        console.log("This is the PDF blob : ", blob);
        const storageRef = ref(storage, `pdfs/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, blob);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Monitor progress, e.g., display upload progress
            },
            (error) => {
                console.error("Upload failed:", error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setPDF_URL(downloadURL);
                console.log("File available at:", downloadURL);
            }
        );
        Upload_To_Database()
    };

    const URL = 'http://192.168.29.130:8000';

    const Upload_To_Database = async () => {
        await axios.post(`${URL}/uploadSyllabus`,{ 
            PDF: PDF_URL,
            class_id: class_id,
            subject: subject_name
        })
        .then((res)=>{
            if(res.status === 200)
                openModal(false)
            else
                console.log("Error")
        })
        console.log("Pressed")
    };

    return (
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={() => openModal(false)} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>x</Text>
                </TouchableOpacity>
                <TextInput placeholder='Subject' style={styles.input} onChangeText={(val)=>setSubject_Name(val)}/>
                <Text onPress={pickPDF} style={styles.filePicker}>📂</Text>
                {PDF && (
                    <Text style={styles.uploadText}>
                        {PDF.assets[0].name}
                    </Text>
                )}
                <Text onPress={Upload} >UPLOAD 📤</Text>
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
