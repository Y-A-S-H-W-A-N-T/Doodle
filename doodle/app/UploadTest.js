import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

export default function UploadTest() {

  const [question,setQuestion] = useState()
  const [testName,setTestName] = useState()
  
  const [testQuestions,setTestQuestions] = useState([])
  
  const setTest = ()=>{
    setTestQuestions((prev)=>[...prev,question])
  }  
  const [addQuestion,setAddQuestion] = useState(false)
  return (
    <View>
      <TextInput placeholder='Test name' onChangeText={(val)=>setTestName(val)}/>
      <View>
        <Text onPress={()=>setAddQuestion(!addQuestion)}>ADD Question ➕</Text>
      </View>
      {addQuestion && <View>
        <TextInput placeholder='Question' onChangeText={(val)=>setQuestion((prev)=>({...prev,question: val}))}/>
        <View  style={{flexDirection: 'row'}}>
          <Text>option 1</Text><TextInput placeholder='Option' onChangeText={(val)=>setQuestion((prev)=>({...prev,opt1: val}))}/>
        </View>
        <View  style={{flexDirection: 'row'}}>
          <Text >option 2</Text><TextInput placeholder='Option' onChangeText={(val)=>setQuestion((prev)=>({...prev,opt2: val}))}/>
        </View>
        <View  style={{flexDirection: 'row'}}>
          <Text >option 3</Text><TextInput placeholder='Option' onChangeText={(val)=>setQuestion((prev)=>({...prev,opt3: val}))}/>
        </View>
        <View  style={{flexDirection: 'row'}}>
          <Text >option 4 (Correct Answer)</Text><TextInput placeholder='Option' onChangeText={(val)=>setQuestion((prev)=>({...prev,answer: val}))}/>
        </View>
        <Button title='Add' onPress={setTest}/>
      </View>}
      <Text>Take Help From AI</Text>
      <View>
        <FlatList
          style={{marginBottom: 250}}
          data={testQuestions}
          key={()=>Math.random()}
          renderItem={({ item })=>(
            <View>
              <View style={{borderColor: 'black', elevation: 5, padding: 10}}>
                <Text>{item.question}</Text>
                <Text>⏺️{item.opt1}</Text>
                <Text>⏺️{item.opt2}</Text>
                <Text>⏺️{item.opt3}</Text>
                <Text style={{backgroundColor: 'lime'}}>⏺️{item.answer}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})