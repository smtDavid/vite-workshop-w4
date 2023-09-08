import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Auth from "./views/Auth";
import SignUp from "./views/SignUp";
import SignIn from "./views/SignIn";
import Todo from "./views/Todo";

// import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="sign_in" element={<SignIn />}></Route>
          <Route path="sign_up" element={<SignUp />}></Route>
        </Route>
        <Route path="/todo" element={<Todo />}></Route>
      </Routes>
    </>
  );
}

export default App;
