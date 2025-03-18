"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import "../styles/components/NavBar.scss";
import { Typography } from "@mui/material";

export default function NavBar() {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext)!;

  return (
    <div className="navbar_container">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="navbar_container_items">
            <div className="navbar_container_title">
              <Typography variant="h5">SpaceFlux</Typography>
            </div>

            <div className="navbar_buttons">
              {user ? (
                <Button
                  color="inherit"
                  onClick={() => router.push("/telescopes/add")}
                >
                  Add Telescope
                </Button>
              ) : null}

              {user ? (
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <Button color="inherit" onClick={() => router.push("/login")}>
                  Login
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
