import React, { useState } from "react";
import signUp from "../Images/signup.svg";
import "./SignUpPage.css";
import signUpLogo from "../Images/signUpLogo.svg";
import { Button, TextField, makeStyles } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "../firebase";

const intialState = "atleast 6 characters";
function SignUpPage() {
  const history = useHistory();
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userNameErr, setUserNameErr] = useState(false);
  const [userNameMessage, setUserNameMessage] = useState(intialState);
  const [emailErr, setEmailErr] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(intialState);
  const signUpHandler = () => {
    setUserNameErr(false);
    setPasswordErr(false);
    setPasswordMessage(intialState);
    setEmailErr(false);
    setEmailMessage("");
    setUserNameMessage(intialState);
    if (userName.length > 6) {
      setUserNameMessage(intialState);
      db.collection("users")
        .doc(userName)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUserNameErr(true);
            setUserNameMessage("already userName exists");
          } else {
            if (password.length > 6) {
              setPasswordErr(false);
              setPasswordMessage(intialState);
              auth
                .createUserWithEmailAndPassword(email, password)
                .then((user) => {
                  user.user.updateProfile({
                    displayName: userName,
                  });
                  db.collection("users").doc(userName).set({
                    email: email,
                    password: password,
                    userName: userName,
                    photoUrl: user.user.photoURL,
                    isLoggedIn: false,
                    lastChatFriend: "",
                  });
                  history.push("/login");
                })
                .catch((err) => {
                  setEmailErr(true);
                  if (email.length > 6) {
                    setEmailMessage("already email exist");
                  } else {
                    setEmailMessage("please Enter Email");
                  }
                });
            } else {
              setPasswordErr(true);
              setPasswordMessage("password is less than 6");
            }
          }
        });
    } else {
      setUserNameErr(true);
      setUserNameMessage("userName is less than 6 characters");
    }
  };
  return (
    <div className="signUpPageContainer">
      <div className="backArrow">
        <Link to="/" className="link">
          <i
            style={{ fontSize: "30px", color: "crimson" }}
            className="fas fa-arrow-circle-left"
          ></i>
        </Link>
      </div>
      <div className="signUpPageHero">
        <img src={signUp} alt="signup"></img>
        <div className="signUpForm">
          <img src={signUpLogo} alt="signuplogo"></img>
          <TextField
            label="UserName"
            autoFocus
            className={classes.textField}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            error={userNameErr}
            helperText={userNameMessage}
          ></TextField>
          <TextField
            label="Email"
            className={classes.textField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailErr}
            helperText={emailMessage}
          ></TextField>
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.textField}
            error={passwordErr}
            helperText={passwordMessage}
          ></TextField>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={signUpHandler}
          >
            SignUp
          </Button>
          <p>
            If U have Acc?
            <Link to="/login" className="link">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
const useStyles = makeStyles({
  textField: {
    marginTop: "20px",
  },
  button: {
    marginTop: "20px",
  },
});

export default SignUpPage;
