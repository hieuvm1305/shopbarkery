import React from "react";
import {toast } from "react-toastify";
function NavBar() {
  const toastme = () => {
    toast("hello");
  }
  return (
    <div className="bg-orange-100 w-full flex items-center">
      <div className="p-5">
        <button className="font-bold text-2xl" onClick={toastme}>My Coding</button>
      </div>
    </div>
  );
}

export default NavBar;
