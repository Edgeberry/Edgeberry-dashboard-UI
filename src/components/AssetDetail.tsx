import { useEffect, useState } from "react";
import { Button, Container, Tab, Tabs } from "react-bootstrap";
import { api_things_getThingDescription, api_things_getThingShadow } from "../api/things";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CommandModal from "./CommandModal";
import AssetConnection from "./AssetConnection";
import AssetSystem from "./AssetSystem";
import StatusIndicator from "./StatusIndicator";
import AssetProvisioning from "./AssetProvisioning";
import AssetApplication from "./AssetApplication";

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
        console.log(result);
    }

    
    if(!props.assetId){
        return (
            <Container>
                <h1>Assets</h1>
                <p className="text-subtitle">
                    Manage your individual assets.
                </p>
            </Container>
        )
    };

    return(
        <Container className="scroll-container">
            <div style={{float:'right'}}>
                <Button variant={'primary'} onClick={()=>{setShow(true)}}><FontAwesomeIcon icon={faArrowRightArrowLeft}/> Command</Button>
            </div>
            <CommandModal show={show} deviceId={description?.thingName?description.thingName:''} onClose={()=>{setShow(false)}}/>

            <h1>{description && description?.thingName?description.thingName:'No asset ID'}</h1>
            <p style={{fontWeight:'bold'}}>{shadow?.state?.reported?.system?.system?.uuid}</p>
            <p className="text-subtitle">
                {description && description?.thingTypeName? description.thingTypeName:'No asset type'} &nbsp;
                {shadow && shadow?.state?.reported?.system?.system?.version? shadow?.state?.reported?.system?.system?.version:'No hardware platform'} &nbsp;
                ({shadow && shadow?.state?.reported?.system?.system?.platform? shadow?.state?.reported?.system?.system?.platform:'No hardware platform'})
            </p>
        
            <Tabs defaultActiveKey="application" className="mb-3">
                <Tab eventKey="application" title={<><StatusIndicator message="b" noText type={(shadow && shadow?.state?.reported?.system?.application?.state === 'running')?'success':'danger'}/> Application</>}>
                    <AssetApplication assetId={props.assetId} />
                </Tab>
                <Tab eventKey="connection" title={<><StatusIndicator message="b" noText type={(shadow && shadow?.state?.reported?.system?.connection?.connection === 'connected')?'success':'danger'}/> Connection</>}>
                    <AssetConnection assetId={props.assetId} />
                    <br/>
                    <AssetProvisioning assetId={props.assetId} />
                </Tab>
                <Tab eventKey="System" title={<><StatusIndicator message="b" noText type={(shadow && shadow?.state?.reported?.system?.system?.state === 'running')?'success':'danger'}/> System</>}>
                    <AssetSystem assetId={props.assetId} assetShadow={shadow} />
                </Tab>
            </Tabs>
        </Container>
    );
}

export default AssetDetail;