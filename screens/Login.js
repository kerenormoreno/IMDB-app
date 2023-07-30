import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import colors from "../colors";
const backImage = require("../assets/IMDb-Logo.png");



export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Loged in successfully!"))
        .catch((err) => Alert.alert("Error in login", err.message));
    }
  };

  return (
    <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Login</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ fontWeight: "bold", color: "#000000", fontSize: 18 }}>
            Log In
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
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: colors.primary , fontWeight: "600", fontSize: 14 }}>
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
            Forgow Password?
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ForgotPassword", { userEmail: "Your Name" })
            }
          >
            <Text style={{ color: colors.primary , fontWeight: "600", fontSize: 14 }}>
              {" "}
              Click here
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
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});