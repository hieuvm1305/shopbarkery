import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainPage from "./components/MainPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  console.log(process.env.REACT_APP_IMAGE_URL);
  return (
    <div>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
      <ToastContainer autoClose={1500}/>
    </div>
  );
}

export default App;
