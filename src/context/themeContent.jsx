import React, { createContext, useState, useContext } from 'react';
import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import CoShopTheme from "../lib/CoShopTheme";
import CoShopThemeDark from "../lib/CoShopThemeDark";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(CoShopTheme);

    const switchTheme = () => {
        setTheme(theme === CoShopTheme ? CoShopThemeDark : CoShopTheme);
    };

    const muiTheme = createTheme(theme);

    return (
        <ThemeContext.Provider value={{ theme, switchTheme }}>
            <MUIThemeProvider theme={muiTheme}>
            <CssBaseline/>
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
