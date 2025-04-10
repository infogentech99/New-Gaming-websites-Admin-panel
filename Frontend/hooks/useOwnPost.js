// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { addOwnPost } from "../src/utils/postSlice.js";
// import axios from "axios";


// const useOwnPost = (render) => {
//     const dispatch= useDispatch();
//     const token = useSelector((state)=>state.token);
//     const getPost= async ()=>{
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/post/getOwnPost`,{
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const json= await res.data.posts;
//       dispatch(addOwnPost(json.reverse()));
//     };
//     useEffect(()=>{
//       getPost();
//     },[render]);
// }

// export default useOwnPost

