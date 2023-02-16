import React, { Component } from "react";
import { StyleSheet, View, Image,Text, TextInput, Alert, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import firebase from "firebase";
import * as Font from "expo-font";
import { RFValue } from "react-native-responsive-fontsize";

//import * as SplashScreen from 'expo-splash-screen';
//SplashScreen.preventAutoHideAsync();

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

const appIcon = require("../assets/logo.png");

export default class LoginScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      fontsLoaded: false,
      email: '',
      password: '',
      isUserSignedIn: false,
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  signIn = async (email, password) => {
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      this.props.navigation.replace("NoteScreen");
    })
    .catch(error => {
      Alert.alert(error.message)
    })
  }

  render() {
      const {email, password} = this.state;
      return (
          <View style={styles.container}>
            <SafeAreaView style={styles.droidSafeArea}/>
            <Text style={styles.title}>Learn notes</Text>  
            <Image source={appIcon} style={styles.appIcon} />

            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({email: text})}
              placeHolder={"Email"}
              placeholderTextColor={"#FFFFFF"}
              autoFocus
            />   
            <TextInput
              style={styles.textinput}
              onChangeText={text => this.setState({password: text})}
              placeHolder={"Password"}
              placeholderTextColor={"#FFFFFF"}
              secureTextEntry
            />  
            <TouchableOpacity
              style={[styles.button, { marginTop: 20 }]}
              onPress={() => this.signIn(email,password)}
            >
              <Text style={styles.buttonText}>Login Button</Text>
           </TouchableOpacity>
            
            <TouchableOpacity
               onPress={() => this.props.navigation.navigate("Register")}
              ><Text style={styles.buttonTextNewUser}>Register Here if New User</Text>
            </TouchableOpacity>

          </View>
     
       
      )
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
      height: RFValue(50),
      padding: RFValue(10),
      borderColor: "#FFFFFF",
      borderWidth: RFValue(4),
      borderRadius: RFValue(10),
      fontSize: RFValue(20),
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