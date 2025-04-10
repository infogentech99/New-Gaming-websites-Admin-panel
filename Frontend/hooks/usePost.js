// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { addPublicPost } from "../src/utils/postSlice.js";
// import axios from "axios";

// const usePost = (render) => {

//     const dispatch= useDispatch();
//     const token = useSelector((state)=>state.token);
//     const getPublicPost= async ()=>{
        
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/post/getPost`,{
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       dispatch(addPublicPost(res.data.reverse()));
//     };
//     useEffect(()=>{
//         getPublicPost();
//     },[render]);

// }

// export default usePost