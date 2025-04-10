import App from "./App";
// import {Provider} from "react-redux";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function StoreProvider() {
  return (
    <>
      <App />
      <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
bodyClassName = "toastBody"
/>
  </>
  );
}

export default StoreProvider;