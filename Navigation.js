import { View, ActivityIndicator } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import InfoScreen from "./screens/InfoScreen";
import Movies from "./screens/Movies";
import MyFavoriteScreen from "./screens/MyFavoriteScreen";

// הסבר על קומפוננטת הניווט 
// קומפוננטת הניווט מחזירה כמה מצבי ניווט שונים בהתאם למצב שבה האפליקצייה נמצאת 
// לדוגמא: האםליקצייה לא מחוברת לשם משתמש ולסיסמא אז היא מחזירה רק את הניווט בין ההרשמה להתחברות

const Stack = createStackNavigator();
export const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
// זה הניווט למקרה שהמשתמה מחובר הוא יכול לנווט בין המסכים של האפליקצייה 
function HomeStack() {
  return (
    <Stack.Navigator defaultScreenOptions={InfoScreen} >
      <Stack.Screen name="InfoScreen" component={InfoScreen}/>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Movies" component={Movies} />
      <Stack.Screen name="MyFavoriteScreen" component={MyFavoriteScreen} />
          
    </Stack.Navigator>
  );
}
// זה הניווט למיקרה שהמשתמה לא מחובר יש לו הראשת גישה רק לדף ההתחברות וההרשמה
function AuthStack() {
  return (
    <Stack.Navigator
      defaultScreenOptions={Login}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      
    </Stack.Navigator>
  );
}


function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);

  //בדיקת מצב האעינה של המשתמש 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // בדיקת טעינה תקינה 
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
  // פה זה הערך המוחזר (שני המצבים שהסברתי אחד עם המשתמש מחובר זה ההוםסטאק והשניה אווטסטאק אם המשתמש לא מחובר)
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function Navigation() {
  // האוטנטיקטיון עוטף
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
