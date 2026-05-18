import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [refetchIndex, setRefetchIndex] = useState(0);

    const refetch = useCallback(() => setRefetchIndex(prev => prev + 1), []);

    useEffect(()=>{
        axiosInstance.get(url)
            .then((res)=> setData(res.data));
    }, [url, refetchIndex])

    return [data, refetch];
}

export default useFetch;
