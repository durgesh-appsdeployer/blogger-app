import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  BackHandler
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./screens/Home";
import NewBlog from "./screens/NewBlog";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App () {


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home', headerShown: false }}></Stack.Screen>
        <Stack.Screen name="NewBlog" component={NewBlog} options={{ title: 'New Blog', headerShown: true }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e2936"
  }
});

export default App;
