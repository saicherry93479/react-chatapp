import React, { useEffect } from "react";
import LogInPage from "./Components/LogInPage";
import OpenPage from "./Components/OpenPage";
import SignUpPage from "./Components/SignUpPage";
import "./App.css";
import { HashRouter, Switch, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import { auth, db } from "./firebase";

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route path="/" exact component={OpenPage}></Route>
          <Route path="/login" component={LogInPage}></Route>
          <Route path="/signup" component={SignUpPage}></Route>
          <Route path="/home" component={HomePage}></Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
