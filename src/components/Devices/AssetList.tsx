import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { api_things_getThingIndex, api_things_getThingShadow, api_things_getThingsList } from "../../api/things";
import NotificationBox from "../Notification";
import { useNavigate } from "react-router-dom";
import StatusIndicator from "../StatusIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faLocationDot, faPencil, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { direct_identifySystem, direct_restartSystem } from "../../api/directMethods";
import LoaderOverlay from "../LoadingOverlay";

const AssetList = forwardRef((props:{selected?:string},ref)=>{
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);
    const[ thingList, setThingList ] = useState<any[]>([]);

    // Function callable by parent
    useImperativeHandle(ref,()=>({
        refresh(){ getThingsList()}       
    }));

    useEffect(()=>{
        getThingsList();
    },[]);

    /* Get the list of things from the API */
    async function getThingsList(){
        setThingList([]);
        const result = await api_things_getThingsList();
        if( result.message ){
            setIsError(true);
            setMessage(result.message);
            return;
        }
        setThingList(result);
    }

    return(
        <Container>
            <NotificationBox message={message} isError={isError}/>
            {thingList.length >= 1?
                <Row className="asset-cartdeck" >
                    {thingList.map((thing:any, index:number)=>{return <AssetListItem thing={thing} key={thing.name+'-'+index} selected={props.selected===thing.thingName}/>})}
                </Row>:
                <Alert>
                    <FontAwesomeIcon icon={faInfoCircle} /> <strong>You don't seem to have any devices yet</strong>. To add your first device, click the 'Add device' button below.
                </Alert>
            }
        </Container>
    );
});


export default AssetList;

const AssetListItem = (props:{thing:any, selected:boolean})=>{
    // First-sight info about the device
    const[ connected, setConnected ] = useState<boolean>(false);        // the current connection state
    const[ deviceName, setDeviceName ] = useState<string>('');          // the name the user gave to the device
    const[ devicePlatform, setDevicePlatform ] = useState<string>('');  // the platform (e.g. Raspberry Pi 3B+)

    // Overlay
    const[ hidden, setHidden ] = useState<boolean>(true);
    const[ text, setText ] = useState<string>('Loading');
    const[ subText, setSubText ] = useState<string>('Loading');
    const[ spinner, showSpinner ] = useState<boolean>(true);

    useEffect(()=>{
        updateAsset();
        // Poll the device info... bad idea... use sockets...
        // setInterval(()=>{updateAsset(false)},2000);
    },[]);

    // Set the spinner
    function setSpinner( visible:boolean, text?:string, subtext?:string, spinner?:boolean ){
        setHidden(!visible);
        setText(text?text:'');
        setSubText(subtext?subtext:'');
        showSpinner(spinner===false?false:true);
    }

    // Update Asset
    async function updateAsset(){
        setSpinner( true );
        await getThingIndex();
        await getThingShadow();
        // Spinner is hidden (or kept) by result
        // from the device shadow system state (!)
    }

    // The 'Thing Index' contains information like
    // the connection state (+ timestamp), thing type, ... . And our
    // custom attributes 'deviceName' and 'deviceOwner' from the thing
    // template. Note that the 'thingId' from the result is not the
    // deviceId from the device EEPROM (!). - TODO: check possibilities
    async function getThingIndex(){
        const result = await api_things_getThingIndex(props.thing.thingName);
        if( result.message ){
            // TODO - do something with the error...
            // although this rarely/never errors. Low priority
            return setSpinner(true, result.message, 'Retry later...');
        }
        setConnected(result?.connectivity?.connected);
        setDeviceName(result?.attributes?.deviceName);
    }

    // The 'Thing Shadow' contains information about the device state
    // like what the last known state is of the system (e.g. 'rebooting',
    // 'updating', 'running')
    async function getThingShadow(){
        const result = await api_things_getThingShadow(props.thing.thingName);
        if( result.message ){
            // TODO - do something with the error...
            // although this rarely/never errors. Low priority
            return setSpinner(true, result.message, 'Retry later...');
        }
        // The device hardware platform is also in this info
        setDevicePlatform(result?.state?.reported?.system?.system?.board+" Rev.:"+result?.state?.reported?.system?.system?.board_version);

        // The system state is maybe too deeply nested in the
        // 'thing shadow', but here it is. If the system is not 'running',
        // keep the spinner going and report the last known system state
        if( result?.state?.reported?.system?.system?.state !== 'running'){
            console.log(result);
            if( result?.metadata?.reported?.system?.system?.state?.timestamp < Math.floor((Date.now()-1000*60*5)/1000)){
                return setSpinner(true, 'Offline', new Date(result?.metadata?.reported?.system?.system?.state?.timestamp*1000).toUTCString(),false );
            }
            return setSpinner(true, result?.state?.reported?.system?.system?.state );
        }
        return setSpinner(false, result?.state?.reported?.system?.system?.state );
    }

    // When 'edit' is clicked, navigate to details
    const navigate = useNavigate();
    function navigateToAssetDetails(){
        navigate('/assets/'+props.thing.thingName);
    }

    // When 'power' is clicked, reboot the device
    function restartDevice(){
        // Ask the user if they are sure; they love that
        if( !window.confirm('Restart this device?')) return;
        direct_restartSystem(props.thing.thingName);
    }

    return(
        <Col className="asset-card-container" xl='3' lg='4' md='4' sm='6' xs='6'>
            <Card className="asset-card">
                <LoaderOverlay text={text} subtext={subText} spinner={spinner} hidden={hidden}/>
                <div className="asset-card-menu">
                    <Button variant={'primary'} className="asset-card-menu-btn" onClick={()=>{direct_identifySystem(props.thing.thingName)}}><FontAwesomeIcon icon={faLocationDot}/></Button>
                    <Button variant={'primary'} className="asset-card-menu-btn" onClick={navigateToAssetDetails}><FontAwesomeIcon icon={faPencil}/></Button>
                    <Button variant={'danger'} className="asset-card-menu-btn" onClick={restartDevice}><FontAwesomeIcon icon={faPowerOff}/></Button>
                </div>
                <Card.Img variant="top" src={process.env.PUBLIC_URL+'/Edgeberry_rendering.png'} style={{minHeight:'200px'}} onClick={navigateToAssetDetails} />
                <Card.Body className="asset-card-body">
                <Card.Title className="asset-card-title">
                    <StatusIndicator noText message={connected?"Online":"Offline"} type={connected?"success":"danger"} />&nbsp;
                    {deviceName?deviceName:props.thing.thingName}
                </Card.Title>
                <Card.Text className="asset-card-text">
                    {devicePlatform?devicePlatform:props?.thing?.thingTypeName}
                </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}
