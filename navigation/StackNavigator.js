import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import NoteScreen from "../screens/NoteScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="stack"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="stack" component={TabNavigator} />
            <Stack.Screen name="NoteScreen" component={NoteScreen} />
        </Stack.Navigator>
    );
};

export default StackNavigator;
