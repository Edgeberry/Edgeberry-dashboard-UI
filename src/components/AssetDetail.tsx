import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { api_things_delete, api_things_getThingDescription, api_things_getThingShadow, api_things_invokeDirectMethod } from "../api/things";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightArrowLeft, faPowerOff, faTrash } from "@fortawesome/free-solid-svg-icons";
import CommandModal from "./CommandModal";
import AssetConnection from "./AssetConnection";

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

    // Identify the device 
    async function identify(){
        const result = await api_things_invokeDirectMethod( description.thingName, 'identify', '');
        if( result.message ){
            // TODO: do something with the error
            return;
        }
        return;
    }

    // Reboot the device
    async function restart(){
        const result = await api_things_invokeDirectMethod( description.thingName, 'reboot', '');
        if( result.message ){
            // TODO: do something with the error
            return;
        }
    }

    // Delete Asset
    async function deleteAsset(){
        if( !window.confirm("Delete '"+description.thingName+"'?")) return;

        const result = await api_things_delete( description.thingName);
        if( result.message ){
            // TODO: do something with the error
            console.log(result.message);
            return;
        }

    }
    
    if(!props.assetId) return <h1>No asset selected</h1>;
    return(
        <Container className="container-fluid">
            <div style={{float:'right'}}>
                <Button variant={'primary'} onClick={()=>{setShow(true)}}><FontAwesomeIcon icon={faArrowRightArrowLeft}/> Command</Button>
                <Button variant={'primary'} className="mx-1" onClick={()=>{identify()}}><FontAwesomeIcon icon={faSmileBeam}/></Button>
                <Button variant={'danger'} className="mx-1" onClick={()=>{deleteAsset()}}><FontAwesomeIcon icon={faTrash}/></Button>
                <Button variant={'danger'} onClick={()=>{restart()}}><FontAwesomeIcon icon={faPowerOff}/></Button>
            </div>
            <CommandModal show={show} deviceId={description?.thingName?description.thingName:''} onClose={()=>{setShow(false)}}/>

            <h1>{description && description?.thingName?description.thingName:'No asset ID'}</h1>
            <p className="text-subtitle">
                {description && description?.thingTypeName? description.thingTypeName:'No asset type'} &nbsp;
                {shadow && shadow?.state?.reported?.system?.system?.version? shadow?.state?.reported?.system?.system?.version:'No hardware platform'} &nbsp;
                ({shadow && shadow?.state?.reported?.system?.system?.platform? shadow?.state?.reported?.system?.system?.platform:'No hardware platform'})
            </p>
            <hr/>
            <AssetConnection assetId={props.assetId} />
            <hr/>
        </Container>
    );
}

export default AssetDetail;