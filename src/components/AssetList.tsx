import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { api_things_getThingIndex, api_things_getThingsList } from "../api/things";
import NotificationBox from "./Notification";
import { Navigate, useNavigate } from "react-router-dom";

const AssetList = ()=>{
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);
    const[ thingList, setThingList ] = useState<any[]>([]);
    const[ thingElementList, setThingElementList ] = useState<JSX.Element[]>([]);

    useEffect(()=>{
        getThingsList();
    },[]);

    /* Visual elements for each Thing */
    useEffect(()=>{
        setThingElementList([]);
        if( thingList.length <= 0 ) return;
        thingList.map( (thing:any)=>{
            return setThingElementList(thingElementList => [...thingElementList, <AssetListItem thing={thing} key={thing.thingName}/>]);
        });
    },[thingList]);

    /* Get the list of thins from the API */
    async function getThingsList(){
        const result = await api_things_getThingsList();
        if( result.message ){
            setIsError(true);
            setMessage(result.message);
            return;
        }
        setThingList(result);
    }

    return(
        <Container className="asset-list-container">
            <NotificationBox message={message} isError={isError}/>
            {thingElementList}
        </Container>
    );
}

export default AssetList;

const AssetListItem = (props:{thing:any})=>{
    const[ connected, setConnected ] = useState<boolean>(false);

    useEffect(()=>{
        getThingIndex();
    },[])

    async function getThingIndex(){
        const result = await api_things_getThingIndex(props.thing.thingName);
        if( result.message ){
            // TODO - do something with the error...
            return;
        }
        setConnected(result?.connectivity?.connected);
    }

    const navigate = useNavigate();
    function navigateToAssetDetails(){
        navigate('/dashboard/assets/'+props.thing.thingName);
    }

    return(
        <div className="asset-list-item" onClick={navigateToAssetDetails}>
            <div className="asset-list-item-indicator" style={{backgroundColor:connected?'#0007ff':'red'}}>
                
            </div>
            <div className="asset-list-item-content">
                <h1 className="asset-list-item-header">{props.thing.thingName}</h1>
                <p className="asset-list-item-text">{props.thing.thingTypeName?props.thing.thingTypeName:''}</p>
            </div>
        </div>
    );
}
