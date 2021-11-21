import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { TextInput, Text, View, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { createStackNavigator } from '@react-navigation/stack'
import styles from './styles/OTPStyles'
import axios from 'axios'

const Stack = createStackNavigator()

export default function OTP({ navigation }) {
  const [selectedUser, setSelectedUser] = React.useState(true)
  const [selectedBusiness, setSelectedBusiness] = React.useState(false)
  const codeRef = React.useRef()
  const phnRef = React.useRef()
  const [codeNum, setCodeNum] = React.useState('')
  const [phnNumber, setPhnNumber] = React.useState('')
  const [selectedItem, setSelectedItem] = React.useState('Java');
  const pickerRef = React.useRef();
  const [popupVisible, setPopupVisible] = React.useState(false);
  const [verifyCode, setVerifyCode] = React.useState('')

  const link = 'http://192.168.162.222:3001'

  const codeNumFunc = (text) => {
    setCodeNum(text)
    if (text.length >= 3) {
      phnRef.current.focus()
    }
  }
  const phnNumFunc = (text) => {
    setPhnNumber(text)
    if (text.length == 0) {
      codeRef.current.focus()
    }
  }
  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  const codeVerification = async () => {
    if (phnNumber == '') {
      alert('Please put a phone number')
      return null
    }
    const number = { phnNumber }
    const apiTest = await axios.post(`${link}/checkverify`, number)
    console.log(apiTest.data)
  }
  const checkToken = async () => {
    if (verifyCode == '') {
      return null
    }
    const code = { verifyCode, phnNumber }
    const apiTest = await axios.post(`${link}/checktoken`, code)
    if (apiTest.data == 'approved') {
      navigation.navigate('Home')
    } else {
      alert('Error Occured! Please try again.')
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Text style={styles.title}>connect.</Text>
        <Text style={[styles.text, styles.boldTitle]}>Welcome</Text>
        <Text style={styles.miniText}>Enter your mobile number to continue</Text>
        <View>
          <View style={styles.userOptions}>
            <TouchableOpacity style={selectedUser ? styles.options : styles.nOptions} onPress={() => {
              !selectedUser && setSelectedUser(!selectedUser)
              setSelectedBusiness(false)
            }}>
              <Text style={[styles.userOptionsText, { color: selectedUser ? "#fff" : "#000" }]}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={selectedBusiness ? styles.options : styles.nOptions} onPress={() => {
              !selectedBusiness && setSelectedBusiness(!selectedBusiness)
              setSelectedUser(false)
            }}>
              <Text style={[styles.userOptionsText, { color: selectedBusiness ? "#fff" : "#000" }]}>Business</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.phnNumberInput}>
          {/* <TextInput placeholder="Code" keyboardType="numeric" value={codeNum} onChangeText={codeNumFunc} ref={codeRef} style={[styles.inputStyle, { width: 60, marginRight: 20 }]} /> */}
          <Picker
            ref={pickerRef}
            selectedValue={selectedItem}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedItem(itemValue)
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>

          <TextInput placeholder="Mobile No." keyboardType="numeric" value={phnNumber} onChangeText={phnNumFunc} ref={phnRef} style={[styles.inputStyle, { width: 240 }]} />
        </View>
      </View>
      <Modal transparent={true} visible={popupVisible} animationType="slide" onRequestClose={() => setPopupVisible(false)}>
        <View style={styles.popup}>
          <Text style={[styles.text, { fontSize: 16, textAlign: 'center' }]}>Verifying phone number</Text>
          <Text style={[styles.text, { color: '#878787', fontSize: 16, textAlign: 'center', width: '70%' }]}>{`Waiting to automatically detect an SMS sent to ${phnNumber}. Wrong Number?`}</Text>
          <View style={styles.whitepart}>
            <View style={{ flexDirection: 'row' }}>
              <TextInput style={styles.codeInput} type="text" maxLength={6} onChangeText={(text) => {
                setVerifyCode(text)
                if (text == '' || text.length <= 0) setPopupVisible(false)
              }} onSubmitEditing={checkToken} />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={() => {
          setPopupVisible(true)
          codeVerification()
        }
        }>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style='auto' />
    </KeyboardAvoidingView>
  )
}
