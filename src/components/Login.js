import React, { useState } from "react";
import { login } from "../services/UserService";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button } from "antd";
import { TextField } from "@material-ui/core";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    login({
      username: username,
      password: password,
    })
      .then((response) => {
        props.setOpenLoginDialog(false);
        props.setIsLogged(response.data.isLogged);
        props.setIsAdmin(response.data.isAdmin);
        props.cookies.set("ISLOGGED", response.data.isLogged);
        props.cookies.set("ISADMIN", response.data.isAdmin);
      })
      .catch((error) => props.setErrorMessage(error.response.data.message));
  }

  return (
    <Dialog
      open={props.openLoginDialog}
      onClose={() => {
        props.setOpenLoginDialog(false);
        props.setErrorMessage("");
      }}
    >
      <DialogContent>
        {<h2>Login</h2>}

        <TextField
          autoFocus
          label="Username"
          variant="outlined"
          required={true}
          fullWidth
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          style={{ marginTop: "2%" }}
          label="Password"
          type="password"
          variant="outlined"
          required={true}
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
        {<h3 style={{ color: "red" }}>{props.errorMessage}</h3>}
        <DialogActions>
          <Button
            type="primary"
            danger
            onClick={() => {
              props.setOpenLoginDialog(false);
              props.setErrorMessage("");
            }}
          >
            Cancel
          </Button>
          <Button type="primary" onClick={() => handleLogin()}>
            Log in
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
