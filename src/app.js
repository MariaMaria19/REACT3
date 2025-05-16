import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUsers, setLoading as setUsersLoading, setError as setUsersError } from './redux/usersSlice.js';
import { setPosts, setLoading as setPostsLoading, setError as setPostsError } from './redux/postsSlice.js';
import store from './redux/storeSlice.js';

const Post = ({ title, body }) => (
  <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
    <h4>{title}</h4>
    <p>{body}</p>
  </div>
);

const PostsWithUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const posts = useSelector((state) => state.posts.posts);
  const usersLoading = useSelector((state) => state.users.loading);
  const postsLoading = useSelector((state) => state.posts.loading);
  const usersError = useSelector((state) => state.users.error);
  const postsError = useSelector((state) => state.posts.error);

  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setUsersLoading());
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch(setUsers(response.data));
      } catch (error) {
        dispatch(setUsersError(error.message));
      }
    };

    const fetchPosts = async () => {
      dispatch(setPostsLoading());
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch(setPosts(response.data));
      } catch (error) {
        dispatch(setPostsError(error.message));
      }
    };

    fetchUsers();
    fetchPosts();
  }, [dispatch]);

  if (usersLoading || postsLoading) {
    return <div>Loading...</div>;
  }

  if (usersError || postsError) {
    return <div>Error: {usersError || postsError}</div>;
  }

  return (
    <div>
      <h2>Posts with User Information</h2>
      {posts.map((post) => {
        const user = users.find((user) => user.id === post.userId);
        return (
          <div key={post.id} style={{ border: '1px solid #eee', margin: '10px', padding: '10px' }}>
            <h3>{user ? user.name : 'Unknown User'}</h3>
            <Post title={post.title} body={post.body} />
          </div>
        );
      })}
    </div>
  );
};


const UserListWithPosts = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const posts = useSelector((state) => state.posts.posts);
  const usersLoading = useSelector((state) => state.users.loading);
  const postsLoading = useSelector((state) => state.posts.loading);
  const usersError = useSelector((state) => state.users.error);
  const postsError = useSelector((state) => state.posts.error);
  const [selectedUserId, setSelectedUserId] = useState(null);


  useEffect(() => {
    const fetchUsers = async () => {
      dispatch(setUsersLoading());
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch(setUsers(response.data));
      } catch (error) {
        dispatch(setUsersError(error.message));
      }
    };

    const fetchPosts = async () => {
      dispatch(setPostsLoading());
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch(setPosts(response.data));
      } catch (error) {
        dispatch(setPostsError(error.message));
      }
    };
    dispatch(setUsersLoading());
    dispatch(setPostsLoading());


    fetchUsers();
    fetchPosts();
  }, [dispatch]);


  if (usersLoading || postsLoading) {
    return <div>Loading...</div>;
  }

  if (usersError || postsError) {
    return <div>Error: {usersError || postsError}</div>;
  }


  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  const filteredPosts = posts.filter((post) => post.userId === selectedUserId);


  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '30%', borderRight: '1px solid #ccc', padding: '10px' }}>
        <h2>Пользователи</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => handleUserClick(user.id)} style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #eee' }}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ width: '70%', padding: '10px' }}>
        <h2>Посты пользователя</h2>
        {selectedUserId ? (
          filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Post key={post.id} title={post.title} body={post.body} />
            ))
          ) : (
            <p>Постов нет</p>
          )
        ) : (
          <p>Нажмите на пользователя</p>
        )}
      </div>
    </div>
  );
};


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* Choose which component to render: */}
        {/* <PostsWithUsers /> */}
        <UserListWithPosts />
      </div>
    </Provider>
  );
}

export default App
