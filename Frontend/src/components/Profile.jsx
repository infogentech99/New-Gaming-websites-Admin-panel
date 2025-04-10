import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useOwnPost from '../../hooks/useOwnPost';
import axios from 'axios';
import { addContent } from '../utils/contentSlice';
import {toast} from 'react-toastify'

const Profile = () => {
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [render, setRender] = useState(false);
  const [content, setContent] = useState('');
  useOwnPost(render);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const ownPosts = useSelector((state) => state.post.ownPost);
  useEffect(() => {
    setPosts(ownPosts);
  }, [ownPosts]);
  const handleLike = async (postId) => {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/like/${postId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast(res.data.message);
    setRender(!render);
  };

  const handleEdit = (postId,postContent) => {
    dispatch(addContent({
      postContent,
      postId,
    }));
    navigate('/edit');
  };
  const handleDelete = async (postId)=>{
    try {
          const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/post/delete/${postId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast(res.data.message);
    setRender(!render);
    } catch (error) {
    toast(error);
    }

  };
  const handleSubmit = async (e) => {
          e.preventDefault();
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/post/newPost`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ content })
          });

          const data = await response.json();
          if (response.ok) {
            toast("Post Upload Succefully");
            setRender(!render);
            navigate('/profile');
          } else {
            toast.error(data.message);
          }
    setContent('');
  };
  return (
    <div className='pt-28 px-10'>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10  rounded-md">
          <img
            className="w-full h-full object-cover overflow-hidden"
            src={user==null||undefined?'https://imgs.search.brave.com/DIaWjfE5hMn_M2fC1KhO6nlRsbeSRHsfTFrsd549dE4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9wZXJzb24t/aWNvbi0xMDI0eDk2/Ny1ndTdqaGE2NC5w/bmc':'https://imgs.search.brave.com/3mHz5L3AG2cQ3RKqMscJDpw23-ffRq3OvGKgp54HU38/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNjc5NC8xNjc5/NDA0My5wbmc_c2Vt/dD1haXNfaHlicmlk'}
            alt="User Profile"
          />
        </div>
        <h3 className="text-3xl mb-5">
          <span className="font-light">Hello</span>,  {user == undefined||null ?('EveryOne'): (user.username)}👋 
        </h3>
      </div>
      {user == undefined||null ?(<div className='min-h-96 pt-10 text-xl'>
        You have to login to create  a new post 🫠🫠
      </div>): (<div className="">
              <h5>You can create a new post.</h5>
      <form >
        <textarea
          placeholder="What's on your mind?"
          className="resize-none p-3 outline-none w-1/3 bg-transparent border-2 border-zinc-800"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="px-3 w-40 py-2 bg-blue-500 block rounded-md mt-2"
          onClick={handleSubmit}
          placeholder="Create new post"
          type="submit"
        />
      </form>

      <div className="posts mt-20">
        <h3 className="text-zinc-400">Your Posts.</h3>
        <div className="postcontainer mt-5 flex gap-4 flex-wrap">
        {posts !== null ? (
  posts.map((post) => (
    <div
      key={post._id}
      className="post card-container p-4 rounded-md bg-zinc-900 space-y-3 "
    >
      <h4 className="text-blue-500 text-lg mb-2">
        {user.username}
      </h4>
      <p className="text-sm tracking-tight ">{post.content}</p>
      <div className="div">
        <small >{post.likes.length} likes</small>
      <div className="  flex justify-between">
        <div className="btns flex gap-4">
        <button className="text-blue-500" onClick={() => handleLike(post._id)}>
          {post.likes.includes(user._id) ? 'Unlike' : 'Like'}
        </button>
        {user._id === post.user && (
          <button
            className="text-zinc-600"
            onClick={() => handleEdit(post._id, post.content)}
          >
            Edit
          </button>
        )}
      </div>
      <div className="delete">
      {user._id === post.user && (
          <button
            className="text-zinc-200  bg-red-600 py-1 px-2 rounded-2xl"
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </button>
        )}
      </div>
      </div>
      
      </div>
      
    </div>
  ))
) : (
  <div className="post card-container p-4 rounded-md bg-zinc-900">
    Add new post..😁😁
  </div>
)}
        </div>
      </div>
      </div>)}
      

    </div>
  );
};

export default Profile;

