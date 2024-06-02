import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"

export const RoomComp = () => {
    const [searcParams, setSearchParams] = useSearchParams();
    const name = searcParams.get("name");

    useEffect(()=>{
    },[]);

    
    return <div>
        Room
    </div>
}