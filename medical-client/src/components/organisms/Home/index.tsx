import Box from "@mui/material/Box";
import Products from "../Products";
import SingleProduct from "../SingleProduct";
import Cart from "../Cart";
import Header from "../Header";
import { Route, Routes } from "react-router-dom";
import React from 'react';
import Orders from "../Orders";
import SingleOrder from "../SingleOrder";
import Categories from "../Categories";
import Profile from "../Profile";

export default function Home() {

  return (
    <div>
      <Header/>
      <Box marginRight={10} marginLeft={10}>
          <Routes>
          <Route path="/cart" element={  <Cart/>} /> 
          <Route path="/product/:id" element={ <SingleProduct/>} />
          <Route path="/orders" element={ <Orders/>} />
          <Route path="/order/:id" element={ <SingleOrder/>} />
          <Route path="/categories" element={ <Categories/>} />
          <Route path="/products/:id" element={ <Products/>} />
          <Route path="/categories/:id" element={ <Products/>} />
          <Route path="/profile" element={ <Profile/> } />
          <Route path="/*" element={ <Products/> } /> 
        </Routes>
      </Box>
    </div>
  );
}