import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import NotificationBox from "./Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faTrash } from "@fortawesome/free-solid-svg-icons";
import StatusIndicator from "../components/StatusIndicator";
import { faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { api_things_delete } from "../api/things";
import { direct_getSystemApplicationInfo, direct_getSystemNetworkInfo, direct_identifySystem, direct_restartSystem, direct_updateSystemApplication } from "../api/directMethods";
import AssetAttributes from "./AssetAttributes";
import AssetSystemSoftware from "./AssetSystemSoftware";
import AssetSystemHardware from "./AssetSystemHardware";
import AssetSystemNetwork from "./AssetSystemNetwork";

const AssetSystem = (props:{assetId:string, assetShadow:any })=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);
    // Error or success messages
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);

    // Disappearing messages
    useEffect(()=>{
        if( message === '' ) return;
        setTimeout(()=>{
            setMessage('');
            setIsError(false);
        },3500);
    },[message]);
    // Request system restart
    async function requestSystemRestart(){
        // Check if user is sure about this action
        if( !window.confirm("Restart system?") ) return;
        setDisabled(true);

        const result = await direct_restartSystem( props.assetId );
        if( !result.ok ){
            setIsError(true);
            setMessage(result.message);
        }
        else{
            setIsError(false);
            setMessage(result.message);
        }
        setDisabled(false);
        return;
    }

    // Request system identification
    async function requestSystemIdentifycation(){
        const result = await direct_identifySystem( props.assetId );

        if( !result.ok ){
            setIsError(true);
            setMessage(result.message);
        }
        else{
            setIsError(false);
            setMessage(result.message);
        }
        return;
    }

    // Delete Asset
    async function deleteAsset(){
        if( !window.confirm("Delete '"+props.assetId+"'?")) return;

        const result = await api_things_delete( props.assetId );
        if( result.message ){
            // TODO: do something with the error
            console.log(result.message);
        }
    }

    return(
        <>
            <div style={{float:'right'}}>
                <Button variant={'danger'} className="mb-2" onClick={()=>{requestSystemRestart()}} disabled={disabled}><FontAwesomeIcon icon={faPowerOff}/> Restart</Button>&nbsp;
                <Button variant={'primary'} className="mb-2" onClick={()=>{requestSystemIdentifycation()}} disabled={disabled}><FontAwesomeIcon icon={faSmileBeam}/> Identify</Button>
            </div>
            <h1>System</h1>
            <p className="text-subtitle">Everything related to this device and the Edgeberry system software</p>
            <NotificationBox message={message} isError={isError} />
            <AssetSystemNetwork assetId={props.assetId} assetShadow={props.assetShadow} />
            <br/>
            <AssetSystemHardware assetId={props.assetId} assetShadow={props.assetShadow} />
            <br/>
            <AssetAttributes assetId={props.assetId} assetShadow={props.assetShadow} />
            <br/>
            <AssetSystemSoftware assetId={props.assetId} assetShadow={props.assetShadow} />
            <br/>
            <h2>Delete</h2>
            <p className="text-subtitle">Delete this device from the platform.</p>
            <Button variant={'danger'} onClick={()=>{deleteAsset()}}><FontAwesomeIcon icon={faTrash}/> Delete</Button>
        </>
    );
}

export default AssetSystem;