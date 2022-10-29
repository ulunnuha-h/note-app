import React from "react";
import { Link } from "react-router-dom";
import { addNote } from "../utils/network-data";
import PropTypes from 'prop-types';
import { useLang } from "../context/Lang";

const AddOption = ({title,body}) => {
    const [lang] = useLang();
    const isId = lang === "id";

    const addHandler = () =>{
        if(title === "" || body === ""){
            alert("Menambah catatan gagal karena judul atau isi kosong :(");
        }
        else {
            addNote({title,body});
        }
    }

    return(
        <main className="m-2 p-3 bg-light option-style rounded d-flex flex-column">
            <h5>{isId ? "Opsi" : "Option"}</h5>
            <Link className="w-100 py-2 my-2 primary-btn" onClick={addHandler} to={'/'}>
                {isId ? "Tambah Catatan" : "Add Note"}
            </Link>
        </main>
    )
}

AddOption.propTypes = {
    title : PropTypes.string.isRequired,
    body : PropTypes.string.isRequired
}

export default AddOption;