import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { userContext } from '../../components/MyContext'

export default function index() {

  const { user,setUser } = useContext(userContext)

  console.log("This is the user : ",user)

  return (
    <View>
      <Text>Main Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({})