import React from "react";
import UserLogo from "../UserLogo";

import "./UserDisplayer.css";
function UserDisplayer(props) {
  const { userData, searchToMessage } = props;
  return (
    <div className="userDisplayer">
      <div className="userDisplayerLeft">
        {userData.photoUrl ? (
          <img src={userData.photoUrl} alt="user"></img>
        ) : (
          <UserLogo width="40px" height="40px" />
        )}
      </div>
      <div
        className="userDisplayerRight"
        style={{ cursor: "pointer" }}
        onClick={() => searchToMessage(userData.userName)}
      >
        <h3 style={{ fontWeight: "300" }}>{userData.userName}</h3>
        <p>{userData.email}</p>
      </div>
    </div>
  );
}

export default UserDisplayer;
