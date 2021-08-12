import React, { useContext, useEffect } from "react";
import "./Message.css";
import { friendUserName } from "../HomePage";
import MessageLeft from "./MessageLeft";
import MessageMain from "./MessageMain";
import MessageRight from "./MessageRight";
import { auth, db } from "../../firebase";

function Message() {
  useEffect(() => {
    return () => {
      window.addEventListener("beforeunload", (e) => {
        db.collection("users")
          .doc(auth.currentUser.displayName)
          .update({
            isLoggedIn: false,
          })
          .then((res) => console.log("sucess false"))
          .catch((err) => console.log("not false"));
      });
    };
  }, []);
  const friend = useContext(friendUserName);
  return (
    <>
      {auth.currentUser ? (
        <div className="messageHero">
          <div className="messageHeroLeft">
            <MessageLeft />
          </div>
          <div className="messageHeroMain">
            <MessageMain />
          </div>
          <div className="messageHeroRight">
            <MessageRight />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Message;
