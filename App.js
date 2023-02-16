import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";


import Login from "./screens/Login";
import Register from "./screens/Register";
import { createStackNavigator } from "@react-navigation/stack";

import DrawerNavigator from "./navigation/DrawerNavigator";

import firebase from "firebase";
import { firebaseConfig } from "./config";


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Stack = createStackNavigator();

const StackNav = () => {
return(
  <Stack.Navigator initialRouteName="Login" screenOptions={{
    headerShown: false,
    gestureShown: false,
  }}>
    <Stack.Screen name ="Login" component={Login}/>
    <Stack.Screen name ="Register" component={Register}/>
    <Stack.Screen name ="NoteScreen" component={DrawerNavigator}/>

  </Stack.Navigator>)
}

export default function App(){
  return(
    <NavigationContainer>
      <StackNav/>
    </NavigationContainer>
  )
}