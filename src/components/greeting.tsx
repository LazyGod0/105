import { FC } from "react";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import { useApp } from "@context/app-context";

const Greeting: FC = () => {
  const currentHour = dayjs().hour();

  let greetingText = "";

  if (currentHour >= 5 && currentHour < 12) {
    greetingText = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingText = "Good Afternoon";
  } else {
    greetingText = "Good Evening"
  }

  return (
    <Typography
      variant="h6"
      sx={{
        my: 2,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 32,
      }}
    >
      {greetingText}
    </Typography>
  );
};

export default Greeting;
