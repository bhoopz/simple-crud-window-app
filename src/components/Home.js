import React, { useEffect, useState } from "react";
import { getWindows } from "../services/WindowService";
import { Grid, Typography, TextField } from "@material-ui/core";
import { Button, message } from "antd";
import "antd/dist/antd.css";
import Cookies from "universal-cookie";
import mainWindow from "../window.jpg";
import WindowList from "./WindowList";
import ConfirmDelete from "./ConfirmDelete";
import Login from "./Login";
import Register from "./Register";
import WindowEdit from "./WindowEdit";
import WindowCreate from "./WindowCreate";

function Home() {
  const [data, setData] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const cookies = new Cookies();

  message.config({
    top: 150,
  });

  const fetchWindows = async () => {
    const res = await getWindows(query);
    setData(res.data);
  };

  useEffect(() => {
    fetchWindows();
  }, [query]);

  useEffect(() => {
    setIsLogged(cookies.get("ISLOGGED"));
    setIsAdmin(cookies.get("ISADMIN"));
  }, []);

  function handleLogout() {
    cookies.remove("ISLOGGED");
    cookies.remove("ISADMIN");
    setIsLogged(false);
    setIsAdmin(false);
  }

  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <Typography component="h4" variant="h4">
          Window Panel
        </Typography>
        <div>
          <img style={{ width: "35%" }} src={mainWindow} alt="window.jpg" />
        </div>
        {isLogged ? (
          <>
            <div>
              <Button
                style={{ width: "20%" }}
                type="primary"
                danger
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
            </div>

            <TextField
              style={{ marginRight: "85%" }}
              variant="outlined"
              label="Search..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <WindowList
              data={data}
              isAdmin={isAdmin}
              setOpenEditDialog={setOpenEditDialog}
              setOpenDeleteDialog={setOpenDeleteDialog}
              setSelectedRow={setSelectedRow}
            ></WindowList>
            <Button
              type="primary"
              disabled={isAdmin == "false" || !isAdmin}
              onClick={() => setOpenAddDialog(true)}
            >
              Add window
            </Button>
          </>
        ) : (
          <>
            <div>
              <div style={{ fontSize: "1.5vw" }}>
                <b>Log in to manage the window panel</b>
              </div>
              <Button
                style={{ width: "20%", marginTop: "1%" }}
                type="primary"
                onClick={() => setOpenLoginDialog(true)}
              >
                Login
              </Button>
            </div>
            <div style={{ fontSize: "1.5vw" }}>
              <b>Or</b>
            </div>
            <Button
              style={{ width: "20%" }}
              type="danger"
              onClick={() => setOpenRegisterDialog(true)}
            >
              Register
            </Button>
            <div style={{ fontSize: "1.5vw", marginTop: "1%" }}>
              <b>if you don't have account</b>
            </div>
          </>
        )}

        <Login
          openLoginDialog={openLoginDialog}
          setOpenLoginDialog={setOpenLoginDialog}
          setIsLogged={setIsLogged}
          setIsAdmin={setIsAdmin}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          cookies={cookies}
        />

        <Register
          setOpenRegisterDialog={setOpenRegisterDialog}
          openRegisterDialog={openRegisterDialog}
          setErrorMessage={setErrorMessage}
          errorMessage={errorMessage}
        />

        <ConfirmDelete
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
          selectedRow={selectedRow}
          fetchWindows={fetchWindows}
        />

        <WindowEdit
          openEditDialog={openEditDialog}
          setOpenEditDialog={setOpenEditDialog}
          fetchWindows={fetchWindows}
          selectedRow={selectedRow}
        />

        <WindowCreate
          openAddDialog={openAddDialog}
          setOpenAddDialog={setOpenAddDialog}
          fetchWindows={fetchWindows}
        />
      </Grid>
    </Grid>
  );
}

export default Home;
