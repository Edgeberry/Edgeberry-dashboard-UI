import { useEffect, useState } from "react";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import CommandModal from "./CommandModal";
import AssetApplication from "./AssetApplication";
import { faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AssetConnection from "./AssetConnection";
import AssetProvisioning from "./AssetProvisioning";
import AssetSystem from "./AssetSystem";
import StatusIndicator from "./StatusIndicator";
import { api_things_getThingDescription, api_things_getThingShadow } from "../api/things";

const AssetDetailModal = ( props:{ assetId:string, show:boolean, onClose:Function })=>{
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

    return(<>
            <Modal size={'xl'} onHide={()=>{props.onClose()}} show={props.show} >
                <Modal.Header style={{paddingLeft:'2rem'}} closeButton>
                    <Modal.Title>{description && description?.attributes?.deviceName?description.attributes.deviceName:props.assetId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div style={{float:'right'}}>
                            <Button variant={'primary'} onClick={()=>{setShow(true)}}><FontAwesomeIcon icon={faArrowRightArrowLeft}/> Command</Button>
                        </div>

                        <p className="text-subtitle">
                            <b>{shadow?.state?.reported?.system?.system?.uuid}</b><br/>
                            {description && description?.thingTypeName? description.thingTypeName:'No asset type'} &nbsp;
                            {shadow && shadow?.state?.reported?.system?.system?.version? shadow?.state?.reported?.system?.system?.version:'No hardware platform'} &nbsp;
                            ({shadow && shadow?.state?.reported?.system?.system?.platform? shadow?.state?.reported?.system?.system?.platform:'No hardware platform'})
                         </p>
                         <CommandModal show={show} deviceId={description?.thingName?description.thingName:''} onClose={()=>{setShow(false)}}/>

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
                </Modal.Body>
            </Modal>
        </>);
}

export default AssetDetailModal;