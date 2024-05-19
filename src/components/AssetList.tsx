import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { api_things_getThingIndex, api_things_getThingsList, api_things_invokeDirectMethod } from "../api/things";
import NotificationBox from "./Notification";
import { useNavigate } from "react-router-dom";
import StatusIndicator from "./StatusIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { direct_identifySystem } from "../api/directMethods";

const AssetList = (props:{selected?:string})=>{
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);
    const[ thingList, setThingList ] = useState<any[]>([]);

    useEffect(()=>{
        getThingsList();
    },[]);

    /* Get the list of things from the API */
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
        <Container>
            <NotificationBox message={message} isError={isError}/>
            <Row className="asset-cartdeck" >
                {thingList.map((thing:any, index:number)=>{return <AssetListItem thing={thing} key={thing.name+'-'+index} selected={props.selected===thing.thingName}/>})}
            </Row>
        </Container>
    );
}


export default AssetList;

const AssetListItem = (props:{thing:any, selected:boolean})=>{
    const[ connected, setConnected ] = useState<boolean>(false);

    useEffect(()=>{
        getThingIndex();
    },[]);

    async function getThingIndex(){
        const result = await api_things_getThingIndex(props.thing.thingName);
        if( result.message ){
            // TODO - do something with the error...
            return;
        }
        setConnected(result?.connectivity?.connected);
    }

    // When 'edit' is clicked, navigate to details
    const navigate = useNavigate();
    function navigateToAssetDetails(){
        navigate('/dashboard/assets/'+props.thing.thingName);
    }

    return(
        <Col className="asset-card-container" xl='3' lg='4' md='6' sm='6' xs='12'>
            <Card className="asset-card">
            <div className="asset-card-menu" onClick={navigateToAssetDetails}>
                <Button variant={'primary'} className="asset-card-menu-btn"><FontAwesomeIcon icon={faPencil}/></Button>
                <Button variant={'danger'} className="asset-card-menu-btn"><FontAwesomeIcon icon={faPowerOff}/></Button>
            </div>
            <Card.Img variant="top" src={process.env.PUBLIC_URL+'/Edgeberry_rendering.png'} style={{minHeight:'200px'}} onClick={()=>{direct_identifySystem(props.thing.thingName)}} />
            <Card.Body className="asset-card-body">
            <Card.Title className="asset-card-title">
                <StatusIndicator noText message={connected?"Online":"Offline"} type={connected?"success":"danger"} />&nbsp;
                {props.thing.thingName}
            </Card.Title>
            <Card.Text>
                {props.thing.thingTypeName?props.thing.thingTypeName:''}
            </Card.Text>
            </Card.Body>
        </Card>
      </Col>
    );
}
