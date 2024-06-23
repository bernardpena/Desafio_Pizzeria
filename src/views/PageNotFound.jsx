import React from "react";

import notFound from '../assets/img/notFound.png'
import "../assets/css/pageNotFound.css"

const NotFound = () => {
    return (
        <div className="divNotFound" >
            <img className="imgNotFound" src={notFound} alt="not found" />
        </div>

    )
}

export default NotFound;