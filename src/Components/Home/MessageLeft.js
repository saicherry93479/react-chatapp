import React, { useLayoutEffect, useEffect, useState, useContext } from "react";
import { auth, db } from "../../firebase";
import UserLogo from "../UserLogo.js";
import { friendUserName } from "../HomePage";
import "./MessageLeft.css";
import UserDisplayer from "./UserDisplayer";
function MessageLeft() {
  const friend = useContext(friendUserName);
  const [userFriends, setUserFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [onlineRepeat, setOnlineRepeat] = useState(false);
  const messageLeftToMessage = (userName) => {
    console.log("cliked left ");

    // searchProps.setUsersBoolean(true);
    // searchProps.setSearchBoolean(false);
    // searchProps.setHelpBoolean(false);
    db.collection("users")
      .doc(auth.currentUser.displayName)
      .update({
        lastChatFriend: userName,
      })
      .then((res) => {
        console.log("updated");
        friend.setUserNameFriend(userName);
      });
  };
  useEffect(() => {
    setTimeout(() => {
      setOnlineRepeat(!onlineRepeat);
      var today = new Date();
      console.log(
        "repeated at ",
        today.getHours() + "  " + today.getMinutes() + " " + today.getSeconds()
      );
    }, 30000);
  }, [onlineRepeat]);
  useLayoutEffect(() => {
    var friends = [];
    db.collection("users")
      .doc(auth.currentUser.displayName)
      .collection("friends")
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          var name;

          db.collection("users")
            .doc(doc.data().userName)
            .get()
            .then((snap) => {
              if (
                snap.data().isLoggedIn &&
                snap.data().userName !== auth.currentUser.displayName
              ) {
                friends.push(snap.data());
              }
            });
        });
      });
    setTimeout(() => {
      setOnlineFriends(friends);
    }, 2000);

    return () => setOnlineFriends([]);
  }, [refresh, onlineRepeat]);

  useLayoutEffect(() => {
    if (auth.currentUser.displayName) {
      db.collection("users")
        .doc(auth.currentUser.displayName)
        .collection("friends")
        .onSnapshot((snapshot) => {
          setUserFriends(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, []);
  return (
    <div>
      <div className="messageLeftProfiler">
        <div>
          {auth.currentUser ? (
            auth.currentUser.photoURL ? (
              <img
                src={auth.currentUser.photoURL}
                style={{ width: "90px", height: "90px" }}
              ></img>
            ) : (
              <UserLogo height="90px" width="90px" />
            )
          ) : null}
        </div>
        <p style={{ marginTop: "0px", cursor: "pointer" }}>
          {auth.currentUser ? auth.currentUser.displayName : "account"}
        </p>
      </div>
      <div className="messageLeftOnliner">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            background: "lightBlue",
            height: "4vh",
            alignItems: "center",
          }}
        >
          <h4 style={{ margin: "0px", marginLeft: "10px" }}>Online</h4>
          <i
            className="fas fa-redo"
            style={{ marginRight: "10px", cursor: "pointer" }}
            onClick={() => setRefresh(!refresh)}
          ></i>
        </div>
        <div className="messageLeftOnlinerFriends">
          <div>
            <div className="searchScrollMessageLeftOnlineFriends">
              {onlineFriends.map((doc, key) => (
                <div
                  key={key}
                  style={{
                    // background: "red",
                    width: "10vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {auth.currentUser ? (
                    auth.currentUser.photoURL ? (
                      <img
                        src={auth.currentUser.photoURL}
                        style={{ width: "25px", height: "25px" }}
                      ></img>
                    ) : (
                      <UserLogo height="25px" width="25px" />
                    )
                  ) : null}
                  <p style={{ margin: "0px" }}>
                    {doc.userName.substring(0, 5) + ".."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="messageLeftchatFriends">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3
            style={{ marginLeft: "10px", fontWeight: "500", color: "hotpink" }}
          >
            Recent Chats
          </h3>
        </div>

        <div>
          {/* <h2>Recent Chats</h2> */}
          <div className="searchScrollerMessageLeft">
            {userFriends.map((doc, index) => (
              <div key={index}>
                <UserDisplayer
                  userData={doc}
                  searchToMessage={messageLeftToMessage}
                ></UserDisplayer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageLeft;
