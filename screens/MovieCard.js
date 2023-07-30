import { View, Image, TouchableOpacity,Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import MyFavoriteScreen from "./MyFavoriteScreen";
import { useState, useContext, useEffect } from "react";
import { AuthenticatedUserContext } from "../Navigation";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { fetchMovie } from "../Api";
import { FontAwesome5 } from '@expo/vector-icons';import colors from "../colors";



const db = getFirestore();

export default function MovieCard({ movie, viewOnly }) {
  const [isLiked, setIsLiked] = useState(false);

  const {user} = useContext(AuthenticatedUserContext);

  useEffect(() => {
    async function fetch() {
      const docRef = await getDoc(doc(db, "users", user.uid));
      if (docRef.exists())
      {
        let temp = docRef.data().liked ? docRef.data().liked : [];
        setIsLiked(temp.some(res => res.imdbID === movie.imdbID))
      }
    }

    fetch();
  }, []);

  useEffect(() => {
    async function fetchAndUpdate() {
      const docRef = await getDoc(doc(db, "users", user.uid));
      if (docRef.exists())
      {
        let temp = docRef.data().liked ? docRef.data().liked : [];
        console.log(temp)
        if (isLiked && !temp.some(res => res.imdbID === movie.imdbID))
          temp.push(movie);
        else if (!isLiked)
          temp = temp.filter(res => res.imdbID !== movie.imdbID)
            
        await setDoc(doc(db, "users", user.uid), {
          liked: temp
        });
      } else {
        setDoc(doc(db, "users", user.uid), {
          liked: []
        });
      }
    }  

    !viewOnly && fetchAndUpdate();
  }, [isLiked]);

  const handlePress = () => {
    if (!viewOnly)
      setIsLiked(!isLiked);
    else
      fetchMovie(movie.Title).then(res => alert('The plot: ' + res.Plot + ' || Director:  ' + res.Director + ' || Actors: ' + res.Actors + ' || Country: ' + res.Country + ' || Year: ' + res.Year));
  }

  return (
    <View >
      
        <Image 
          style={{
            width: '80%',
            height: 200,
            margin: 10,
            borderRadius: 10,
          }}
          resizeMode ="cover"
          source={{ uri: movie.Poster }}
        
        />
        <TouchableOpacity onPress={handlePress} style={{
          
            backgroundColor: colors.primary ,
            height: 50,
            width: 50,
            borderRadius: 30,
            alignItems: "center",
            justifyContent: "center",
            shadowColor: colors.primary ,
            marginRight: 20,
            marginTop: 10
  
        }}>
      <FontAwesome5 name="grin-hearts" size={24} color="black" />       
     </TouchableOpacity>
        <Text style={{fontSize:20 ,fontWeight: 'bold',paddingLeft:10, color: isLiked ? 'red' : '#fff' }}>{movie.Title}</Text>
        <Text style={{paddingLeft:10, color: "#fff" }}>{movie.Year}</Text>
        <Text style={{paddingLeft:10, color: "#fff"}}>{movie.Type}</Text>
     
    </View>
  );
}