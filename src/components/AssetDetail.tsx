import { useEffect, useState } from "react";
import { Button, Container, Tab, Tabs } from "react-bootstrap";
import { api_things_delete, api_things_getThingDescription, api_things_getThingShadow, api_things_invokeDirectMethod } from "../api/things";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightArrowLeft, faPowerOff, faTrash } from "@fortawesome/free-solid-svg-icons";
import CommandModal from "./CommandModal";
import AssetConnection from "./AssetConnection";
import AssetSystem from "./AssetSystem";

const AssetDetail = ( props:{assetId?:string})=>{
    const[ description, setDescription ] = useState<any|null>(null);
    const[ shadow, setShadow ] = useState<any|null>(null);

    // Command Modal
    const[ show, setShow ] = useState<boolean>(false);

    useEffect(()=>{
        getThingDescription();
        getThingShadow();
    },[props.assetId]);

    // Get the Thing description
    async function getThingDescription(){
        if( !props.assetId ) return;
        const result = await api_things_getThingDescription(props.assetId);
        if( result.message ){
            // TODO: do something with the error
            return;
        }
        setDescription(result);
    }

    async function getThingShadow(){
        if( !props.assetId ) return;
        const result = await api_things_getThingShadow(props.assetId);
        if( result.message ){
            // TODO: do something with the error
            console.log(result.message);
            return;
        }
        setShadow(result);
    }

    
    if(!props.assetId) return <h1>No asset selected</h1>;
    return(
        <Container className="container-fluid">
            <div style={{float:'right'}}>
                <Button variant={'primary'} onClick={()=>{setShow(true)}}><FontAwesomeIcon icon={faArrowRightArrowLeft}/> Command</Button>
            </div>
            <CommandModal show={show} deviceId={description?.thingName?description.thingName:''} onClose={()=>{setShow(false)}}/>

            <h1>{description && description?.thingName?description.thingName:'No asset ID'}</h1>
            <p className="text-subtitle">
                {description && description?.thingTypeName? description.thingTypeName:'No asset type'} &nbsp;
                {shadow && shadow?.state?.reported?.system?.system?.version? shadow?.state?.reported?.system?.system?.version:'No hardware platform'} &nbsp;
                ({shadow && shadow?.state?.reported?.system?.system?.platform? shadow?.state?.reported?.system?.system?.platform:'No hardware platform'})
            </p>
        
            <Tabs defaultActiveKey="application" className="mb-3">
                <Tab eventKey="application" title={"Application"}>
                    Tab content for application
                </Tab>
                <Tab eventKey="connection" title={"Connection"}>
                    <AssetConnection assetId={props.assetId} />
                </Tab>
                <Tab eventKey="System" title={"System"}>
                    <AssetSystem assetId={props.assetId} />
                </Tab>
            </Tabs>
        </Container>
    );
}

export default AssetDetail;