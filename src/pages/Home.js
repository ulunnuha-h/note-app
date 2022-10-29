import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import { getActiveNotes,getArchivedNotes } from "../utils/network-data";
import PropTypes from 'prop-types';
import MainOption from "../components/MainOption";
import SearchBar from "../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useLang } from "../context/Lang";

const Home = () => {
    const [queryParams,setQueryParams] = useSearchParams();
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [archive,setArchieve] = useState(false);
    const [lang] = useLang();

    const archiveHandle = () => setArchieve(!archive);

    const getQueryKey = () => {
        return queryParams.get("key");
    }

    const queryHandle = (e) => {
        setQueryParams({
            key : e.target.value
        })
    }

    const dataHandle = (key) => {
        setLoading(true);
        if(archive){
            getArchivedNotes().then(({data}) => {
                setData(filterNotes(data,key));
                setLoading(false);
            })
        }   
        else{
            getActiveNotes().then(({data}) => {
                setData(filterNotes(data,key));
                setLoading(false);
            })
        }
    }

    const keyHandle = e => {
        queryHandle(e);
        dataHandle(e.target.value);
    }

    useEffect(()=>{
        dataHandle(getQueryKey() || '');
    },[archive])

    return(
        <main className="page-style">
            <Title archive={archive} lang={lang}/>
            <SearchBar keyWord={getQueryKey()} keyHandle={keyHandle}/>
            <section className="row mx-0 w-100">
                {!loading ? <Notes data={data} lang={lang}/>:<Loading/>}
                <aside className="col-2 p-0">
                    <MainOption archive={archive} archiveHandle={archiveHandle}/>
                </aside>
            </section>
        </main>
    )
}

const Title = ({archive,lang}) => {
    if(lang === "id"){
        return <h2 className="p-4">Catatan {archive ? "Arsip" : "Aktif"}</h2>
    }
    else return <h2 className="p-4">{archive ? "Archive" : "Active"} Notes</h2>
}

const filterNotes = (array, key) => {
    return array.filter((data) => data.title.toLowerCase().indexOf(key.toLowerCase()) !== -1)
}

const Notes = ({data,lang}) => {
    const isId = lang === 'id';

    if(data.length === 0) 
    return(
        <div className="col-10 row row-cols-3 d-flex flex-column justify-content-center align-items-center">
            <h4>{isId ? "Tidak ada catatan :(" : "This section is empty :("}</h4>
            <span>
                {isId ? "Silakan tambah beberapa catatan" : "Please add some notes"}
            </span>
        </div>
    );

    return(
        <article className="col-10 row row-cols-3 ">
            {data.map((val,idx)=><Note data={val} key={idx}/>)}
        </article>
    )
}

const Loading = () => {
    return(
        <div className="col-10 row row-cols-3 d-flex flex-column justify-content-center align-items-center">
            <Spinner/>
        </div>
    )
}

Title.propTypes = {
    archive : PropTypes.bool.isRequired,
    lang : PropTypes.string.isRequired
}

Notes.propTypes = {
    data : PropTypes.arrayOf(PropTypes.object).isRequired
}

export default Home;