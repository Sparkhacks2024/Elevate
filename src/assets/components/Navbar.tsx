import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

function Navbar() {
  const navi = useNavigate();
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
        <Button
          onClick={() => {
            Cookies.remove("Token");
            navi("/");
          }}
          color="inherit"
          component={Link}
          to="/home"
        >
          <LogoutIcon />
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
