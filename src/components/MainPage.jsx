import React from "react";
import Router from "./Router";
import NavPage from "./NavPage";
import NavBar from "./NavBar";

function MainPage() {
  return (
    <div>
      <section>
        <div>
          <NavBar/>
        </div>
        <div className="grid grid-cols-9 rounded">
          <div className="col-span-2 bg-white h-100% border">
            <Router />
          </div>
          <div className="col-span-7">
            <NavPage />
          </div>
        </div>
      </section>
     
    </div>
  );
}

export default MainPage;
