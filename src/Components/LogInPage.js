import React, { useState } from "react";
import "./LogInPage.css";
import welcome from "../Images/welcome_cats.svg";
import signin from "../Images/unlock.svg";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField, makeStyles } from "@material-ui/core";
import { auth } from "../firebase";

function LogInPage() {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const signInHandler = () => {
    setEmailMessage("");
    setPasswordErr(false);
    setEmailErr(false);
    setPasswordMessage("");
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        history.push("/home");
      })
      .catch((err) => {
        console.log("err is ", err.code);
        if (err.code === "auth/user-not-found") {
          setEmailErr(true);
          setEmailMessage("email not found");
        }
        if (err.code === "auth/wrong-password") {
          setPasswordErr(true);
          setPasswordMessage("password is invalid");
        }
        if (err.code === "auth/invalid-email") {
          setEmailErr(true);
          setEmailMessage("email format is bad");
        }
      });
  };
  return (
    <div className="logInPageContainer">
      <div className="backArrow">
        <Link to="/" className="link">
          <i
            style={{ fontSize: "30px", color: "crimson" }}
            className="fas fa-arrow-circle-left"
          ></i>
        </Link>
      </div>
      <div className="logInPageHero">
        <img src={signin} alt="signin"></img>
        <div className="signInForm">
          <img src={welcome} alt="signinLogo"></img>
          <TextField
            label="Email"
            type="email"
            className={classes.textField}
            value={email}
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            error={emailErr}
            helperText={emailMessage}
          ></TextField>
          <TextField
            label="password"
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
            onClick={signInHandler}
          >
            Login
          </Button>
          <p>
            If U don't Have Acc?{" "}
            <Link to="/signup" className="link">
              Sign Up
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

export default LogInPage;
