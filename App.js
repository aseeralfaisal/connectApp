import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import StartupStack from './StartupStack'
import OTP from './OTP'
import Home from './Home'
import TabScreen from './TabScreen'

const Stack = createStackNavigator()

export default function App() {
  const [ready, isReady] = React.useState(false)
  let [fontsLoaded] = useFonts({
    Comfortaa_Regular: require('./assets/fonts/Comfortaa-Regular.ttf'),
    Comfortaa_Medium: require('./assets/fonts/Comfortaa-Medium.ttf'),
    Comfortaa_Bold: require('./assets/fonts/Comfortaa-Bold.ttf'),
    Helvetica_Neue_ME: require('./assets/fonts/Helvetica-Neue-Medium-Extended.ttf'),
    'Montserrat-Regular': require('./assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('./assets/fonts/Montserrat/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('./assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
    'Montserrat-ExtraBold': require('./assets/fonts/Montserrat/Montserrat-ExtraBold.ttf'),
  })

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          // initialRouteName="TabScreen"
        >
          {/* <Stack.Screen name='StartupStack' component={StartupStack} /> */}
          {/* <Stack.Screen name='OTP' component={OTP} /> */}
          <Stack.Screen name='TabScreen' component={TabScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 40,
    fontWeight: '100',
  },
})
