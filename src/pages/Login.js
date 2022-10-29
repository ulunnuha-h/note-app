import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { login, putAccessToken } from "../utils/network-data";
import { useAuth } from "../context/Auth";
import Spinner from "../components/Spinner";
import { useLang } from "../context/Lang";

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [auth] = useAuth();
    const [lang] = useLang();
    const isId = lang === "id";

    const emailHandler = e => setEmail(e.target.value);
    const passwordHandler = e => setPassword(e.target.value);

    const loginHandler = e => {
        e.preventDefault();
        setLoading(true);

        login({email,password})
        .then(res => {
            if(!res.error){
                putAccessToken(res.data.accessToken);
                window.location.reload();
            }
            setLoading(false);
        })
    }

    if(auth) return(<Navigate to={"/"}/>);

    return(
        <main className="page-style d-flex">
            <div className=" w-25 h-75 m-auto">
                <h4>{isId? "Silakan login terlebih dahulu" : "Please login first"}</h4>
                <form className="d-flex flex-column" onSubmit={loginHandler}>
                    <label htmlFor="email">{isId ? "Surel" : "Email"}</label>
                    <input type="email" name="email" value={email} onChange={emailHandler}/>
                    <label htmlFor="password">{isId ? "Kata Sandi" : "Password"}</label>
                    <input type="password" name="password" value={password} onChange={passwordHandler}/>
                    <button type="submit" className="mt-3 w-50 align-self-end primary-btn py-2">
                        {loading ? <Spinner/> : "Login" }
                    </button>
                    <span className="mt-5 align-self-center">{isId? "Tidak punya akun ?":"Don't have account ?"}
                        <Link to="/register">{isId ? "Daftar" : "Register"}</Link>
                    </span>
                </form>
            </div>
        </main>
    )
}

export default Login;