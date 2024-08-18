import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react'


const userContext = createContext()

export default function MyContext({ children }) {
    

  const [user,setUser] = useState({
    student_id: '19292',
    student_class: '8',
    student_section: 'A',
    student_name: 'Yashwant',
    user_role: 'teacher'
  })

  return (
    <userContext.Provider value={{ user, setUser }}>
        {children}
    </userContext.Provider>
  )
}

export { userContext }