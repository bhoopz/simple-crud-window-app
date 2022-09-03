import React, { useState } from "react";
import { addWindow } from "../services/WindowService";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Button, message } from "antd";
import { TextField, MenuItem } from "@material-ui/core";

const WindowCreate = (props) => {
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [priceValid, setPriceValid] = useState(true);
  const [sizeValid, setSizeValid] = useState(true);
  const [priceError, setPriceError] = useState("");
  const [sizeError, setSizeError] = useState("");

  function addRecord() {
    const priceRegex = new RegExp("^[0-9]+(.[0-9]{2})?$");
    const sizeRegex = new RegExp("([0-9]+[\\s]X[\\s][0-9]+$)");

    if (priceRegex.test(price) && sizeRegex.test(size)) {
      props.setOpenAddDialog(false);
      addWindow({
        type: type,
        size: size,
        material: material,
        color: color,
        price: price,
      })
        .then(() => props.fetchWindows(), message.success("Added"))
        .catch(() => message.error("Something went wrong"));
    }
    if (!priceRegex.test(price)) {
      setPriceValid(false);
      setPriceError("Please enter a valid price *.__");
    } else {
      setPriceValid(true);
      setPriceError("");
    }
    if (!sizeRegex.test(size)) {
      setSizeValid(false);
      setSizeError("Please enter a valid size * X *");
    } else {
      setSizeValid(true);
      setSizeError("");
    }
  }
  return (
    <Dialog
      open={props.openAddDialog}
      onClose={() => props.setOpenAddDialog(false)}
    >
      <DialogContent>
        {<h2>Add new window</h2>}
        <TextField
          autoFocus
          label="Type"
          required={true}
          fullWidth
          onChange={(e) => setType(e.target.value)}
        />
        <TextField
          label="Size"
          required={true}
          fullWidth
          onChange={(e) => setSize(e.target.value)}
          error={!sizeValid}
          helperText={sizeError}
        />
        <TextField
          select
          label="Material"
          required={true}
          defaultValue={""}
          fullWidth
          onChange={(e) => setMaterial(e.target.value)}
        >
          <MenuItem value={"UPVC"}>UPVC</MenuItem>
          <MenuItem value={"Wood"}>Wood</MenuItem>
          <MenuItem value={"Aluminum"}>Aluminum</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </TextField>
        <TextField
          label="Color"
          required={true}
          fullWidth
          onChange={(e) => setColor(e.target.value)}
        />
        <TextField
          label="Price $"
          required={true}
          fullWidth
          onChange={(e) => setPrice(e.target.value)}
          error={!priceValid}
          helperText={priceError}
        />
        <DialogActions>
          <Button
            type="primary"
            danger
            onClick={() => props.setOpenAddDialog(false)}
          >
            Cancel
          </Button>
          <Button type="primary" onClick={() => addRecord()}>
            Add window
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default WindowCreate;
