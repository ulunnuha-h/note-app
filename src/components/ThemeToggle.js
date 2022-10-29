import React from "react";
import { useTheme } from "../context/Theme";
import {FaMoon, FaSun} from "react-icons/fa";

const ThemeToggle = () => {
    const [theme,themeHandle] = useTheme();

    return(
        <button 
            onClick={themeHandle}
            className="border-0 py-2 px-3 rounded option-style">                
            {theme === 'light' ? 
                <> Dark Mode <FaMoon/> </>: 
                <> Light Mode <FaSun/> </>
            }
        </button>
    )
}

export default ThemeToggle;