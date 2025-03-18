"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { useThemeContext } from "@/app/context/ThemeContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Typography, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import "../styles/components/NavBar.scss";

export default function NavBar() {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext)!;
  const { toggleTheme, darkMode } = useThemeContext();

  return (
    <div className="navbar_container">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="navbar_container_items">
            <div className="navbar_container_title">
              <Typography variant="h5">SpaceFlux</Typography>
            </div>

            <div className="navbar_buttons">
              {user && (
                <Button
                  color="inherit"
                  onClick={() => router.push("/telescopes/add")}
                >
                  Add Telescope
                </Button>
              )}

              {user ? (
                <Button color="inherit" onClick={logout}>
                  Logout
                </Button>
              ) : (
                <Button color="inherit" onClick={() => router.push("/login")}>
                  Login
                </Button>
              )}

              <IconButton color="inherit" onClick={toggleTheme}>
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
