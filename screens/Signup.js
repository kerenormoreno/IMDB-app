import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Text,
  View,
  Button,
  SafeAreaView,
  Alert,
  ScrollView
} from "react-native";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import colors from "../colors";
import { createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';


// import { collection, doc, setDoc ,  where, getDocs, collectionRef, orderBy } from "firebase/firestore"; 

const backImage = require("../assets/IMDb-Logo.png");




export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");




  

  const handleSignup = () => {
    if (email !== "" && password !== "" && firstName !== "" && lastName !== "") {
      createUserWithEmailAndPassword(auth, email, password)

        .then(userDetails => {
          const user = userDetails.user;

          updateProfile(user, {
            displayName: `${firstName} ${lastName}`,
            photoURL: null

          }).then(() => navigation.navigate('IntermediateScreen'))
        })
        .catch((err) => Alert.alert("Error in Signup", err.message));
    }
  };

  

  return (
    <View style={styles.container}>
                  <Image source={backImage} style={styles.backImage} />

      <View style={styles.whiteSheet} />
      

      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          autoCapitalize="words"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          autoCapitalize="words"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />



        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          autoFocus={true}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          autoCorrect={false}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
     
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={{ fontWeight: "bold", color: "#000000", fontSize: 18 }}>
            Sign Up
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
            Already have account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: colors.primary , fontWeight: "600", fontSize: 14 }}>
              {" "}
              Login
            </Text>
          </TouchableOpacity>
          
        </View>
      </SafeAreaView>        
    </View>
    
  );



  


}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#eeeee4",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },

  backImage: {
    width: "45%",
    height: 100,
    position: "absolute",
    top: 50 ,
    alignSelf : "center"
    // resizeMode: "cover",
  },


  inputDate: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    width: "100%"
  },


 

  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#000000",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    top: 180 ,
    // justifyContent: "center",
    marginHorizontal: 30,

  },
  button: {
    backgroundColor: colors.primary,
    height: 68,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
});