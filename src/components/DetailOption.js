import React from "react";
import { Link } from "react-router-dom";
import { deleteNote,archiveNote,unarchiveNote } from "../utils/network-data";
import PropTypes from 'prop-types';
import { useLang } from "../context/Lang";

const DetailOption = ({id,archive}) => {
    const [lang] = useLang();
    const isId = lang === 'id';

    const deleteHandle = () => {
        deleteNote(id);
        alert("Catatan berhasil dihapus!");
    }

    const archiveHandle = () => {
        archiveNote(id);
        alert("Catatan berhasil dipindahkan ke arsip!")
    }

    const unarchiveHandle = () => {
        unarchiveNote(id);
        alert("Catatan berhasil dipindahkan ke catatan aktif!")
    }

    return(
        <main className="mx-2 mt-5 p-3 bg-light option-style rounded d-flex flex-column">
            <h5>{isId ? "Opsi" : "Option"}</h5>
            <Link 
                className="w-100 py-2 my-2 primary-btn" 
                to={'/note'} 
                onClick={archive ? unarchiveHandle : archiveHandle}>
                <ArchiveToggle archive={archive} lang={lang}/>
            </Link>
            <Link className="w-100 py-2 my-2 delete-btn" to={'/'} onClick={deleteHandle}>
                {isId ? "Hapus Catatan" : "Delete Note"}
            </Link>
        </main>
    )
}

const ArchiveToggle = ({archive,lang}) => {
    if(lang === 'id'){
        return <>{archive ? "Batal Arsip" : "Masukkan Arsip"}</>
    }
    else return <>{archive ? "Unarchive Notes" : "Archive Note"}</>
}

ArchiveToggle.propTypes = {
    archive : PropTypes.bool.isRequired,
    lang : PropTypes.string.isRequired
}

DetailOption.propTypes = {
    id : PropTypes.string.isRequired,
    archived : PropTypes.bool.isRequired
}

export default DetailOption;