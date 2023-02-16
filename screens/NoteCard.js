import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

export default class NoteCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true,
            note_id: this.props.note.key,
            is_liked: false,
            likes: this.props.note.value.likes,
            note_data: this.props.note.value
        };
    }

    likeAction = () => {
        if(this.state.is_liked)
        { firebase.database() .ref('notes') .child(this.state.note_id) .child('likes') .set(firebase.database.ServerValue.increment(-1)) 
        this.setState({likes: this.state.likes-=1 , is_liked:false}) } 
        else{ firebase.database() 
          .ref('notes') 
        .child(this.state.note_id) .child('likes') .set(firebase.database.ServerValue.increment(1)) 
        this.setState({likes: this.state.likes+=1 , is_liked:true}) }};

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

    componentDidMount() { 
        this.fetchUser();
    }

    render() {
        let note=this.state.note_data;
        let images = {
            image_1: require("../assets/mathLogo.png"),
            image_2: require("../assets/scienceLogo.png"),
           
        };
        return (
            <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate("NoteScreen", note = this.props.note)}>
                <View style={this.state.light_theme ? styles.cardContainerLight : styles.cardContainer
                }>
                    <View style={styles.authorContainer}>
                        <View style={styles.authorImageContainer}>
                            
                        </View>
                        <View style={styles.authorNameContainer}>
                            <Text style={this.state.light_theme ? styles.authorNameTextLight : styles.authorNameText}>{note.author}</Text>
                        </View>
                    </View>
                
                    <Image source={images[note.preview_image]} style={styles.noteImage} />
                    <View style={styles.captionContainer}>
                        <Text style={this.state.light_theme ? styles.captionTextLight : styles.captionText}>
                            {note.title}
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
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardContainer: {
        margin: RFValue(13),
        backgroundColor: "#2a2a2a",
        borderRadius: RFValue(20),
        padding: RFValue(20)
    },
    cardContainerLight: {
        margin: RFValue(13),
        backgroundColor: "#FFFFFF",
        borderRadius: RFValue(20),
        padding: RFValue(20)
    },
    authorContainer: {
        flex: 0.1,
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
        justifyContent: "center"
    },
    authorNameText: {
        color: "white",
        fontSize: RFValue(20)
    },
    authorNameTextLight: {
        color: "black",
        fontSize: RFValue(20)
    },
    noteImage: {
        marginTop: RFValue(20),
        resizeMode: "contain",
        width: "100%",
        alignSelf: "center",
        height: RFValue(275)
    },
    captionContainer: {},
    captionTextLight: {
        fontSize: 13,
        color: "black",
        paddingTop: RFValue(10)
    },
    captionText: {
        fontSize: 13,
        color: "white",
        paddingTop: RFValue(10)
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10)
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
      likeText: {
        color: "white",
        fontFamily: "Bubblegum-Sans",
        fontSize: 25,
        marginLeft: 25,
        marginTop: 6
      },
      likeTextLight: {
        fontFamily: "Bubblegum-Sans",
        fontSize: 25,
        marginLeft: 25,
        marginTop: 6
      }
});