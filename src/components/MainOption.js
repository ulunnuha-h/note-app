import React from "react";
import { Link } from "react-router-dom";
import { removeAccessToken } from "../utils/network-data";
import PropTypes from 'prop-types';
import { useLang } from "../context/Lang";

const MainOption = ({archive,archiveHandle}) => {
    const [lang] = useLang();
    const isId = lang ==="id";

    const logOutHandle = () => {
        removeAccessToken();
        window.location.reload();
    }

    return(
        <main className="m-2 p-3 bg-light option-style rounded d-flex flex-column">
            <h5>{isId ? "Opsi" : "Option"}</h5>
            <Link className="w-100 py-2 my-2 primary-btn" to={'/note/new'}>
                {isId ? "Tambah Catatan" : "Add Note" }
            </Link>
            <button 
                className="w-100 py-2 my-2 primary-btn"
                onClick={archiveHandle}>
                <ArchiveToggle archive={archive} lang={lang}/>
            </button>
            <button className="w-100 py-2 my-2 secondary-btn" onClick={logOutHandle}>
                Logout
            </button>
        </main>
    )
}

const ArchiveToggle = ({archive,lang}) => {
    if(lang === 'id'){
        return <>{archive ? "Buka Catatan Aktif" : "Buka Catatan Arsip"}</>
    }
    else return <>{archive ? "Open Active Notes" : "Open Archive Notes"}</>
}

ArchiveToggle.propTypes = {
    archive : PropTypes.bool.isRequired,
    lang : PropTypes.string.isRequired
}

MainOption.propTypes = {
    archive : PropTypes.bool.isRequired,
    archiveHandle : PropTypes.func.isRequired
}

export default MainOption;