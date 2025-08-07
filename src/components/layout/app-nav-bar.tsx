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

  const modelList: Array<Model> = [
    { modelName: "Qwen-3", value: "qwen", imgUrl: "/svg/qwen-color.svg" },
    // {
    //   modelName: "DeepSeek-R1",
    //   value: "deepseek",
    //   imgUrl: "/image/deepseek-logo.png", // เพิ่มไฟล์ภาพไว้ใน public หรือใช้ URL ก็ได้
    // }
  ];

  return (
    <AppBar position="fixed" color="inherit" sx={{ boxShadow: 0 }}>
      <Toolbar>
        {/* <Tooltip title="Open sidebar" placement="bottom" arrow>
          <IconButton
            color="inherit"
            aria-label="open sidebar"
            onClick={onOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip> */}
        {/* <Tooltip title="New chat" placement="bottom" arrow>
          <IconButton
            color="inherit"
            aria-label="new chat"
            onClick={reload}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" },
            ]}
          >
            <ChatIcon />
          </IconButton>
        </Tooltip> */}
        <Box
          // onClick={handleClick}
          sx={(theme) => ({
            px: 2,
            py: 1,
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
                <Image src={'/harmony-ai-logo.png'} alt="harmony-ai" width={50} height={50}/>
                <Typography variant="subtitle1" fontWeight="medium">
                  Harmony AI
                </Typography>
              </Box>
              {/* {modelList.map((m) => {
                if (m.value === model) {
                  return (
                    <Stack
                      key={m.value}
                      direction="row"
                      alignItems="center"
                      spacing={1.5}
                    >
                      <Box
                        component="img"
                        src={m.imgUrl}
                        sx={{ width: 16, height: 16 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {m.modelName}
                      </Typography>
                    </Stack>
                  );
                }
              })} */}
              {/* {model === "qwen" ? (
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    component="img"
                    src={"/svg/qwen-color.svg"}
                    sx={{ width: 16, height: 16 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Alibaba Qwen
                  </Typography>
                </Stack>
              ) : (
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    component="img"
                    src={"/svg/nova-color.svg"}
                    sx={{ width: 16, height: 16 }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Amazon Nova Pro
                  </Typography>
                </Stack>
              )} */}
            </Box>
            {/* <KeyboardArrowDownIcon sx={{ ml: 0.5, color: "text.secondary" }} /> */}
          </Stack>
        </Box>
        <Box flexGrow={1} />
        {/* <Box>
          <IconButton onClick={toggleTheme}>
            {mode === "dark" ? (
              <DarkModeIcon fontSize="medium" />
            ) : (
              <LightModeIcon fontSize="medium" />
            )}
          </IconButton>
        </Box> */}
        {/* <Box sx={{ mx: 1 }}>
          {model === "qwen" ? (
            <Stack direction={"row"}>
              <Avatar
                alt="Qwen"
                sx={{ width: 24, height: 24, bgcolor: "white" }}
              >
                <Box
                  component="img"
                  src={"/svg/qwen-color.svg"}
                  sx={{ width: 24, height: 24 }}
                />
              </Avatar>
              <Typography variant="body1" sx={{ ml: 1 }}>
                Qwen 72B powered by Alibaba Cloud
              </Typography>
            </Stack>
          ) : (
            <Stack direction={"row"}>
              <Avatar
                alt="Qwen"
                sx={{ width: 24, height: 24, bgcolor: "white" }}
              >
                <Box
                  component="img"
                  src={"/svg/nova-color.svg"}
                  sx={{ width: 22, height: 22 }}
                />
              </Avatar>
              <Typography variant="body1" sx={{ ml: 1 }}>
                Novapro powered by Amazon Bedrock
              </Typography>
            </Stack>
          )}
        </Box> */}
        <Menu
          anchorEl={anchorEl}
          open={openModel}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          slotProps={{
            paper: {
              sx: {
                p: 1,
                mt: 1,
                borderRadius: 4,
                width: 300,
              },
            },
          }}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", mx: 2, mb: 1 }}
          >
            <Typography>Model</Typography>
            <InfoOutlineIcon fontSize="small" />
          </Stack>

          {[{ label: "Qwen", value: "qwen", image: "/svg/qwen-color.svg" }].map(
            (m) => (
              <MenuItem
                key={m.value}
                onClick={(e) => handleSelect(m.value)}
                selected={model === m.value}
                sx={{
                  borderRadius: 2,
                  justifyContent: "space-between",
                  alignItems: "center",
                  my: 0.5,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box
                    component="img"
                    src={m.image}
                    alt={m.label}
                    sx={{ width: 25, height: 25 }}
                  />
                  <Typography variant="caption">{m.label}</Typography>
                </Box>
                {model === m.value && (
                  <CheckCircleOutlineIcon fontSize="small" color="primary" />
                )}
              </MenuItem>
            )
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppNavBar;
