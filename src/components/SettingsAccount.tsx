import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import NotificationBox from "./Notification";
import SettingsAWS from "./SettingsAWS";

const SettingsAccount = (props:{user:any|null})=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);

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
            <h2>Account</h2>
            <p className="text-subtitle">Your EdgeBerry.io account settings </p>
            <Form>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Username</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Username'} value={props.user?.username} onChange={(e)=>{}} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>E-mail</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'E-mail'} value={props.user?.email} onChange={(e)=>{}} required disabled={disabled}/>
                    </Col>
                </Form.Group>
                <NotificationBox message={message} isError={isError} />
            </Form>
        </>
    );
}

export default SettingsAccount;
