import React, { useContext } from "react";

const LangContext = React.createContext();

const useLang = () => useContext(LangContext);
const LangProvider = LangContext.Provider;

export {useLang,LangProvider};