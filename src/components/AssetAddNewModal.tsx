import { useState } from "react";
import { Alert, Button, Carousel, Form, FormGroup, Modal } from "react-bootstrap";
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
                <Carousel>
                    <Carousel.Item>
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
                    </Carousel.Item>
                    <Carousel.Item>
                        <Alert>Checking your device</Alert>
                        <p>TODO: check whether the device is connected to the Edgeberry Cloud, and whether it is available to be assigned.</p>
                    </Carousel.Item>    
                    <Carousel.Item>
                        <Alert>Press the button on the device</Alert>
                        <p>TODO Maybe put some image here of the location of the button</p>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Alert>Agree to the terms</Alert>
                        <p>After the user clicks agree, assign this device to this user</p>
                        <div style={{width:'100%', textAlign:'right'}}>
                            <Button variant={'danger'}>Agree</Button>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Alert>Done</Alert>
                        <p>Assign this device to this user</p>
                        <p>Give a happy message for a second, and close the modal automatically</p>
                    </Carousel.Item>
                    </Carousel>

                </Modal.Body>
            </Modal>
        </>);
}

export default AssetAddNewModal;