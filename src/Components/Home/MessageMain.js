import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import "./MessageMain.css";
import { friendUserName } from "../HomePage";
import firebase from "firebase/app";
import "firebase/firestore";
import UserLogo from "../UserLogo";
function MessageMain() {
  const [userFriend, setUserFriend] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageRefresh, setMessageRefresh] = useState(false);
  const friend = useContext(friendUserName);
  const messageHandler = () => {
    console.log("message is ", message);
    if (message.length > 0) {
      db.collection("users")
        .doc(auth.currentUser.displayName)
        .collection("friends")
        .doc(userFriend.userName)
        .collection("messages")
        .add({
          message: message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userName: auth.currentUser.displayName,
        });
      db.collection("users")
        .doc(userFriend.userName)
        .collection("friends")
        .doc(auth.currentUser.displayName)
        .collection("messages")
        .add({
          message: message,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userName: auth.currentUser.displayName,
        });
    }
    setMessage("");
  };

  useEffect(() => {
    console.log("friend is ", friend.userNameFriend);
    if (auth.currentUser && auth.currentUser.displayName) {
      db.collection("users")
        .doc(auth.currentUser.displayName)
        .get()
        .then((snap) => {
          if (
            snap.data() &&
            snap.data().lastChatFriend !== undefined &&
            snap.data().lastChatFriend.length > 0
          ) {
            db.collection("users")
              .doc(snap.data().lastChatFriend)
              .get()
              .then((snap) => {
                setUserFriend(snap.data());
                setMessageRefresh(!messageRefresh);
              });
          }
        });
    }
  }, [friend.userNameFriend]);
  useEffect(
    () => {
      console.log("in mesagemain chat");
      db.collection("users")
        .doc(auth.currentUser.displayName)
        .collection("friends")
        .doc(userFriend.userName)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    },
    [messageRefresh],
    friend.userNameFriend
  );
  useEffect(() => {
    db.collection("users")
      .doc(auth.currentUser.displayName)
      .collection("friends")
      .doc(userFriend.userName)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, [friend.userNameFriend]);

  return (
    <div>
      <div>
        <div className="messageMainHead">
          <div
            style={{
              marginLeft: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgb(30, 19, 59)",
              borderRadius: "30px",
            }}
          >
            {userFriend.photoUrl ? (
              <img
                src={userFriend.photoUrl}
                alt=""
                style={{ height: "25px", width: "25px", borderRadius: "30px" }}
              ></img>
            ) : (
              <UserLogo height="25px" width="25px" />
            )}
          </div>
          <h2 style={{ margin: "0px", marginLeft: "15px", fontWeight: "300" }}>
            {userFriend.userName}
          </h2>
        </div>
        <div className="messageMainChatBox">
          <div className="messageMainChat">
            {messages.map((doc) =>
              doc.data.userName === auth.currentUser.displayName ? (
                <div className="messageRightSender" key={doc.id}>
                  <div className="messageRightSenderMessage">
                    <div>{doc.data.message}</div>
                  </div>
                </div>
              ) : (
                <div className="messageLeftReciever" key={doc.id}>
                  <div className="messageLeftSenderMessage">
                    {doc.data.message}
                  </div>
                </div>
              )
            )}
          </div>
          <div className="messageMainSender">
            <input
              type="string"
              className="senderInput"
              autoFocus
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></input>
            <i className="fas fa-paper-plane" onClick={messageHandler}></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageMain;
