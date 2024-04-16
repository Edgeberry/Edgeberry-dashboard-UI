import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import NotificationBox from "./Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faTrash } from "@fortawesome/free-solid-svg-icons";
import StatusIndicator from "../components/StatusIndicator";
import { faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { api_things_delete, api_things_invokeDirectMethod } from "../api/things";

const AssetSystem = (props:{assetId:string})=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);
    // Error or success messages
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);

    // System
    const[ hwPlatform, setHwPlatform ] = useState<string>('');

    // Network
    const[ ssid, setSsid ] = useState<string>('');
    const[ ipAddress, setIpAddress ] = useState<string>('');

    // System application info
    const[ appVersion, setAppVersion ] = useState<string>('');
    const[ cpuUsage, setCpuUsage ] = useState<string>('');
    const[ memUsage, setMemUsage ] = useState<string>('');
    const[ appStatus, setAppStatus ] = useState<string>('');

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
/*
        const result = await api_system_updateSystemSoftware();
        if( !result.ok ){
            setIsError(true);
            setMessage(result.message);
        }
        else{
            setIsError(false);
            setMessage(result.message);
        }*/
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
            <br/>
            <Form.Group as={Row} className="mb-2">
                <Form.Label column sm={2}>Hardware platform</Form.Label>
                <Col sm={6}>
                    <Form.Control type={'text'} placeholder={'Hardware Platform'} value={hwPlatform} disabled/>
                </Col>
            </Form.Group>

            <br/>
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
            <hr/>

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
            <hr/>
            <h2>Delete</h2>
            <Button variant={'danger'} onClick={()=>{deleteAsset()}}><FontAwesomeIcon icon={faTrash}/> Delete</Button>
        </>
    );
}

export default AssetSystem;