import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";

const useFetch = (url) => {
    const [data, setData] = useState(null);

    useEffect(()=>{
        axiosInstance.get(url)
            .then((res)=> setData(res.data));
    }, [url])

    return [data];
}

export default useFetch;
