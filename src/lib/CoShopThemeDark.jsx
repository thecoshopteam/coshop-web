import { createTheme } from "@mui/material";

const CoShopThemeDark = createTheme({
  palette: {
    mode: 'dark', 
    primary: {
      main: "#826aed", 
      light: "#9985ff", 
      dark: "#5041b2",  
    },
    error: {
      main: "#ff6b6b",  
      light: "#ff9c9c",  
      dark: "#c73838",  
    },
    background: {
      default: "#121212",  
      paper: "#1e1e1e",  
      
    },
    text: {
      primary: "#ffffff", 
      secondary: "#b3b3b3",  
    }
  },
  typography: {
    fontFamily: "Inter",
    allVariants: {
      color: "#ffffff", 
    }
  },
});

export default CoShopThemeDark;
