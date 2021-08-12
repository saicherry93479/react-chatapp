import React, { useEffect, useState, createContext } from "react";
import { auth, db } from "../firebase";
import { useHistory } from "react-router-dom";
import NavBar from "./Home/NavBar";
import Message from "./Home/Message";
import Search from "./Home/Search";
import Help from "./Home/Help";

export const friendUserName = createContext(null);
function HomePage() {
  const [userNameFriend, setUserNameFriend] = useState("");
  const [usersBoolean, setUsersBoolean] = useState(true);
  const [searchBoolean, setSearchBoolean] = useState(false);
  const [helpBoolean, setHelpBoolean] = useState(false);
  const navProps = {
    usersBoolean,
    setUsersBoolean,
    searchBoolean,
    setSearchBoolean,
    helpBoolean,
    setHelpBoolean,
  };
  const friendUserNameDetails = {
    userNameFriend,
    setUserNameFriend,
  };

  const history = useHistory();
  useEffect(() => {
    if (auth.currentUser && auth.currentUser.displayName) {
      db.collection("users")
        .doc(auth.currentUser.displayName)
        .update({
          isLoggedIn: true,
        })
        .then((res) => console.log("logged in"));
      db.collection("users").doc(auth.currentUser.displayName).update({
        isLoggedIn: true,
      });
    }
  }, []);
  useEffect(() => {
    if (auth.currentUser && auth.currentUser.displayName) {
      db.collection("users")
        .doc(auth.currentUser.displayName)
        .get()
        .then((snap) => {
          setUserNameFriend(snap.data().lastChatFriend);
        });
    }
  }, []);
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

  return (
    <>
      <friendUserName.Provider value={friendUserNameDetails}>
        {auth.currentUser ? (
          <div style={{ display: "flex" }}>
            <NavBar navProps={navProps} />
            {usersBoolean ? (
              <Message />
            ) : searchBoolean ? (
              <Search searchProps={navProps} />
            ) : helpBoolean ? (
              <Help />
            ) : null}
          </div>
        ) : (
          history.push("/")
        )}
      </friendUserName.Provider>
    </>
  );
}

export default HomePage;
