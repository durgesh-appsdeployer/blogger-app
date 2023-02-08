import React, {useState} from 'react';
import { TouchableOpacity, View, Text, Image, FlatList, TextInput } from "react-native";
import { store } from "../redux/Store";

export default function SingleBlog(props) {
  const [blog, setBlog] = useState(props.data);
  const [comment, setComment] = useState("");

  return (
    <View
      style={{width: "100%", height: 600, display: 'flex', flexDirection: 'column', borderRadius: 0, marginVertical: 10, alignSelf: "center"}}>
      <View style={{ backgroundColor: "white", padding: 0, elevation: 5, display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", height: 400, marginBottom: 10}}>
        <Image source={require(`./assets/images/1.jpg`)} style={{height: 150, width: "100%", marginRight: 10, marginBottom: 15}} />
        <Text style={{color: "black", fontWeight: 900, fontSize: 20, marginLeft: 20, marginRight: 20}}>{blog.id}</Text>
        <Text style={{color: "black", fontWeight: 500, fontSize: 16, marginLeft: 20, marginRight: 20, height: 190}}>{blog.blog}</Text>
      </View>
      <View style={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <TouchableOpacity title="Like"
          style={{ height: 30, width: 180, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: "gray"}}
          onPress={() => {
            store.dispatch({
              type: 'liked',
              data: {
                id: props.data.id,
              },
            });
            setBlog({...blog, likes: blog.likes+1});
          }}>
          <Image source={require('./assets/like.png')} style={{height: 18, width: 18, marginRight: 10}} />
          <Text style={{color: 'black', fontSize: 15}}>{blog.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity title="Like"
          style={{ height: 30, width: 180, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 50}}
          onPress={() => {
            store.dispatch({
              type: 'disliked',
              data: {
                id: props.data.id,
              },
            });
            setBlog({...blog, dislikes: blog.dislikes+1});
          }}>
          <Image source={require('./assets/dislike.png')} style={{height: 18, width: 18, marginRight: 10}} />
          <Text style={{color: 'black', fontSize: 15}}>{blog.dislikes}</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 5}}>
        <Text style={{color: "black", fontWeight: "600", fontSize: 15}}>Add Comment: </Text>
        <TextInput
          multiline={false}
          textAlignVertical="top"
          cursorColor="dodgerblue"
          secureTextEntry={false}
          style={{
            color: 'black',
            borderRadius: 0,
            borderBottomWidth: 1,
            borderColor: 'gray',
            paddingLeft: 10,
            height: 40,
            width: '50%',
            fontSize: 15,
            marginLeft: 10
          }}
          value={comment}
          onChangeText={_content => {setComment(_content);}}
        />
        <TouchableOpacity title="Like"
          style={{ height: 20, width: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 50}}
          onPress={() => {
            if (comment) {
              store.dispatch({
                type: 'commentAdded',
                data: {
                  id: blog.id,
                  comment: comment
                },
              });
              setBlog({...blog, comments: [...blog.comments, comment]});
              setComment('');
            } else {
              alert('Write something!!');
            }
          }}>
          <Image source={require('./assets/check.png')} style={{height: 18, width: 18, marginRight: 0}} />
          {/*<Text style={{color: 'black', fontSize: 15}}>Dislike</Text>*/}
        </TouchableOpacity>
      </View>
      <View style={{height: 100,
        width: "100%",
        marginTop: 10,
        borderRadius: 0,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray"}}
        >
        <FlatList data={blog.comments}
          nestedScrollEnabled={true}
          style={{width: "100%", display: "flex", flexDirection: "column"}}
          renderItem={({item}) => {
            return (
              <View style={{height: 20, paddingLeft: 20}}>
                <Text style={{color: "black", height: 40, fontWeight: 500, fontSize: 13,}}>{item}</Text>
              </View>
            )
          }}
          contentContainerStyle={{
            flexGrow: 1,
          }}>
        </FlatList>
      </View>
    </View>
  );
}
