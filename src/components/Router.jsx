import React from "react";
import { NavLink } from "react-router-dom";
function Router() {
  const listItem = [
    { path: "/unit", name: "Unit" },
    { path: "/ingredient", name: "Ingredient" },
    { path: "/producttype", name: "ProductType" },
    { path: "/", name: "Product" },
  ];
  return <div>
    <section>
        <div className="font-bold">
            {
                listItem.map((item, index) => {
                    return (
                        <div key={index} className="border rounded text-center p-3 my-2 mx-2">
                            <NavLink to={item.path}>
                                <span className="text-cyan-400">{item.name}</span>
                            </NavLink>
                        </div>
                    )
                })
            }
        </div>
    </section>
  </div>;
}

export default Router;
