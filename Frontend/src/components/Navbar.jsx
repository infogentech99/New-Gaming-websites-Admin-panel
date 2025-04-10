// import React, { useEffect,useState } from 'react'
// import { useNavigate, NavLink } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { persistor } from '../utils/appStore';
// import { toast } from 'react-toastify';

// function Navbar() {
//   const dispatch=useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user);
//   const handleLogout = () => {
//     if(user == undefined||null){
//       navigate('/logpage');
//     }
//     fetch(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
//       method: 'GET',
//       credentials: 'include',
//     })
//     .then(() => {
//       dispatch({ type: 'LOGOUT' });
//       persistor.purge();
//       toast("Logout succefully")
//       navigate('/logpage');
//     })
//     .catch((error) => {
//       toast.error(error);
//     });
//   };
//   const [sticky, setsticky] = useState(false);
//   useEffect(()=>{
//     const handleScroll=()=>{
//        if(window.scrollY > 0) setsticky(true);
//        else setsticky(false);
//     }
//     window.addEventListener("scroll",handleScroll);
//     return()=>{
//       window.removeEventListener("scroll",handleScroll);
//     };
//   },[]);
//   return (
//     <>
//       <div className={` navbar lg:px-10 fixed top-0 left-0 right-0 transition-all duration-300 ease-out z-50 ${sticky?'bg-base-300 shadow-base-200 bg-gradient-to-t from-base-100 ':'bg-base-100'}`}>
//     <div className="navbar-start">
//     <div className="dropdown">
//       <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor">
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="2"
//             d="M4 6h16M4 12h8m-8 6h16" />
//         </svg>
//       </div>
//       <ul
//         tabIndex={0}
//         className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
//     <NavLink to='/' className={({ isActive }) => (isActive ? 'text-purple-700 focus:text-purple-800 font-bold' : '')}>Home</NavLink>
//     <NavLink to='/books' className={({ isActive }) => (isActive ? 'text-purple-700 focus:text-purple-800 font-bold' : '')}>Book</NavLink>
//     <NavLink to='/Community' className={({ isActive }) => (isActive ? 'text-purple-700 focus:text-purple-800 font-bold' : '')}>Community</NavLink>
//     <NavLink to='/profile' className={({ isActive }) => (isActive ? 'text-purple-700 focus:text-purple-800 font-bold' : '')}>Profile</NavLink>
//     <NavLink to='/About' className={({ isActive }) => (isActive ? 'text-purple-700 focus:text-purple-800 font-bold' : '')}>About</NavLink>
//       </ul>
//     </div>
//     <NavLink to={'/'} className="btn btn-ghost text-xl">
//       <img src="https://i.imgur.com/TmmEzhQ.png" alt="Logo" className='w-14 ' />
//     </NavLink>
//   </div>
//   <div className="navbar-center hidden lg:flex gap-5">
//     <NavLink to='/' className={({ isActive }) => (isActive ? 'text-purple-700 focus:text-purple-800 font-bold' : '')}>Home</NavLink>
//     <NavLink to='/books' className={({ isActive }) => (isActive ? 'text-purple-700 focus:text-purple-800 font-bold' : '')}>Book</NavLink>
//     <NavLink to='/Community' className={({ isActive }) => (isActive ? 'text-purple-700 focus:text-purple-800 font-bold' : '')}>Community</NavLink>
//     <NavLink to='/profile' className={({ isActive }) => (isActive ? 'text-purple-700 focus:text-purple-800 font-bold' : '')}>Profile</NavLink>
//     <NavLink to='/About' className={({ isActive }) => (isActive ? 'text-purple-700 focus:text-purple-800 font-bold' : '')}>About</NavLink>
//   </div>
//   <div className="navbar-end space-x-2">
//     <button onClick={handleLogout} className="btn bg-purple-800">
//     {user == undefined||null ?('LogIn'): ('LogOut')}
//       </button>
//   </div>
// </div>
//     </>
//   )
// }

// export default Navbar
