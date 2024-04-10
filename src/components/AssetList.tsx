import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { api_things_getThingsList } from "../api/things";
import NotificationBox from "./Notification";
import { JsxElement } from "typescript";

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
            setThingElementList(thingElementList => [...thingElementList, <AssetListItem thing={thing} key={thing.thingName}/>]);
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
    return(
        <div className="asset-list-item">
            <div className="asset-list-item-indicator">
                
            </div>
            <div className="asset-list-item-content">
                <h1 className="asset-list-item-header">{props.thing.thingName}</h1>
                <p className="asset-list-item-text">{true?"EdgeBerry Device":props.thing.thingArn}</p>
            </div>
        </div>
    );
}
