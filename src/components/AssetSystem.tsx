import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import NotificationBox from "./Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faTrash } from "@fortawesome/free-solid-svg-icons";
import StatusIndicator from "../components/StatusIndicator";
import { faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { api_things_delete, api_things_invokeDirectMethod } from "../api/things";
import { direct_getSystemApplicationInfo, direct_getSystemNetworkInfo, direct_updateSystemApplication } from "../api/directMethods";

const AssetSystem = (props:{assetId:string, assetShadow:any })=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);
    // Error or success messages
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);

    // Network
    const[ ssid, setSsid ] = useState<string>('');
    const[ ipAddress, setIpAddress ] = useState<string>('');

    // System application info
    const[ appVersion, setAppVersion ] = useState<string>('');
    const[ cpuUsage, setCpuUsage ] = useState<string>('');
    const[ memUsage, setMemUsage ] = useState<string>('');
    const[ appStatus, setAppStatus ] = useState<string>('');

    useEffect(()=>{
        getSystemNetworkInfo();
        getSystemApplicationInfo();
    },[])

    // Disappearing messages
    useEffect(()=>{
        if( message === '' ) return;
        setTimeout(()=>{
            setMessage('');
            setIsError(false);
        },3500);
    },[message]);

    // Get system application info
    async function getSystemNetworkInfo(){
        if( !props.assetId ) return;
        setDisabled(true);
        const result = await direct_getSystemNetworkInfo( props.assetId );
        if(!result){
            setDisabled(false);
            return;
        }          
        if(result.message){
            setIsError(true);
            setMessage(result.message);
        }
        else {
            // Set the parameters in the fields
            if( typeof(result.ssid) === 'string' ) setSsid(result.ssid);
            if( typeof(result.ipAddress) === 'string' ) setIpAddress(result.ipAddress);
        }
        setDisabled(false);
    }

    // Get system application info
    async function getSystemApplicationInfo(){
        if( !props.assetId ) return;
        setDisabled(true);
        const result = await direct_getSystemApplicationInfo( props.assetId );
        if(!result){
            setDisabled(false);
            return;
        }          
        if(result.message){
            setIsError(true);
            setMessage(result.message);
        }
        else {
            // Set the parameters in the fields
            if( typeof(result.version) === 'string' ) setAppVersion(result.version);
            if( typeof(result.cpuUsage) === 'string' ) setCpuUsage(result.cpuUsage);
            if( typeof(result.memUsage) === 'string' ) setMemUsage(result.memUsage);
            if( typeof(result.status) === 'string' ) setAppStatus(result.status);
        }
        setDisabled(false);
    }

    // Request system restart
    async function requestSystemRestart(){
        // Check if user is sure about this action
        if( !window.confirm("Restart system?") ) return;
        setDisabled(true);

        const result = await api_things_invokeDirectMethod( props.assetId, 'reboot', '');
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
        const result = await api_things_invokeDirectMethod( props.assetId, 'identify', '');

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

    // Request system restart
    async function requestSystemSoftwareUpdate(){
        // Check if user is sure about this action
        if( !window.confirm("Update system software?") ) return;
        setDisabled(true);

        const result = await direct_updateSystemApplication(props.assetId);
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
            <p className="text-subtitle">Everything related to this device and the EdgeBerry system software</p>
            <NotificationBox message={message} isError={isError} />
            <h2>Network</h2>
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>SSID</Form.Label>
                <Col sm={6}>
                    <Form.Control type={'text'} placeholder={'SSID'} value={ssid} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>IP address</Form.Label>
                <Col sm={6}>
                    <Form.Control type={'text'} placeholder={'IP address'} value={ipAddress} disabled/>
                </Col>
            </Form.Group>

            <h2>Hardware</h2>
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>Computing Platform</Form.Label>
                <Col sm={6}>
                    <Form.Control type={'text'} placeholder={'Hardware Platform'} value={props.assetShadow?.state?.reported?.system?.system?.platform} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>Hardware Board</Form.Label>
                <Col sm={6}>
                    <Form.Control type={'text'} placeholder={'Hardware board'} value={props.assetShadow?.state?.reported?.system?.system?.board !== 'unknown' ?props.assetShadow?.state?.reported?.system?.system?.board +' Rev '+props.assetShadow?.state?.reported?.system?.system?.board_version:'unknown'} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>Hardware UUID</Form.Label>
                <Col sm={6}>
                    <Form.Control type={'text'} placeholder={'Hardware UUID'} value={props.assetShadow?.state?.reported?.system?.system?.uuid} disabled/>
                </Col>
            </Form.Group>

            <h2>System software</h2>
            <StatusIndicator message={appStatus==='online'?'Running':appStatus} type={appStatus==='online'?'success':'danger'}/>
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>CPU usage</Form.Label>
                <Col sm={6}>
                    <Form.Control type={'text'} placeholder={'CPU usage'} value={cpuUsage} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>Memory usage</Form.Label>
                <Col sm={6}>
                    <Form.Control type={'text'} placeholder={'Memory usage'} value={memUsage} disabled/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>Application version</Form.Label>
                <Col sm={6}>
                    <Form.Control type={'text'} placeholder={'Version'} value={appVersion} disabled/>
                </Col>
            </Form.Group>
            <NotificationBox message={message} isError={isError} />
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}></Form.Label>
                <Col sm={6}>
                    <Button variant={'danger'} onClick={()=>{requestSystemSoftwareUpdate()}} disabled={disabled}>Update</Button>
                </Col>
            </Form.Group>
            <br/>

            <h2>Delete</h2>
            <p className="text-subtitle">Delete this device from the platform.</p>
            <Button variant={'danger'} onClick={()=>{deleteAsset()}}><FontAwesomeIcon icon={faTrash}/> Delete</Button>
        </>
    );
}

export default AssetSystem;