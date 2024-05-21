import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import NotificationBox from "./Notification";

const AssetAttributes = ( props:{assetId:string })=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);

    // Attributes
    const[ deviceName, setDeviceName ] = useState<string>('');
    const[ deviceLocation, setDeviceLocation ] = useState<string>('');

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
            <h2>Device Attributes</h2>
            <p className="text-subtitle">The attributes of this Edgeberry device</p>
            <Form>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Device name</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Device name'} value={deviceName} onChange={(e)=>{setDeviceName(e.target.value)}} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Device location</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Device location'} value={deviceLocation} onChange={(e)=>{setDeviceLocation(e.target.value)}} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                <NotificationBox message={message} isError={isError} />
                <Button variant={'primary'}>Save</Button>
            </Form>
        </>
    );
}

export default AssetAttributes;
