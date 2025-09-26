import React from "react";
import { TextField } from "@mui/material";

const CustomTextField = ({ label, name, value, onChange, type = "text", select = false, children }) => (
  <TextField
    fullWidth
    margin="normal"
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    type={type}
    select={select}
  >
    {children}
  </TextField>
);

export default CustomTextField;
