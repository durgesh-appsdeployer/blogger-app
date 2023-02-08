import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text, Image, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SingleBlog from "./SingleBlog";

export default function Home({navigation}) {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    //await AsyncStorage.clear();
    const blog = await AsyncStorage.getItem('blogs');
    if(blog===null){
      await AsyncStorage.setItem('count', "0");
      await AsyncStorage.setItem('blogs', "[]");
    }
    const Blogs = await AsyncStorage.getItem('blogs');
    await setBlogs(JSON.parse(Blogs).reverse());
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        title="New Blog"
        style={{
          height: 50,
          width: 320,
          backgroundColor: 'green',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
        }}
        onPress={() => {navigation.push("NewBlog", {getBlogs: getBlogs})}}>
        <Image
          source={require('./assets/plus.png')}
          style={{height: 18, width: 18, marginRight: 10}}
        />
        <Text style={{color: 'white', fontSize: 15}}>New Blog</Text>
      </TouchableOpacity>
      <View
        style={{
          height: "70%",
          width: "100%",
          marginTop: 40,
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <FlatList
          nestedScrollEnabled={true}
          data={blogs}
          style={{width: "100%", display: "flex", flexDirection: "column"}}
          renderItem={({item}) => (
            <SingleBlog
              navigation={navigation}
              data={item}
              getBlogs={getBlogs}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}
