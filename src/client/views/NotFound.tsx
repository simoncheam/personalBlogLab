import * as React from "react";
import { useLocation } from "react-router-dom";


const NotFound =() => {
    const {pathname} = useLocation();


    return <h1 className="diplay-1 text-danger">No "{pathname}" Found</h1>
}

export default NotFound;