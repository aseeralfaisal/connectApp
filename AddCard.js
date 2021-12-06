import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { TextInput, Text, View, TouchableOpacity, Modal, KeyboardAvoidingView, Image } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { createStackNavigator } from '@react-navigation/stack'
import styles from './styles/HomeStyles'
import axios from 'axios'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

const Tab = createMaterialBottomTabNavigator();

export default function AddCard({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Add Card</Text>
        <FontAwesomeIcon icon={faUserCircle} size={32} style={{ marginHorizontal: 15 }} />
      </View>
      <View>
        <TouchableOpacity style={{ marginLeft: 60 }} activeOpacity={0.7}>
          <Image source={require('./assets/icons/Plus.png')} style={{ height: 35, width: 35 }} />
        </TouchableOpacity>
      </View>
      <StatusBar style='auto' />
    </View>
  )
}
