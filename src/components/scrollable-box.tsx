import { Box, styled } from '@mui/material';

const ScrollableBox = styled(Box)(({ theme }) => ({
  overflowY: 'auto',
  flexGrow: 1,
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    background: theme.palette.background.default,
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.divider,
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: theme.palette.text.secondary,
  },
}));

export default ScrollableBox;