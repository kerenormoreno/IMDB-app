import { View, ScrollView, StyleSheet, SafeAreaView, Text } from "react-native";
import { useState, useEffect } from "react";
import { fetchMovies } from "../Api/index";
import { TextInput } from "react-native-paper";
import { Feather } from '@expo/vector-icons'; 
import { TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";
import MovieCard from "./MovieCard";
import { auth } from "../config/firebase";
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';



export default function Movies() {

  const navigation = useNavigation();
// פונקציית יציאה
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10, }}
          onPress={onSignOut} >
          <AntDesign name="logout" size={24} color={colors.gray}  style={{ marginRight: 10 }}  />
        </TouchableOpacity>
      ),

    });
  }, [navigation]);
 
  const [movies, setMovies] = useState([])
  const [showSearch, toogleSearch] = useState(false);
  const [searchMovie, setSearchMovie] = useState("Sunshine");

  const handleSearch = (value) => {
    console.log("value: ", value);
    // fetch locations
    getMovies();
    toogleSearch(!showSearch);
  };

  const getMovies = async () => {
    setMovies(await fetchMovies(searchMovie));
    setSearchMovie("");
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {Object.keys(movies).length > 0 && (
        <View>
          
          <View style={{flexDirection:"row",alignSelf: "flex-start"}}>
            
          <TouchableOpacity
           onPress={() => navigation.navigate("MyFavoriteScreen")}
           style={styles.Button}>
          <FontAwesome5 name="hand-holding-heart" size={24} color="black" />        
       </TouchableOpacity>

      <TouchableOpacity
        onPress={() => toogleSearch(!showSearch)}
        style={styles.Button}
      >
      <Ionicons name="ios-search-circle" size={24} color="black" />     
      </TouchableOpacity>

          {showSearch ? <TextInput 
          style={{
                textAlign: "right" ,
                fontSize: 12 ,
                backgroundColor: showSearch
                  ? "#fff"
                  : "transparent",
                  width: '62%' ,
              }}
            placeholder="Search your movie&series "
            value={searchMovie}
            onChangeText={(text) => setSearchMovie(text)}
            left={<TextInput.Icon name="magnify" />}
            onSubmitEditing={handleSearch}
          /> : null}
          </View> 

          

          <ScrollView>
            {movies && movies.Search.map((movie, i) => (
              <MovieCard movie={movie} key={i}  />
            ))}
          </ScrollView>
        </View>
      )}
     </SafeAreaView>

  );
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
    color: "#fff",

  },
  Button: {
    backgroundColor: colors.primary ,
    height: 50,
    width: 50,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary ,
    marginRight: 20,
    marginTop: 10
  },
})

