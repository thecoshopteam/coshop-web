import { createTheme } from "@mui/material";

const CoShopTheme = createTheme({
  palette: {
    primary: {
      main: "#6B4EFF",
      light: "#9990FF",
      dark: "#5538EE",
    },
    error: {
      main: "#FF5247",
      light: "#FF6D6D",
      dark: "#D3180C",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});

export default CoShopTheme;
