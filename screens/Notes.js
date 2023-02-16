import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
   
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import NoteCard from "./NoteCard";

import { FlatList } from "react-native-gesture-handler";


import firebase from "firebase";


export default class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true,
            notes: [],
        };
    }

    componentDidMount() {
        this.fetchNotes();
        this.fetchUser();
     }

    fetchNotes = () => {
        firebase
        .database()
        .ref("/notes/")
        .on(
            "value",
            snapshot => {
                let notes = [];
                if(snapshot.val()) {
                    Object.keys(snapshot.val()).forEach(function (key) {
                        notes.push({
                            key: key,
                            value: snapshot.val()[key]
                        });
                    });
                }
                this.setState({ notes: notes});
                this.props.setUpdateToFalse();
            },
            function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            }
        );
    };

    fetchUser = () => {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", snapshot => {
            theme = snapshot.val().current_theme;
            this.setState({ light_theme: theme === "light" });
          });
      };

    renderItem = ({ item: note }) => {
        return <NoteCard note={note} navigation={this.props.navigation} />;
    };

    keyExtractor = (item, index) => index.toString();

    render() {
        return (
            <View style={this.state.light_theme ? styles.containerLight : styles.container}>
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
                styles.appTitleTextLight : styles.appTitleText}>Learn Notes</Text>
                    </View>
                </View>
                {
                    !this.state.notes[0] ?
                        <View style={styles.noNotes}>
                            <Text style={this.state.light_theme ? styles.noNotesTextLight : styles.noNotesText}>No Notes Available</Text>
                        </View> :
                        <View style={styles.cardContainer}>
                            <FlatList
                                keyExtractor={this.keyExtractor}
                                data={this.state.notes}
                                renderItem={this.renderItem}
                            />
                        </View>
                }
            </View>
        );
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
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.8,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28),
    },
    appTitleTextLight: {
        color: "black",
        fontSize: RFValue(28),
    },
    cardContainer: {
        flex: 0.85
    }
});