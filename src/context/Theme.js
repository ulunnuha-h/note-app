import React, { useContext } from "react";

const ThemeContext = React.createContext();

const useTheme = () => useContext(ThemeContext);
const ThemeProvider = ThemeContext.Provider;

export {useTheme,ThemeProvider};