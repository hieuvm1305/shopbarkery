import React from "react";
import { Route, Routes } from "react-router-dom";
import Unit from "./Unit/Unit";
import Ingredient from "./Ingredient/Ingredient";
import ProductType from "./Producttype/ProductType";
import Product from "./Product/Product";

function NavPage() {
  return (
    <React.Fragment>
      <section>
        <Routes>
          <Route path="/unit" element={<Unit />} />
          <Route path="/ingredient" element={<Ingredient />} />
          <Route path="/producttype" element={<ProductType />} />
          <Route path="/" element={<Product />} />
        </Routes>
      </section>
    </React.Fragment>
  );
}

export default NavPage;
