import { View, Text, ScrollView, StyleSheet,SafeAreaView } from 'react-native'
import { signOut } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity} from "react-native";
import { getDoc, doc, getFirestore } from 'firebase/firestore';
import { AuthenticatedUserContext } from '../Navigation';
import MovieCard from './MovieCard';
import { auth } from "../config/firebase";



export default function FavoriteScreen() {
  const navigation = useNavigation();

  const [movies, setMovies] = useState([]);

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

  const {user} = useContext(AuthenticatedUserContext)

  useEffect(() => {
    async function fetch() {
      const db = getFirestore();

      const docRef = await getDoc(doc(db, "users", user.uid));
      if (docRef.exists())
      {
        setMovies(docRef.data().liked)
      }
    }

    fetch();
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.Text}>Your Favorite Movies</Text>
      
        {movies.map((movie, index) => movie.Type === 'movie' && <MovieCard viewOnly movie={movie} key={index}/>)}
      
         <Text style={styles.Text}>Your Favorite Series</Text>
      
        {movies.map((movie, index) => movie.Type === 'series' && <MovieCard viewOnly movie={movie} key={index}/>)}
    
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "top",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  Text:{
    fontSize:30,
    textAlign:'center',
    marginBottom: 20,
    color: "#fff"

  },
  Button: {
    backgroundColor: '#deb887',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#deb890',
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
})

