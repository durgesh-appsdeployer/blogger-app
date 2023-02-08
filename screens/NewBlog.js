import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text, Image, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../redux/Store';

export default function NewBlog({route, navigation}) {
  const [blog, setBlog] = useState('');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1e2945',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TextInput
        multiline={true}
        textAlignVertical="top"
        cursorColor="dodgerblue"
        secureTextEntry={false}
        style={{
          color: 'white',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: 'gray',
          padding: 10,
          height: '50%',
          width: '80%',
          fontSize: 15,
          marginBottom: '20%',
        }}
        value={blog}
        onChangeText={_content => {setBlog(_content); console.log(blog)}}
      />
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
        onPress={async () => {
          if (blog) {
            store.dispatch({
              type: 'blogAdded',
              data: {
                blog
              },
            });
            setBlog('');
            navigation.navigate('Home');
            route.params.update();
          } else {
            alert('Write something!!');
          }
        }}>
        <Image
          source={require('./assets/PlusWhite.png')}
          style={{height: 18, width: 18, marginRight: 10}}
        />
        <Text style={{color: 'white', fontSize: 15}}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
