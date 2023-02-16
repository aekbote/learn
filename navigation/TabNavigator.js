import React, {Component} from 'react';
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

import Notes from "../screens/Notes";
import CreateNotes from "../screens/CreateNotes";

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends Component{
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true,
            isUpdated: false,
        }
    }

    renderNote = props => {
        return <Notes setUpdateToFalse={this.removeUpdated} {...props} />;
      };
    
      renderNotes = props => {
        return <CreateNotes setUpdateToTrue={this.changeUpdated} {...props} />;
      };
    
      changeUpdated = () => {
        this.setState({ isUpdated: true });
      };
    
      removeUpdated = () => {
        this.setState({ isUpdated: false });
      };

    componentDidMount() {
        let theme;
        firebase
        .database()
        .ref("/users/"  + firebase.auth().currentUser.uid)
        .on("value", function (snapshot) {
            theme = snapshot.val().current_theme
        })
        this.setState({ light_theme: theme === "light" ? true : false})
    }

    render(){
        return(
            <Tab.Navigator
            labeled={false}
                barStyle={styles.bottomTabStyle}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === "Notes") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "CreateNotes") {
                            iconName = focused ? "add-circle" : "add-circle-outline";
                        }
                        return (
                            <Ionicons
                                name={iconName}
                                size={RFValue(25)}
                                color={color}
                                style={styles.icons}
                            />
                        );
                    }
                })}
                activeColor={"#49eee6"}
                inactiveColor={"gray"}
            >
                 <Tab.Screen
          name="Notes"
          component={this.renderNote}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="CreateNotes"
          component={this.renderNotes}
          options={{ unmountOnBlur: true }}
        />
            </Tab.Navigator>
        )
    }
    
}

const styles = StyleSheet.create({
    bottomTabStyle: {
        backgroundColor: "#2a2a2a",
        height: "8%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
        position: "absolute"
    },
    bottomTabStyle: {
        backgroundColor: "#ee8249",
        height: "8%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
        position: "absolute"
    },
    icons: {
        width: RFValue(30),
        height: RFValue(30)
    }
});