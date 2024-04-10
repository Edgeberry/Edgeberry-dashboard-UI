import { useEffect } from "react";
import { api_things_getThingsList } from "../api/things";

function Dashboard() {

    useEffect(()=>{
        getThingsList();
    },[])

    async function getThingsList(){
        const result = await api_things_getThingsList();
        console.log(result);
    }

    return (
        <div className="App">
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;
