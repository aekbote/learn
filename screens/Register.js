import React, { Component } from "react";
import { StyleSheet, View, Image,Text, TextInput, TouchableOpacity, Alert, SafeAreaView, StatusBar } from "react-native";
import firebase from "firebase";
import * as Font from "expo-font";
import { RFValue } from "react-native-responsive-fontsize";

//import * as SplashScreen from 'expo-splash-screen';
//SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

const appIcon = require("../assets/logo.png");

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state={
          fontsLoaded: false,
          email: '',
          password: '',
          first_name:'',
          last_name: '',
          confirmPassword: '',
          
        }
    }
    
      async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
      }

      registerUser = (first_name, last_name, email, password, confirmPassword) => {
            if(password==confirmPassword){
                firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    Alert.alert("User is Registered!");
                    this.props.navigation.replace("Login");
                     firebase.database()
                     .ref("/users/" + userCredential.user.uid) 
                    .set(
                      { email: userCredential.user.email,
                         first_name: first_name, 
                         last_name: last_name, 
                         current_theme: "light" }
                    )
                })
                .catch(error => {
                    Alert.alert(error.message);
                });
            }else{
            Alert.alert("The password put in doesn't match!") }
          
         
        };

        render() {
            //if (this.state.fontsLoaded) {
              //SplashScreen.hideAsync();
              const {email, password, confirmPassword, first_name, last_name} = this.state;
        
              return (
                  <View style={styles.container}>
                      <SafeAreaView style={styles.droidSafeArea}/>
                    <Text style={styles.appTitleText}>Register</Text>  
        
                    <TextInput
                      style={styles.textinput}
                      onChangeText={(text) => this.setState({first_name: text})}
                      placeholder={"Enter first Name"}
                      placeholderTextColor={"#FFFFFF"}
                    />   
                    <TextInput
                      style={styles.textinput}
                      onChangeText={(text) => this.setState({last_name: text})}
                      placeholder={"Enter Last Name"}
                      placeholderTextColor={"#FFFFFF"}
                    />  

                    <TextInput
                      style={styles.textinput}
                      onChangeText={(text) => this.setState({email: text})}
                      placeholder={"Enter Email"}
                      placeholderTextColor={"#FFFFFF"}
                    />   

                    <TextInput
                      style={styles.textinput}
                      onChangeText={(text) => this.setState({password: text})}
                      placeholder={"Enter Password"}
                      placeholderTextColor={"#FFFFFF"}
                    />   
                    <TextInput
                      style={styles.textinput}
                      onChangeText={(text) => this.setState({confirmPassword: text})}
                      placeholder={"Confirm Password"}
                      placeholderTextColor={"#FFFFFF"}
                    />

                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.registerUser(first_name, last_name, email, password, confirmPassword)}
                    ><Text>Register</Text></TouchableOpacity>
                    
                    <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate("LoginScreen")}
                    ><Text>Login</Text></TouchableOpacity>
        
                  </View>
               
               
              )
            //}
          }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#000000",
      alignItems: "center",
      justifyContent: "center"
  },
  droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appIcon: {
      width: RFValue(200),
      height: RFValue(200),
      resizeMode: "contain",
      marginBottom: RFValue(20)
  },
  appTitleText: {
      color: "white",
      textAlign: "center",
      fontSize: RFValue(40),
      marginBottom: RFValue(20)
  },
  textinput: {
      width: RFValue(250),
      height: RFValue(40),
      padding: RFValue(10),
      marginTop: RFValue(10),
      borderColor: "#FFFFFF",
      borderWidth: RFValue(4),
      borderRadius: RFValue(10),
      fontSize: RFValue(15),
      color: "#FFFFFF",
      backgroundColor: "#000000"
  },
  button: {
      width: RFValue(250),
      height: RFValue(50),
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      borderRadius: RFValue(30),
      backgroundColor: "white",
      marginBottom: RFValue(20)
  },
  buttonText: {
      fontSize: RFValue(24),
      color: "#000000"
  },
  buttonTextNewUser: {
      fontSize: RFValue(12),
      color: "#FFFFFF",
      textDecorationLine: 'underline'
  }
});