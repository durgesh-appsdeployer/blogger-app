import AsyncStorage from '@react-native-async-storage/async-storage';

export async function reducer(state = [], action) {
  let count = await AsyncStorage.getItem('count');
  count = parseInt(count);
  let blogs = JSON.parse(await AsyncStorage.getItem('blogs'));
  const blog = blogs.filter(blog => {
    return blog.id === action.data.id;
  });
  switch (action.type) {
    case 'blogAdded':
      count++;
      await AsyncStorage.setItem('count', count.toString());
      const newBlog = {
        id: count,
        blog: action.data.blog,
        likes: 0,
        dislikes: 0,
        comments: [],
        image: action.data.image
      };
      const allBlogs = [...blogs, newBlog];
      await AsyncStorage.setItem('blogs', JSON.stringify(allBlogs));
      return allBlogs;

    case 'commentAdded':
      let comments = blog[0].comments;
      const newComment = action.data.comment;
      await AsyncStorage.setItem(
        'blogs',
        JSON.stringify(
          blogs.map(blog =>
            blog.id === action.data.id
              ? {...blog, comments: [...comments, newComment]}
              : blog,
          ),
        ),
      );
      return blogs.map(todo =>
        todo.id === action.data.id
          ? {...todo, comments: [...comments, newComment]}
          : todo,
      );

    case 'liked':
      let like_count = blog[0].likes
      await AsyncStorage.setItem(
        'blogs',
        JSON.stringify(
          blogs.map(blog =>
            blog.id === action.data.id
              ? {...blog, likes: like_count + 1}
              : blog,
          ),
        ),
      );
      return blogs.map(blog =>
        blog.id === action.data.id ? {...blog, likes: like_count + 1} : blog,
      );

    case 'disliked':
      let dislike_count = blog[0].dislikes
      await AsyncStorage.setItem(
        'blogs',
        JSON.stringify(
          blogs.map(blog =>
            blog.id === action.data.id
              ? {...blog, dislikes: dislike_count + 1}
              : blog,
          ),
        ),
      );
      return blogs.map(blog =>
        blog.id === action.data.id ? {...blog, likes: dislike_count + 1} : blog,
      );

    default:
      return blogs;
  }
}

export default reducer;
