import React from 'react'
import { View, KeyboardAvoidingView, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import ChatStack from './ChatStack';

const Tab = createBottomTabNavigator();

export default function TabScreen({ navigation }) {


  return (
    <>
      <Tab.Navigator
        barStyle={{
          backgroundColor: '#fff',
          shadowOffset: { width: 0, height: 2, },
          shadowColor: '#1d1d1d',
          shadowOpacity: 1,
          shadowRadius: 7,
        }}
      >
        <Tab.Screen
          name='Home'
          component={Home}
          options={{
            tabBarLabel: 'Home',
            headerShown: false,
            tabBarActiveTintColor: '#0f5dd1',
            tabBarInactiveTintColor: '#000',
            tabBarIcon: ({ color }) => (
              <Image
                source={require('./assets/icons/Home.png')}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: color
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Transfer'
          component={Home}
          options={{
            tabBarLabel: 'Transfer',
            headerShown: false,
            tabBarActiveTintColor: '#00AEEF',
            tabBarInactiveTintColor: '#000',
            tabBarIcon: ({ color }) => (
              <Image
                source={require('./assets/icons/DataTransfer.png')}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: color
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name='Services'
          component={Home}
          options={{
            tabBarLabel: 'Transfer',
            headerShown: false,
            tabBarActiveTintColor: '#00AEEF',
            tabBarInactiveTintColor: '#000',
            tabBarIcon: ({ color }) => (
              <Image
                source={require('./assets/icons/Services.png')}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: color
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name='ChatStack'
          component={ChatStack}
          options={{
            tabBarLabel: 'Chat',
            headerShown: false,
            tabBarActiveTintColor: '#00AEEF',
            tabBarInactiveTintColor: '#000',
            tabBarIcon: ({ color }) => (
              <Image
                source={require('./assets/icons/Chat.png')}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: color
                }}
              />
            ),
          }}
        />
        <Tab.Screen
          name='More'
          component={Home}
          options={{
            tabBarLabel: 'More',
            headerShown: false,
            tabBarActiveTintColor: '#00AEEF',
            tabBarInactiveTintColor: '#000',
            tabBarIcon: ({ color }) => (
              <Image
                source={require('./assets/icons/More.png')}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: color
                }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>

  )
}
