import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class CreateNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "mathLogo",
      dropdownHeight: 40,
      name: "",
      caption: "",
      profile_image: "",
      author: "",
      title: "",

    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  async addNotes() {

    if (
        this.state.note && this.state.title
    ) {
        let noteData = {
            preview_image: this.state.previewImage,
            title: this.state.title,
            note: this.state.note,
            author: firebase.auth().currentUser.displayName,
            created_on: new Date(),
            author_uid: firebase.auth().currentUser.uid,
            //profile_image: this.state.profile_image,
            likes: 0
        };
        
        await firebase
            .database()
            .ref(
                "/notes/" +
                Math.random()
                    .toString(36)
                    .slice(2)
            )
            .set(noteData)
            .then(function (snapshot) { });
        this.props.setUpdateToTrue();
        this.props.navigation.navigate("Notes");
    } else {
        Alert.alert(
            "Error",
            "All fields are required!",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
        );
    }
}

async fetchUser() {
    let theme, name, image;
    await firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .on("value", function (snapshot) {
            theme = snapshot.val().current_theme;
            name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
            //image = snapshot.val().profile_picture;
        });
    this.setState({
        light_theme: theme === "light" ? true : false,
        name: name,
        //profile_image: image
    });
}

  render () {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      let preview_images = {
        image_1: require('../assets/mathLogo.png'),
        image_2: require('../assets/scienceLogo.png'),
      };

      return(
        <View style={this.state.light_theme ? styles.containerLight : styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={this.state.light_theme ? styles.appTitleTextLight: styles.appTitleText}>Create A Note</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
              <Image
                source={preview_images[this.state.previewImage]}
                style={styles.previewImage}></Image>
              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
              <DropDownPicker
                                items={[
                                  { label: "Image 1", value: "image_1" },
                                  { label: "Image 2", value: "image_2" },
                                ]}
                                defaultValue={this.state.previewImage}
                                containerStyle={{
                                    height: 40,
                                    borderRadius: 20,
                                    marginBottom: 10
                                }}
                                onOpen={() => {
                                    this.setState({ dropdownHeight: 170 });
                                }}
                                onClose={() => {
                                    this.setState({ dropdownHeight: 40 });
                                }}
                                style={{ backgroundColor: "transparent" }}
                                itemStyle={{
                                    justifyContent: "flex-start"
                                }}
                                dropDownStyle={{ backgroundColor: this.state.light_theme ? "#eee" : "#2a2a2a" }}
                                labelStyle={{
                                    color: this.state.light_theme ? "black" : "white"
                                }}
                                arrowStyle={{
                                    color: this.state.light_theme ? "black" : "white"
                                }}
                                onChangeItem={item =>
                                    this.setState({
                                        previewImage: item.value
                                    })
                                }
                            />
              </View>

              <TextInput
                style={this.state.light_theme ? styles.inputFontLight : styles.inputFont}
                onChangeText={(title) => this.setState({ title })}
                placeholder={'Title'}
                placeholderTextColor={this.state.light_theme ? "black" : "white"}
              />

              <TextInput
                style={[
                 this.state.light_theme ? styles.inputFontLight : styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(note) => this.setState({ note })}
                placeholder={'Notes'}
                multiline={true}
                numberOfLines={20}
                placeholderTextColor={this.state.light_theme ? "black" : "white"}
              />

              <Button
                onPress={()=>this.addNotes()}
                title="Submit Notes"
                />

            </ScrollView>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
          )
    }
   }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "black"
  },
  containerLight: {
      flex: 1,
      backgroundColor: "white"
  },
  droidSafeArea: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
      flex: 0.07,
      flexDirection: "row"
  },
  appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
  },
  iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
  },
  appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
  },
  appTitleText: {
      color: "white",
      fontSize: RFValue(28)
  },
  appTitleTextLight: {
      color: "black",
      fontSize: 28,
      paddingLeft: 20
  },
  fieldsContainer: {
      flex: 0.85
  },
  previewImage: {
      width: "93%",
      height: RFValue(250),
      alignSelf: "center",
      borderRadius: RFValue(10),
      marginVertical: RFValue(10),
      resizeMode: "contain"
  },
  inputFont: {
      height: RFValue(40),
      borderColor: "white",
      borderWidth: RFValue(1),
      borderRadius: RFValue(10),
      paddingLeft: RFValue(10),
      color: "white"
  },
  inputFontLight: {
      height: 40,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 10,
      color: "black"
  },
  submitButton: {
      marginTop: RFValue(20),
      alignItems: "center",
      justifyContent: "center"
  }
});