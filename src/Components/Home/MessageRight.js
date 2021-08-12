import React, { useContext, useEffect, useState } from "react";
import "./MessageRight.css";
import { friendUserName } from "../HomePage";
import { auth, db } from "../../firebase";
import UserLogo from "../UserLogo";
function MessageRight() {
  const friend = useContext(friendUserName);
  const [userFriend, setUserFriend] = useState([]);
  useEffect(() => {
    console.log("friend is ", friend.userNameFriend);
    if (auth.currentUser && auth.currentUser.displayName) {
      db.collection("users")
        .doc(auth.currentUser.displayName)
        .get()
        .then((snap) => {
          if (snap.data() && snap.data().lastChatFriend.length > 0) {
            db.collection("users")
              .doc(snap.data().lastChatFriend)
              .get()
              .then((snap) => {
                setUserFriend(snap.data());
              });
          }
        });
    }
  }, [friend.userNameFriend]);

  return (
    <div className="messageRightHero">
      <div className="messageRightProfile">
        <div>
          {userFriend.photoUrl ? (
            <img
              src={userFriend.photoUrl}
              style={{ height: "90px", width: "90px", borderRadius: "90px" }}
            ></img>
          ) : (
            <UserLogo height="90px" width="90px" />
          )}
        </div>
        <h3 style={{ marginTop: "0px", color: "white", fontWeight: "300" }}>
          {userFriend.userName}
        </h3>
      </div>
      <div className="messageRightSharedMedia">
        <h3
          style={{ color: "lightBlue", fontWeight: "300", marginLeft: "10px" }}
        >
          Shared Media
        </h3>
      </div>
      <div className="messageRightSharedLinks">
        <h3
          style={{ color: "lightBlue", fontWeight: "300", marginLeft: "10px" }}
        >
          Shared Links
        </h3>
      </div>
    </div>
  );
}

export default MessageRight;
