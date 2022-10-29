import React from "react";
import '../styles/index.css';
import PropTypes from 'prop-types';
import { showFormattedDate } from "../utils";
import { Link } from "react-router-dom";

const Note = ({data}) => {
    const {title,createdAt,body,id} = data;

    return(
        <main className="p-2 note-card">
            <div className="p-3 rounded box-shadow">
                <Link to={`/note/${id}`}>
                    <h2 className="m-0">{title}</h2>
                </Link>
                <span>{showFormattedDate(createdAt)}</span>
                <p>{body}</p>
            </div>
        </main>
    )
}

Note.propTypes = {
    data : PropTypes.object.isRequired
}

export default Note;