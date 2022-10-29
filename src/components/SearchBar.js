import React from "react";
import PropTypes from 'prop-types';

const SearchBar = ({keyWord,keyHandle}) => {

    return(
        <div className="mx-2">
            <input 
                placeholder="Cari catatan..." 
                className="w-50" 
                type={"text"} 
                value={keyWord || ""} 
                onChange={keyHandle}/>
        </div>
    )
}

SearchBar.propTypes = {
    keyWord : PropTypes.string,
    keyHandle : PropTypes.func.isRequired
}

export default SearchBar;