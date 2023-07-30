import React, { useEffect } from "react";
import { View, TouchableOpacity, Image, StyleSheet, SafeAreaView, Text,Alert, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../colors";
import { Entypo } from "@expo/vector-icons";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const arieluni = require("../assets/arieluni.png");


const InfoScreen = () => {
  const navigation = useNavigation();

//פונקציה ליציאה
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };



 

  const handleToHome = () => {
    if (Platform.OS !== 'web') {
      Alert.alert(
        'לאישור',
        'רוצה להתחבר לדף הבית?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Continue',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } else {
      navigation.navigate('Home');
    }
  };

  return (    
    <SafeAreaView   style={styles.container}>
    <View>
    <View>

   
 <Image
            source={arieluni}
            style={{
              width: 200,
              height: 110,
              alignSelf: "center",
              marginTop: 20 ,
            }}
          />
    <View style={styles.box2}>
    <Text style={styles.text2}>About The App-{"\n"}
    In this application you can search for movies and series and add them to your favorites{"\n"}
     באפליקציה זו תוכל לחפש סרטים וסדרות ולהוסיף אותם למועדפים שלך 
      </Text>
      </View>
  </View>


  <View style={styles.box1}>
    <Text style={styles.text1}>Keren or moreno{"\n"}
    Kerenormoreno@gmail.com{"\n"}
    </Text>
  </View>
  
      </View>
      {/* signout */}
      <View style={{flexDirection: "row-reverse",alignSelf: 'center'}}>
      <TouchableOpacity
            style={styles.Button}
            onPress={onSignOut}
          >
            <MaterialCommunityIcons name="logout" size={24} color="black" />
          </TouchableOpacity>

          {/* homeScreen */}
          <TouchableOpacity
          onPress={handleToHome}
          style={styles.Button}
        >
          <Ionicons name="ios-home" size={24} color="black" />
        </TouchableOpacity>
        </View>
  
       </SafeAreaView>

  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
  },
 
  Button: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    marginTop: 20,
    alignSelf: 'center',
  },


  box1: {
    padding: 20,
    textAlign: 'center',
    backgroundColor:colors.gray,
    borderRadius: 50,
    height: 90,
    marginTop: 80
  },
 
  text1: {
    color: "#000000" ,
    fontSize: 15,
    textAlign: 'center',
  },

  box2: {
    marginTop: 20 ,
    padding: 20,
    textAlign: 'center',
    backgroundColor: colors.primary , 
    borderRadius: 30,    

  },

  text2: {
    color: "#000000" ,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

