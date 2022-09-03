import React, { useState } from "react";
import { register } from "../services/UserService";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button, message } from "antd";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameValid, setUsernameValid] = useState(true);
  const [usernameError, setUsernameError] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [admin, setAdmin] = useState(false);

  function handleRegistration() {
    const emailRegex = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    const passwordRegex = new RegExp(
      "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$"
    );

    if (
      username.length > 4 &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password == confirmPassword
    ) {
      register({
        username: username,
        email: email,
        password: password,
        admin: admin,
      })
        .then(() => {
          props.setOpenRegisterDialog(false);
          props.setErrorMessage("");
          message.success("Successfully registered");
        })
        .catch((error) =>
          props.setErrorMessage(error.response.data.message, username)
        );
    }
    if (username.length < 5) {
      setUsernameValid(false);
      setUsernameError("Username should have at least 5 characters");
    } else {
      setUsernameValid(true);
      setUsernameError("");
    }
    if (!emailRegex.test(email)) {
      setEmailValid(false);
      setEmailError("Invalid email");
    } else {
      setEmailValid(true);
      setEmailError("");
    }
    if (!passwordRegex.test(password)) {
      setPasswordValid(false);
      setPasswordError(
        "Password should have minimum six characters, at least one letter and one number"
      );
    } else {
      setPasswordValid(true);
      setPasswordError("");
    }
    if (password != confirmPassword) {
      setConfirmPasswordValid(false);
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordValid(true);
      setConfirmPasswordError("");
    }
  }

  return (
    <Dialog
      open={props.openRegisterDialog}
      onClose={() => {
        props.setOpenRegisterDialog(false);
        props.setErrorMessage("");
      }}
    >
      <DialogContent>
        {<h2>Register</h2>}
        {<h3 style={{ color: "red" }}>{props.errorMessage}</h3>}
        <TextField
          autoFocus
          label="Username"
          variant="outlined"
          required={true}
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
          error={!usernameValid}
          helperText={usernameError}
        />
        <TextField
          style={{ marginTop: "2%" }}
          label="Email"
          variant="outlined"
          required={true}
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
          error={!emailValid}
          helperText={emailError}
        />
        <TextField
          style={{ marginTop: "2%" }}
          label="Password"
          type="password"
          variant="outlined"
          required={true}
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          error={!passwordValid}
          helperText={passwordError}
        />
        <TextField
          style={{ marginTop: "2%" }}
          label="Confirm password"
          type="password"
          variant="outlined"
          required={true}
          fullWidth
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!confirmPasswordValid}
          helperText={confirmPasswordError}
        />
        <FormGroup>
          <FormControlLabel
            onChange={() => setAdmin(!admin)}
            control={<Checkbox color="primary" />}
            label="Admin"
          />
        </FormGroup>
        <DialogActions>
          <Button
            type="primary"
            danger
            onClick={() => {
              props.setOpenRegisterDialog(false);
              props.setErrorMessage("");
            }}
          >
            Cancel
          </Button>
          <Button type="primary" onClick={() => handleRegistration()}>
            Sing up
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
