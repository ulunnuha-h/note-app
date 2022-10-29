import React from "react";
import { useLang } from "../context/Lang";

const LangToggle = () => {
    const [lang,langHandle] = useLang();

    return(
        <button 
            className="border-0 py-2 px-3 mx-1 rounded secondary-btn"
            onClick={langHandle}>
            {lang}
        </button>
    )
}

export default LangToggle;