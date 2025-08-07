"use client";

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import { PaletteMode } from "@type/theme";

type AppContextType = {
  mode: PaletteMode;
  toggleTheme: () => void;
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}
const AppContext = createContext<AppContextType>({
  mode: "dark",
  toggleTheme: () => {},
  model: "",
  setModel: () => {},
  reload: false,
  setReload: () => {},
});

export const useApp = () => {
  return useContext(AppContext);
};

type AppProviderProps = {
  children: ReactNode;
  initialMode?: PaletteMode;
};

export const AppProvider: FC<AppProviderProps> = ({
  children,
  initialMode,
}) => {
  // Always default to lightBlue theme on every visit
  const [mode, setMode] = useState<PaletteMode>(initialMode || "light");
  const [reload, setReload] = useState<boolean>(false);
  const [model, setModel] = useState<string>("qwen");

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    // Save in cookies with 7-day expiration
    Cookies.set("color-mode", newMode, { expires: 7 });
  };

  
const theme = useMemo(() => {
  // Base theme configuration shared between modes
  const baseTheme = {
    typography: {
      fontFamily: "Noto Sans Thai, sans-serif",
    },
  };

  // Create theme based on current mode
  if (mode === "dark") {
    return createTheme({
      ...baseTheme,
      palette: {
        mode: "dark", // Still use dark mode for proper contrast
        background: {
          default: "#BFECFF", // Dark blue background
          paper: "#E3F2FD",   // Much lighter blue for better text readability
        },
        text: {
          primary: "#000000", // Changed to black
          secondary: "#B0B0B0",
        },
        primary: {
          main: "#000000", // Keep your original primary color
        },
        secondary: {
          main: "#0D47A1", // Keep your original secondary color
        },
      },
    });
  } else if (mode === "light") {
    return createTheme({
      ...baseTheme,
      palette: {
        mode: "light", // Use light mode for proper contrast
        background: {
          default: "#faf5ff", // Light blue background
          paper: "#FFFFFF",   // Pure white for maximum contrast with black text
        },
        text: {
          primary: "#000000", // Changed to black
          secondary: "#132F4C",
        },
        primary: {
          main: "#F3E8FF", // Keep your original primary color
        },
        secondary: {
          main: "#8597CB", // Keep your original secondary color
        },
      },
    });
  } 
}, [mode]) || createTheme(); // Provide a default theme if undefined

  return (
    <AppContext.Provider value={{ toggleTheme, mode, model, setModel, reload, setReload }}>
      <ThemeProvider theme={theme} noSsr>
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
};

export default AppContext;