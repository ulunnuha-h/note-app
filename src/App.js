import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NoteDetail from "./pages/Detail";
import AddNote from "./pages/AddNote";
import Error404 from "./pages/404";
import { AuthProvider, useAuth } from "./context/Auth";
import { ThemeProvider } from "./context/Theme";
import { LangProvider } from "./context/Lang";
import { getUserLogged,removeAccessToken } from "./utils/network-data";
import ThemeToggle from "./components/ThemeToggle";
import LangToggle from "./components/LangToggle";

const note = "/note";

function App() {
    const [auth,setAuth] = useState(false);
    const [theme,setTheme] = useState(localStorage.getItem('theme') || "light");
    const [lang,setLang] = useState(localStorage.getItem('lang') || "id");
    const isId = lang === 'id';

    const authHandle = (val) => setAuth(val);
    const themeHandle = () => {
        const current = (theme === "light" ? "dark" : "light");
        setTheme(current);
        localStorage.setItem('theme',current);
    }

    const langHandle = () => {
        const current = (lang === "id" ? "en" : "id");
        setLang(current);
        localStorage.setItem('lang',current);
    }

    useEffect(()=>{
        getUserLogged().then(({error}) => {
            if(error) {
                removeAccessToken();
                authHandle(false);
            }
            else authHandle(true);
        })
    },[])

    useEffect(()=>{
        document.documentElement.setAttribute('data-theme',theme);
    },[theme])

    return (
        <LangProvider value={[lang,langHandle]}>
            <ThemeProvider value={[theme,themeHandle]}>
                <header className="d-flex justify-content-between align-items-center">
                    <section className="d-flex align-items-center">
                        <h1 className="p-3 m-0">{isId ? "Aplikasi Catatan" : "Note App"}</h1>
                        <ThemeToggle/>
                        <LangToggle/>
                    </section>
                    <span className="p-3">
                        {isId ? "Dibuat dengan ☕ oleh" : "Made with ☕ by"} Hanif Ulunnuha Hidayat
                    </span>
                </header>
            </ThemeProvider>
            <hr className="m-0"/>
            <AuthProvider value={[auth]}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to={note}/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path={`/${note}`} element={<ProtectedRoute/>}>
                            <Route index element={<Home/>}/>
                            <Route path={`notes-:id`} element={<NoteDetail/>}/>
                            <Route path={`new`} element={<AddNote/>}/>
                            <Route path={`*`} element={<Error404/>}/>
                        </Route>
                        <Route path="/*" element={<Error404/>}/>
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </LangProvider>
    );
}

const ProtectedRoute = () => {
    const [auth] = useAuth();

    return(
        <>
            {auth ? <Outlet/> : <Navigate to={'/login'}/>} 
        </>
    )
}

export default App;