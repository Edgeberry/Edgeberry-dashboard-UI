import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { api_things_getThingIndex, api_things_getThingShadow} from "../../api/things";
import NotificationBox from "../Notification";
import StatusIndicator from "../StatusIndicator";
import { direct_identifySystem } from "../../api/directMethods";
import LoaderOverlay from "../LoadingOverlay";
import { api_admin_getDeviceList } from "../../api/admin";

const AdminDeviceList = (props:{selected?:string})=>{
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);
    const[ thingList, setThingList ] = useState<any[]>([]);

    useEffect(()=>{
        getThingsList();
    },[]);

    /* Get the list of things from the API */
    async function getThingsList(){
        const result = await api_admin_getDeviceList();
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
            <Row className="asset-cartdeck" >
                {thingList.map((thing:any, index:number)=>{return <AdminDeviceListItem thing={thing} key={thing.name+'-'+index} selected={props.selected===thing.thingName}/>})}
            </Row>
        </Container>
    );
}


export default AdminDeviceList;

const AdminDeviceListItem = (props:{thing:any, selected:boolean})=>{
    // First-sight info about the device
    const[ connected, setConnected ] = useState<boolean>(false);        // the current connection state
    const[ deviceName, setDeviceName ] = useState<string>('');          // the name the user gave to the device
    const[ devicePlatform, setDevicePlatform ] = useState<string>('');  // the platform (e.g. Raspberry Pi 3B+)

    // Overlay
    const[ hidden, setHidden ] = useState<boolean>(true);
    const[ text, setText ] = useState<string>('Loading');
    const[ subText, setSubText ] = useState<string>('Loading');

    useEffect(()=>{
        updateAsset();
        // Poll the device info... bad idea... use sockets...
        // setInterval(()=>{updateAsset(false)},2000);
    },[]);

    // Set the spinner
    function setSpinner( visible:boolean, text?:string, subtext?:string ){
        setHidden(!visible);
        setText(text?text:'');
        setSubText(subtext?subtext:'');
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
        setDevicePlatform(result?.state?.reported?.system?.system?.platform);

        // The system state is maybe too deeply nested in the
        // 'thing shadow', but here it is. If the system is not 'running',
        // keep the spinner going and report the last known system state
        if( result?.state?.reported?.system?.system?.state !== 'running'){
            return setSpinner(true, result?.state?.reported?.system?.system?.state );
        }
        return setSpinner(false, result?.state?.reported?.system?.system?.state );
    }

    return(
        <Container className="asset-card-container">
            <Card className="asset-card">
                <LoaderOverlay text={text} subtext={subText} spinner hidden={hidden}/>
                <Row>
                    <Col xs='3' sm='2' md='1'>
                        <img src={process.env.PUBLIC_URL+'/Edgeberry_rendering.png'} style={{height:'60px'}} onClick={()=>{direct_identifySystem(props.thing.thingName)}} />
                    </Col>
                    <Col>
                        <div className="asset-card-body" style={{height:'100%', padding:'5px'}}>
                        <Card.Title className="asset-card-title">
                            <StatusIndicator noText message={connected?"Online":"Offline"} type={connected?"success":"danger"} />&nbsp;
                            {props.thing.thingName}
                        </Card.Title>
                        <Card.Text className="asset-card-text">
                            {devicePlatform?devicePlatform:props?.thing?.thingTypeName}
                        </Card.Text>
                        </div>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}
