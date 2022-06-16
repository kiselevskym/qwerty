import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader: React.FC = () => {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
