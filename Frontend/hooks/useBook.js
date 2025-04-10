// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import axios from "axios";
// import { addBook } from "../src/utils/bookSlice";
// import { toast } from 'react-toastify';

// const useBook = () => {
//   const dispatch = useDispatch();

//   const getBook = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book/getbook`);
//       const book = res.data;
//       dispatch(addBook(book.reverse()));
//     } catch (error) {
//       toast.error(error);
//     }
//   };

//   useEffect(() => {
//     getBook();
//   }, []); 
// };

// export default useBook;
