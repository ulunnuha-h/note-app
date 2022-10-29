import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNote } from "../utils/network-data";
import Spinner from "../components/Spinner";
import { showFormattedDate } from "../utils";
import PropTypes from 'prop-types';
import DetailOption from "../components/DetailOption";

const DetailWrapper = () => {
    const {id} = useParams();
    const [data,setData] = useState();
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        getNote(`notes-${id}`).then(({data})=>{
            setData(data);
            setLoading(false);
        })
    },[id]);

    if(loading) return <LoadingPage/>;

    return(
        <main className="row mx-0 page-style">
            <Detail data={data}/>
            <aside className="col-3">
                <DetailOption id={data.id} archive={data.archived}/>
                <section className="w-100 text-center">
                    <Link to={-1} className="text-center page-style">Back</Link>
                </section>
            </aside>
        </main>
    )
}

const Detail = (props) => {
    const {title,createdAt,body} = props.data;
    return(
        <article className="col-9 p-0">
            <div className="note-detail p-5">
                <h1> {title} </h1>
                <span> {showFormattedDate(createdAt)} </span>
                <p> {body} </p>
            </div>
        </article>
    )
}

const LoadingPage = () => {
    return(
        <main className="row mx-0 page-style d-flex align-items-center">
            <Spinner/>
        </main>
    )
}

Detail.propTypes = {
    title : PropTypes.string,
    createdAt : PropTypes.string,
    body : PropTypes.string
}

export default DetailWrapper;