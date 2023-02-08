import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text, Image, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../redux/Store';
import SingleBlog from "./SingleBlog";

export default function Home({navigation}) {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    const blog = await AsyncStorage.getItem('blogs');
    if(blog===null){
      await AsyncStorage.setItem('count', "0");
      await AsyncStorage.setItem('blogs', "[]");
    }
    const Blogs = JSON.parse(await AsyncStorage.getItem('blogs')).reverse();
    setBlogs(Blogs);
    console.log(blogs);
  };

  const addBlog = () => {

  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1e2936',
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
        onPress={() => {navigation.navigate("NewBlog", {update: fetchBlogs})}}>
        <Image
          source={require('./assets/PlusWhite.png')}
          style={{height: 18, width: 18, marginRight: 10}}
        />
        <Text style={{color: 'white', fontSize: 15}}>New Blog</Text>
      </TouchableOpacity>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          height: 600,
          width: 320,
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
          style={{width: "98%", padding: 20}}
          renderItem={({item}) => (
            <SingleBlog
              navigation={navigation}
              data={item}
              update={fetchBlogs}
            />
          )}
          keyExtractor={item => item.textID}
        />
      </View>
    </View>
  );
}
