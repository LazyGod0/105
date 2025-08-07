import { FC, useState, useEffect } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useApp } from "@context/app-context";
import { useRouter } from "next/navigation";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Image from "next/image";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

type Model = {
  modelName: string;
  value: string;
  imgUrl: string;
};

const AppNavBar: FC = () => {
  const router = useRouter();
  const { model, setModel, mode, toggleTheme } = useApp();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openModel = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (value: string) => {
    setModel(value);
    handleClose();
  };

  return (
    <AppBar position="fixed" color="inherit" sx={{ boxShadow: 0 }}>
      <Toolbar>
        <Box
          // onClick={handleClick}
          sx={(theme) => ({
            px: 2,
            py: 0.5,
            my: 0.3,
            borderRadius: 2,
            // cursor: "pointer",

            // "&:hover": {
            //   bgcolor: theme.palette.action.hover,
            // },
            display: "inline-block",
          })}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Box>
              <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                <Image src={'/105-chat.png'} alt="harmony-ai" width={75} height={75}/>
              </Box>
            </Box>
            {/* <KeyboardArrowDownIcon sx={{ ml: 0.5, color: "text.secondary" }} /> */}
          </Stack>
        </Box>
        <Box flexGrow={1} />
      </Toolbar>
    </AppBar>
  );
};

export default AppNavBar;
