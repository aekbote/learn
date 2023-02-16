import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    TouchableOpacity,
    StatusBar,
    Image,
    ScrollView
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import firebase from "firebase";


export default class NoteScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
           light_theme: true,
           is_liked: false,
           likes: this.props.route.params.value.likes,
        };
    }

    componentDidMount() {
        this.fetchUser();
    }

    fetchUser = () => {
        let theme;
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", (snapshot) => {
                theme = snapshot.val().current_theme
                this.setState({light_theme: theme === "light"})
            })
    }

 
    likeAction = () => {
        if(this.state.is_liked)
        { firebase.database() .ref('notes') .child(this.props.route.params.key) .child('likes') .set(firebase.database.ServerValue.increment(-1)) 
        this.setState({likes: this.state.likes-=1 , is_liked:false}) } 
        else{ firebase.database() 
          .ref('notes') 
        .child(this.props.route.params.key) .child('likes') .set(firebase.database.ServerValue.increment(1)) 
        this.setState({likes: this.state.likes+=1 , is_liked:true}) }};



    render() {
        //let note=this.state.note_data;
        let images = {
            image_1: require("../assets/mathLogo.png"),
            image_2: require("../assets/scienceLogo.png"),
        };
        if (!this.props.route.params.value) {
            return 
            this.props.navigation.navigate("Notes");
        } else {
            return (
                
                <View style={this.state.light_theme ? 
                styles.containerLight : styles.container}>
                    <SafeAreaView style={styles.droidSafeArea} />
                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image
                                source={require("../assets/logo.png")}
                                style={styles.iconImage}
                            ></Image>
                        </View>
                        <View style={styles.appTitleTextContainer}>
                            <Text style={this.state.light_theme ?
                            styles.appTitleTextLight : styles.appTitleText}>LearnNotes</Text>
                        </View>
                    </View>
                    <View style={styles.noteContainer}>
                        <ScrollView style={this.state.light_theme ? 
                styles.noteCardLight : styles.noteCard}>
                            <View style={styles.authorContainer}>
                                <View style={styles.authorNameContainer}>
                                    <Text style={this.state.light_theme ? 
                styles.authorNameTextLight : styles.authorNameText}>{this.props.route.params.value.author}</Text>
                                </View>
                            </View>
                            <Image 
                    source={images[this.props.route.params.value.preview_image]} 
                    style={styles.noteImage} />
                            <View style={styles.titleContainer}>
                                <Text style={this.state.light_theme ? 
                styles.titleTextLight : styles.titleText}>
                                    {this.props.route.params.value.title}
                                </Text>
                            </View>
                            <View style={styles.descriptionContainer}>
                                <Text style={this.state.light_theme ? 
                styles.titleTextLight : styles.titleText}>
                                    {this.props.route.params.value.note}
                                </Text>
                            </View>
                            <View style={styles.actionContainer}>
                            <TouchableOpacity
                style={
                  this.state.is_liked
                    ? styles.likeButtonLiked
                    : styles.likeButtonDisliked
                }
                onPress={() => this.likeAction()}
              >
                <Ionicons
                  name={"heart"}
                  size={RFValue(30)}
                  color={this.state.light_theme ? "black" : "white"}
                />

                <Text
                  style={
                    this.state.light_theme
                      ? styles.likeTextLight
                      : styles.likeText
                  }
                >
                  {this.state.likes}
                </Text>
              </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    containerLight:{
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
        fontSize: RFValue(28)
    },
    noteContainer: {
        flex: 1
    },
    noteCard: {
        margin: RFValue(20),
        backgroundColor: "#2a2a2a",
        borderRadius: RFValue(20)
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: RFValue(10)
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        flexDirection: "row",
        backgroundColor: "#eb3948",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(30)
    },
    likeText: {
        color: "white",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    },
    authorContainer: {
        height: RFPercentage(10),
        padding: RFValue(10),
        flexDirection: "row"
    },
    authorImageContainer: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    profileImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        borderRadius: RFValue(100)
    },
    authorNameContainer: {
        flex: 0.85,
        padding: RFValue(10),
        justifyContent: "center"
    },
    authorNameText: {
        color: "white",
        fontSize: RFValue(20)
    },
    noteImage: {
        width: "100%",
        alignSelf: "center",
        height: RFValue(200),
        borderTopLeftRadius: RFValue(20),
        borderTopRightRadius: RFValue(20),
        resizeMode: "contain"
    },
    titleContainer: {
        padding: RFValue(10)
    },
    titleText: {
        fontSize: 13,
        color: "white",
        paddingTop: RFValue(10)
    },
    titleTextLight: {
        fontSize: 13,
        color: "black",
        paddingTop: RFValue(10)
    },
    noteCardLight: {
        margin: RFValue(20),
        backgroundColor: "#eaeaea",
        borderRadius: RFValue(20)
    },
    authorNameTextLight: {
        color: "black",
        fontSize: RFValue(20)
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        flexDirection: "row",
        backgroundColor: "#eb3948",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(30)
      },
      likeText: {
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
      },
      likeTextLight: {
        fontFamily: "Bubblegum-Sans",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
      },
      likeButtonLiked: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#eb3948",
        borderRadius: RFValue(30)
      },
      likeButtonDisliked: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#eb3948",
        borderWidth: 2,
        borderRadius: RFValue(30)
      },
   
});