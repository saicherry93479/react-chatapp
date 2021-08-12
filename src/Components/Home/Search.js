import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "../../firebase";
import "./Search.css";
import { friendUserName } from "../HomePage";
import UserDisplayer from "./UserDisplayer";
function Search(props) {
  const friend = useContext(friendUserName);
  const [searchIn, setSearchIn] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [userFriends, setUserFriends] = useState([]);
  const { searchProps } = props;
  const searchToMessage = (userName) => {
    friend.setUserNameFriend(userName);
    searchProps.setUsersBoolean(true);
    searchProps.setSearchBoolean(false);
    searchProps.setHelpBoolean(false);
    db.collection("users").doc(auth.currentUser.displayName).update({
      lastChatFriend: userName,
    });
    db.collection("users")
      .doc(auth.currentUser.displayName)
      .collection("friends")
      .doc(userName)
      .set({
        userName: userName,
      });
  };

  const searchHandler = (e) => {
    setSearchIn(e.target.value);
    if (auth.currentUser && auth.currentUser.displayName) {
      if (e.target.value.length > 0) {
        db.collection("users")
          .orderBy("userName")
          .startAt(e.target.value)
          .endAt(e.target.value + "\uf8ff")
          .onSnapshot((snap) => {
            setSearchUsers(
              snap.docs.map((doc) => {
                return doc.data();
              })
            );
          });
      } else {
        setSearchUsers([]);
      }
    }
  };
  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(auth.currentUser.displayName)
      .collection("friends")
      .onSnapshot((snapshot) => {
        setUserFriends(snapshot.docs.map((doc) => doc.data()));
      });
    return unsubscribe;
  }, []);
  return (
    <div className="searchHero">
      <div className="searchContainer">
        <div>
          <h2 style={{ fontWeight: "300" }}>Search for Friends</h2>
          <input
            type="text"
            className="inputSearch"
            value={searchIn}
            onChange={searchHandler}
            autoFocus
          ></input>
          <div className="searchScroller">
            {searchUsers.map((doc, index) => {
              if (doc.userName !== auth.currentUser.displayName) {
                return (
                  <div key={index}>
                    <UserDisplayer
                      userData={doc}
                      searchToMessage={searchToMessage}
                    ></UserDisplayer>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>

      <div className="searchFriendsContainer">
        <div>
          <h2 style={{ fontWeight: "300" }}>Your Friends</h2>
          <input type="text" className="inputSearch"></input>
          <div className="searchScrollerRight">
            {userFriends.map((doc, index) => (
              <div key={index}>
                <UserDisplayer
                  userData={doc}
                  searchToMessage={searchToMessage}
                ></UserDisplayer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
