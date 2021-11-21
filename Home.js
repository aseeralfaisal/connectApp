import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { TextInput, Text, View, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { createStackNavigator } from '@react-navigation/stack'
import styles from './styles/OTPStyles'
import axios from 'axios'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

export default function Home({ navigation }) {


  return (
    <View style={styles.container}>
        <Text style={styles.text}>Home</Text>
      <StatusBar style='auto' />
    </View>
  )
}
