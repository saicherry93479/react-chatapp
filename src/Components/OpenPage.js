import { Button } from "@material-ui/core";
import React, { useEffect, useLayoutEffect } from "react";
import LogoSvg from "./LogoSvg";
import "./OpenPage.css";
import chatHome from "../Images/chatHome.svg";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
function OpenPage() {
  const history = useHistory();
  const signInHandler = () => {
    history.push("/login");
  };
  const signUpHandler = () => {
    history.push("/signup");
  };

  useLayoutEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((snapshot) => {
      if (snapshot) {
        history.push("/home");
      }
      return unsubscribe;
    });
  }, []);

  return (
    <div className="openPageHero">
      <div className="openPageNav">
        <div className="logo">
          <LogoSvg />
          <div>
            <h2 className="logoName">Chit Chat</h2>
          </div>
        </div>
        <div className="openPageSignInButton">
          <Button variant="outlined" color="secondary" onClick={signInHandler}>
            sign in
          </Button>
        </div>
      </div>
      <div className="openPageContent">
        <div className="openPageContentSubContent">
          <div>
            <h1>Connect with people like you and you like ......</h1>
            <p style={{ color: "gray", marginBottom: "30px" }}>
              Enjoy the app with the best features and performance.....
            </p>
            <Button
              variant="contained"
              color="secondary"
              onClick={signUpHandler}
            >
              Get Started
              <i
                className="fas fa-arrow-right"
                style={{ marginLeft: "10px", fontSize: "20px" }}
              ></i>
            </Button>
          </div>
        </div>

        <img
          src={chatHome}
          alt="openPage"
          className="openPageContentImage"
        ></img>
      </div>
    </div>
  );
}

export default OpenPage;
