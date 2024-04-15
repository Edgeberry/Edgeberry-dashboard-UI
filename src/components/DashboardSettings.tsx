import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { api_user_getAwsSettings, api_user_updateAwsSettings } from "../api/user";
import NotificationBox from "./Notification";
import SettingsAWS from "./SettingsAWS";
import SettingsAccount from "./SettingsAccount";

const Settings = (props:{user:any|null})=>{
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

    // When no user is logged in, navigate to the
    // login page. Dashboard settings requires a user.
    if( !props.user ){
        return <Navigate to='/dashboard/login' />;
    }

    return (
        <>
            <Container style={{textAlign:'left'}}>
                <h1>Settings</h1>
                <p className="text-subtitle">Settings for your EdgeBerry.io stuff</p>
                <hr/>
                <SettingsAWS user={props.user} />
                <hr/>
                <SettingsAccount user={props.user} />
            </Container>
        </>
    );
}

export default Settings;
