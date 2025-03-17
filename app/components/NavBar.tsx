"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

export default function NavBar() {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext)!;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {user ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => router.push("/login")}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
