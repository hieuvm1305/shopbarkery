import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainPage from "./components/MainPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
      <ToastContainer/>
    </div>
  );
}

export default App;
