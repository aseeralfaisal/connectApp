import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { TextInput, Text, View, TouchableOpacity, Button, Image } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { createStackNavigator } from '@react-navigation/stack'
import styles from './ChatStyles'
import axios from 'axios'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { collection, addDoc, doc, onSnapshot, getDocs } from "firebase/firestore"
import { db } from './firebase'

const Tab = createMaterialBottomTabNavigator();

export default function Chat({ navigation }) {

  const [msgs, setMsgs] = React.useState('')

  const sendMsg = async () => {
    const msg = await addDoc(collection(db, 'chats'), {
      msgs: msgs
    })
  }

  React.useEffect(() => {
    (async () => {
      const unsub = collection(db, "chats")
      const items = await getDocs(unsub)
      items.docs.map(item => {
        console.log(item.data().msgs)
      })
    })()
  })

  return (
    <View style={styles.container}>
      <View style={styles.chatHeader}>
        <Text style={styles.title}>Chat</Text>
        <Image source={require('./assets/Plus.png')} style={{ height: 35, width: 35 }} />
      </View>
      <View style={styles.whitepart}>
        <TextInput placeholder="text" onChangeText={(text) => setMsgs(text)} onSubmitEditing={sendMsg} />
      </View>
      <StatusBar style='auto' />
    </View>
  )
}
