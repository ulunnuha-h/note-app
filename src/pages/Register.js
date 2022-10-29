import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { register } from "../utils/network-data";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/Auth";
import { useLang } from "../context/Lang";

const Register = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirm,setConfirm] = useState('');
    const [loading,setLoading] = useState(false);
    const [auth] = useAuth()
    const [lang] = useLang();
    const isId = lang === "id";

    const nav = useNavigate();
    const nameHandler = e => setName(e.target.value);
    const emailHandler = e => setEmail(e.target.value);
    const passwordHandler = e => setPassword(e.target.value);
    const confirmHandler = e => setConfirm(e.target.value);

    const registerHandler = e => {
        e.preventDefault();
        setLoading(true);

        if(password === confirm){
            register({name,email,password})
            .then(res => {
                setLoading(false);
                if(!res.error){
                    alert("Akun berhasil dibuat");
                    nav("/login");
                }
            })
        }else {
            alert("Kedua password tidak sesuai");
            setLoading(false);
        }
    }

    if(auth) return(<Navigate to={"/"}/>);

    return(
        <main className="page-style d-flex">
            <div className=" w-25 h-75 m-auto">
                <h4>
                    {isId ? "Silakan lengkapi data untuk daftar !" : "Please fill in your data to register !"}
                </h4>
                <form className="d-flex flex-column" onSubmit={registerHandler}>
                    <label htmlFor="name">{isId ? "Nama" : "Name"}</label>
                    <input type="name" name="text" value={name} onChange={nameHandler}/>
                    <label htmlFor="email">{isId ? "Surel" : "Email"}</label>
                    <input type="email" name="email" value={email} onChange={emailHandler}/>
                    <label htmlFor="password">{isId ? "Kata Sandi" : "Password"}</label>
                    <input type="password" name="password" value={password} onChange={passwordHandler}/>
                    <label htmlFor="confirm">{isId ? "Konfirmasi Password" : "Confirm Password"}</label>
                    <input type="password" name="confirm" value={confirm} onChange={confirmHandler}/>
                    <button type="submit" className="mt-3 w-50 align-self-end primary-btn py-2">
                        {loading ? <Spinner/> : "Register" }
                    </button>
                    <span className="mt-5 align-self-center">
                        {isId ? "Sudah punya akun ?" : "Already have account ?"}
                        <Link to="/login"> Login</Link>
                    </span>
                </form>
            </div>
        </main>
    )
}

export default Register;