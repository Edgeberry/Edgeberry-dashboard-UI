import { useEffect, useState } from "react";
import { api_things_getThingsList } from "../api/things";
import NotificationBox from "../components/Notification";

function Dashboard() {
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);
    const[ thingList, setThingList ] = useState<any[]>([]);

    useEffect(()=>{
        getThingsList();
    },[])

    async function getThingsList(){
        const result = await api_things_getThingsList();
        console.log(result);
        if( result.message ){
            setIsError(true);
            setMessage(result.message);
            return;
        }
        setThingList(result);
    }

    return (
        <div className="App">
            <h1>Dashboard</h1>
            {thingList.map( (thing:any)=>{return <>{thing.thingName}<br/></>})}

            <NotificationBox message={message} isError={isError}/>
        </div>
    );
}

export default Dashboard;
