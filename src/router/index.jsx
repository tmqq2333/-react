import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* History模式
     BrowserRouter
Hash模式
    HashRouter
*/
const BaseRouter = () => {
 
 return( 
 <Router>
    <Routes>
      <Route path="/*" element={<App />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  </Router>
)};

export default BaseRouter;
