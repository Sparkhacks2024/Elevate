import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static" style={{ width: "100%" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Elevate
        </Typography>
        <Button color="inherit" component={Link} to="/logging">
          Log Workout
        </Button>
        <Button color="inherit" component={Link} to="/routine">
          My Routines
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
