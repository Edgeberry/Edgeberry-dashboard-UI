import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import NotificationBox from "./Notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip, faTrash, faWarning } from "@fortawesome/free-solid-svg-icons";
import SettingsAccountDeleteModal from "./SettingsAccountDeleteModal";
import CertificateControl from "./CertificateControl";

const SettingsDevices = (props:{user:any|null})=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);

    const[ deleteModalShow, setDDeleteModalShow ] = useState<boolean>(false);

    // Disappearing messages
    useEffect(()=>{
        if( message === '' ) return;
        setTimeout(()=>{
            setMessage('');
            setIsError(false);
        },3500);
    },[message]);

    return (
        <>
            <h2><FontAwesomeIcon icon={faMicrochip}/> Devices</h2>
            <p className="text-subtitle">Edgeberry device configuration settings for connecting to the Edgeberry Dashboard</p>

            {/* Device provisioning certificate and private key. The user can copy/paste or download the device
                provisioning information for connecting to the official Edgeberry Dashboard here.*/}
            <h3>Device Provisioning</h3>
            <Alert variant={'danger'}><FontAwesomeIcon icon={faWarning}/> <strong>This is private information</strong>. Never share 
            this information with untrusted sources for the security of your connected devices and the security of the Edgeberry 
            Dashboard platform.</Alert>
            <Form>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Hostname</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder="a11fkxltf4r89e-ats.iot.eu-north-1.amazonaws.com" disabled/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Provisioning certificate</Form.Label>
                    <Col sm={6}>
                        <CertificateControl name={'Provisioning Certificate'} value={''} onChange={()=>{}} disabled/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Provisioning private key</Form.Label>
                    <Col sm={6}>
                        <CertificateControl name={'Provisioning Private Key'} value={''} onChange={()=>{}} disabled/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}></Form.Label>
                    <Col sm={6}>
                        <Button variant={'primary'}>Download</Button>
                    </Col>
                </Form.Group>
                <NotificationBox message={message} isError={isError} />
            </Form>
        </>
    );
}

export default SettingsDevices;
