import React, { useState } from "react";
import "./NavBar.css";
import LogoSvg from "../LogoSvg.js";
import { auth, db } from "../../firebase";
import { useHistory } from "react-router-dom";
function NavBar(props) {
  const history = useHistory();
  const { navProps } = props;
  const name = auth.currentUser.displayName;
  const userHandler = () => {
    navProps.setUsersBoolean(true);
    navProps.setHelpBoolean(false);
    navProps.setSearchBoolean(false);
  };
  const searchHandler = () => {
    navProps.setUsersBoolean(false);
    navProps.setHelpBoolean(false);
    navProps.setSearchBoolean(true);
  };
  const helpHandler = () => {
    navProps.setUsersBoolean(false);
    navProps.setHelpBoolean(true);
    navProps.setSearchBoolean(false);
  };

  return (
    <div className="navBarHero">
      <div className="navBarHeroTop">
        <LogoSvg />
        <div
          className="iconTop"
          style={{
            background: navProps.usersBoolean
              ? "rgb(97, 80, 143)"
              : "transparent",
          }}
          onClick={userHandler}
        >
          <i className="fas fa-users"></i>
        </div>
        <div
          className="iconTop"
          style={{
            background: navProps.searchBoolean
              ? "rgb(97, 80, 143)"
              : "transparent",
          }}
          onClick={searchHandler}
        >
          <i className="fas fa-search"></i>
        </div>
      </div>
      <div className="navBarHeroBottom">
        <div
          className="iconTop"
          style={{
            background: navProps.helpBoolean
              ? "rgb(97, 80, 143)"
              : "transparent",
          }}
          onClick={helpHandler}
        >
          <i className="fas fa-question-circle"></i>
        </div>
        <div
          className="iconTop"
          onClick={async () => {
            await auth.signOut().then(() => {
              db.collection("users").doc(name).update({
                isLoggedIn: false,
              });
              history.push("/");
            });
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
