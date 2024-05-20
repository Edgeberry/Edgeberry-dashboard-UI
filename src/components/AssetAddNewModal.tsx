import { useState } from "react";
import { Alert, Button, Form, FormGroup, Modal } from "react-bootstrap";
import { faInfoCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AssetAddNewModal = ( props:{ show:boolean, onClose:Function })=>{

    // Command Modal
    const[ show, setShow ] = useState<boolean>(false);

    return(<>
            <Modal onHide={()=>{props.onClose()}} show={props.show} >
                <Modal.Header style={{paddingLeft:'2rem'}} closeButton>
                    <Modal.Title><FontAwesomeIcon icon={faPlus} /> Add Device</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Alert>
                            <FontAwesomeIcon icon={faInfoCircle} /> Make sure your device is connected to the internet,
                            and you have physical access to the device.
                        </Alert>
                        <FormGroup className="mb-2">
                            <Form.Label>Enter the device Unique ID</Form.Label>
                            <Form.Control type="text" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></Form.Control>
                        </FormGroup>
                        <div style={{width:'100%', textAlign:'right'}}>
                            <Button variant={'danger'}>Next</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>);
}

export default AssetAddNewModal;