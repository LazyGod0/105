"use client";

import { ReactNode, useState } from "react";
import { Box, CssBaseline, styled, useMediaQuery, useTheme } from "@mui/material";
import AppNavBar from "./app-nav-bar";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  flexGrow: 1,
  minHeight: "100vh",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const LayoutChat = ({ children }: { children: ReactNode}) => {

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppNavBar/>
      {/* <SideMenu open={open} onClose={handleDrawerClose} variant={isMdUp ? "persistent" : "temporary"} reload={reload} /> */}
      <Main>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default LayoutChat;
