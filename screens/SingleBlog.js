import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, Text, Image, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SingleBlog(props) {
  const [blogs, setBlogs] = useState([]);

  return (
    <View
      style={{ backgroundColor: '#2f4273', width: "100%", height: 300, display: 'flex', flexDirection: 'column', borderRadius: 5, padding: 20, marginVertical: 10 }}>
      <View style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", height: 120}}>
        <Text style={{color: "white", fontWeight: 900, fontSize: 20}}>{props.data.id}</Text>
        <Text style={{color: "white", fontWeight: 500, fontSize: 16}}>{props.data.blog}</Text>
      </View>
      <View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <TouchableOpacity title="Like"
          style={{ height: 20, width: 120, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 50}}
          onPress={() => {}}>
          <Image source={require('./assets/like.png')} style={{height: 18, width: 18, marginRight: 10}} />
          <Text style={{color: 'white', fontSize: 15}}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity title="Like"
                          style={{ height: 20, width: 120, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 50}}
                          onPress={() => {}}>
          <Image source={require('./assets/dislike.png')} style={{height: 18, width: 18, marginRight: 10}} />
          <Text style={{color: 'white', fontSize: 15}}>Dislike</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
