import React, {useState} from 'react';
import {TouchableOpacity, View, Text, Image, TextInput} from 'react-native';
import {store} from '../redux/Store';

export default function NewBlog(props) {
  const [blog, setBlog] = useState('');

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
      <Text style={{color: "black", fontWeight: "700", fontSize: 17, marginBottom: 5, alignSelf: "flex-start", marginLeft: 20}}>Add Your blog Here: </Text>
      <TextInput
        multiline={true}
        textAlignVertical="top"
        cursorColor="dodgerblue"
        secureTextEntry={false}
        style={{
          color: 'black',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: 'lightgray',
          padding: 10,
          height: '50%',
          width: '90%',
          fontSize: 15,
          marginBottom: '10%',
        }}
        value={blog}
        onChangeText={_content => {setBlog(_content)}}
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
                blog,
                image: `${x}.jpg`
              },
            });
            setBlog('');
            props.navigation.push('Home');
          } else {
            alert('Write something!!');
          }
        }}>
        <Image
          source={require('./assets/check-white.png')}
          style={{height: 18, width: 18, marginRight: 10}}
        />
        <Text style={{color: 'white', fontSize: 15}}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
