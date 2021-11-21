import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { TextInput, Text, View, TouchableOpacity, FlatList, Image, LogBox, Keyboard } from 'react-native'
import styles from './InChatStyles'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { db } from './firebase'
import { collection, serverTimestamp, onSnapshot, doc, addDoc, orderBy, query } from 'firebase/firestore'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

const Tab = createMaterialBottomTabNavigator();

export default function InChat({ route, navigation }) {

  const [msgs, setMsgs] = React.useState('')
  const [currentUser, setCurrentUser] = React.useState('aseer')
  const [userID, setUserID] = React.useState('')
  const [userList, setUserList] = React.useState([])
  const [readMsg, setReadMsgs] = React.useState([])

  const getMsgs = () => {
    try {
      const col = query(collection(db, "users", `${currentUser}-${route.params.user}`, "chats"), orderBy("timestamp", "desc"),)
      onSnapshot(col, (snap) => setReadMsgs(snap.docs.map(doc => doc.data())))
    } catch (err) {
      console.error("Error!! " + err)
    }
  }
  React.useEffect(() => {
    getMsgs()
    return () => {
      getMsgs()
    }
  }, [sendMsg])
  LogBox.ignoreLogs(['Setting a timer for a long period of time', 'Can\'t perform a React state update on an unmounted component'])

  const sendMsg = () => {
    try {
      const col = collection(db, "users", `${route.params.user}-${currentUser}`, "chats")
      addDoc(col, {
        msgs: msgs,
        msgBy: currentUser,
        timestamp: serverTimestamp(),
      })
      const col2 = collection(db, "users", `${currentUser}-${route.params.user}`, "chats")
      addDoc(col2, {
        msgs: msgs,
        msgBy: currentUser,
        timestamp: serverTimestamp(),
      })
      setMsgs('')
    } catch (err) {
      console.error(err)
    }
  }

  const [keyboardStatus, setKeyboardStatus] = React.useState(false);
  React.useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.InChatHeader}>
        <TouchableOpacity style={{ marginHorizontal: 80 }} onPress={() => navigation.goBack()}>
          <Image source={require('./assets/LeftArrow.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <FontAwesomeIcon icon={faUserCircle} size={26} style={{ marginHorizontal: 10 }} />
          <Text style={styles.userNameTitle}>{route.params.user}</Text>
        </View>
        <View style={{ marginHorizontal: 80 }}>
          <Image source={require('./assets/MenuVertical.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
        </View>
      </View>

      <FlatList style={{ marginBottom: 100 }} data={readMsg} keyExtractor={(item, idx) => idx} inverted={true} renderItem={({ item, index }) => {
        return (
          <View style={{
            alignItems: item.msgBy == currentUser ? 'flex-end' : 'flex-start',
            justifyContent: 'center', marginHorizontal: 20, marginVertical: 10
          }}
          >
            <Text style={[styles.textMsg, {
              borderBottomRightRadius: item.msgBy == currentUser ? 0 : 20,
              borderBottomLeftRadius: item.msgBy == currentUser ? 20 : 0
            }]} >
              {item.msgs}
            </Text>
          </View>
        )
      }} />

      <View style={{ position: 'absolute', top: keyboardStatus ? '80%' : '90%', right: 20, left: 10, backgroundColor: '#fff', bottom: 0 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', zIndex: 5 }}>
          <TextInput style={styles.msgInput} placeholder="Type your message..." value={msgs} onChangeText={(text) => setMsgs(text)} onSubmitEditing={() => sendMsg()} />
          <TouchableOpacity style={styles.payBg}>
            <Image source={require('./assets/Pay.png')} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style='auto' />
    </View>
  )
}
