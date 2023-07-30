import React, { useEffect } from "react";
import { View, TouchableOpacity, Image, StyleSheet, SafeAreaView, Text , ImageBackground} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../colors";
import { Entypo } from "@expo/vector-icons";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons'; 
import Movies from "./Movies";


const Home = () => {
  const navigation = useNavigation();


  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };



  useEffect(() => {
    navigation.setOptions({
     
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),

    });
  }, [navigation]);

  return (
  <SafeAreaView style={styles.container}>
    <SafeAreaView>
      <Movies styles={styles.movies}/>
    </SafeAreaView>
     </SafeAreaView>

  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#000000",
  },

    movies: {
    width: "100%"
    },


 
});


