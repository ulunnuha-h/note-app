import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/Lang";

const Error404 = () => {
    const [lang] = useLang();
    const isId = lang === "id";

    return(
        <main className="page-style d-flex flex-column justify-content-center align-items-center">
            <h1>404</h1>
            <h3>
                {isId ? "Sepertinya halaman yang anda minta tidak ditemukan :(" : "Looks like something went wrong :("}
            </h3>
            <Link to={"/"}>Back</Link>
        </main>
    )
}

export default Error404;