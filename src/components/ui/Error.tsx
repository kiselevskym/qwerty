import { Box, Typography } from "@mui/material";
import React from "react";

interface ErrorProps {
  text: string;
}

const Error: React.FC<ErrorProps> = ({ text }) => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Typography component="h2">{text || "Error"}</Typography>
    </Box>
  );
};

export default Error;
