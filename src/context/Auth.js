import React, { useContext } from "react";

const AuthContext = React.createContext(false);

const useAuth = () => useContext(AuthContext);
const AuthProvider = AuthContext.Provider;

export {useAuth,AuthProvider};