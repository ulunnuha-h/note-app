import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddOption from "../components/AddOption";
import { useLang } from "../context/Lang";

const AddNote = () => {
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [lang] = useLang();
    const isId = lang === 'id';

    const titleHandle = (e) => setTitle(e.target.value);
    const bodyHandle = (e) =>setBody(e.target.value);

    return(
        <main className="row mx-0 page-style">
                <article className="col-9 p-0">
                    <div className="note-detail p-5">
                        <input 
                            type={"text"} 
                            placeholder={isId ? "Tambahkan judul..." : "Add title..." }
                            className="title-input" 
                            onChange={titleHandle} 
                            value={title}/>
                        <textarea 
                            placeholder={isId ? "Tambahkan isi catatan..." : "Add note content..." }
                            className="body-input w-100" 
                            onChange={bodyHandle} 
                            value={body}/>
                    </div>
                </article>
                <aside className="col-3">
                    <AddOption {...{title,body}}/>
                    <section className="w-100 text-center ">
                        <Link to={-1} className="text-center page-style">Back</Link>
                    </section>
                </aside>
            </main>
    )    
}

export default AddNote;