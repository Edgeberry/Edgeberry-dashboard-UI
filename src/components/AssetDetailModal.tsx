import { useState } from "react";
import { Modal } from "react-bootstrap";
import AssetDetail from "./AssetDetail";

const AssetDetailModal = ( props:{ assetId:string, show:boolean, onClose:Function })=>{
    // Direct Method
    const[ methodName, setMethodName ] = useState<string>('');
    const[ body, setBody ] = useState<string>('');

    return(<>
            <Modal size={'xl'} onHide={()=>{props.onClose()}} show={props.show} >
                <Modal.Header closeButton>
                    <Modal.Title>{props.assetId}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AssetDetail assetId={props.assetId} />
                </Modal.Body>
            </Modal>
        </>);
}

export default AssetDetailModal;