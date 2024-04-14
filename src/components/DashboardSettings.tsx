import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { api_user_getAwsSettings, api_user_updateAwsSettings } from "../api/user";
import NotificationBox from "./Notification";

const Settings = (props:{user:any|null})=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);

    const[ endpoint, setEndpoint ] = useState<string>('');
    const[ region, setRegion ] = useState<string>('');
    const[ keyId, setKeyId ] = useState<string>('');
    const[ key, setKey ] = useState<string>('');

    useEffect(()=>{
        getAwsSettings();
    },[])

    if( !props.user ){
        return <Navigate to='/dashboard/login' />;
    }

    // Get this user's AWS settings
    async function getAwsSettings(){
        const result = await api_user_getAwsSettings();
        if(result.message){
            setIsError(true);
            setMessage(result.message);
        }
        else {
            if(typeof(result.endpoint) === 'string') setEndpoint( result.endpoint );
            if(typeof(result.region) === 'string') setRegion( result.region );
            if(typeof(result.accessKeyId) === 'string') setKeyId( result.accessKeyId );
            if(typeof(result.secretAccessKey) === 'string') setKey( result.secretAccessKey );
            console.log(result)
        }
    }
    
    // on submit, update the AWS settings
    const saveAwsSettings = async (e:SyntheticEvent) =>{
        e.preventDefault();   // prevents page refresh
        const content = await api_user_updateAwsSettings( endpoint, region, keyId, key );

        if(content.message !== 'success'){
            setIsError(true);
            setMessage(content.message);
        }
        else {
            setIsError(false);
            setMessage('AWS settings succesfully updated!');
        }
    }

    return (
        <>
            <Container style={{textAlign:'left'}}>
                <br/>
                <h1>Settings</h1>
                <p>Settings for your EdgeBerry.io stuff</p>
                <hr/>
                <h2>AWS IoT Core</h2>
                <p>The settings required by EdgeBerry.io to access your AWS IoT Core</p>
                <Form onSubmit={saveAwsSettings}>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Endpoint</Form.Label>
                        <Col sm={6}>
                            <Form.Control type={'text'} placeholder={'e.g. a1fjdanvisao-ats.iot.eu-north-1.amazonaws.com'} value={endpoint} onChange={(e)=>{setEndpoint(e.target.value)}} disabled={disabled}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Region</Form.Label>
                        <Col sm={6}>
                            <Form.Control type={'text'} placeholder={'e.g. eu-north-1'} value={region} onChange={(e)=>{setRegion(e.target.value)}} required disabled={disabled}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Access key ID</Form.Label>
                        <Col sm={6}>
                            <Form.Control type={'text'} placeholder={'e.g. AKIA6ODUUGBDXB34OVH7O'} value={keyId} onChange={(e)=>{setKeyId(e.target.value)}} required disabled={disabled}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Private access key</Form.Label>
                        <Col sm={6}>
                            <Form.Control type={'text'} placeholder={'e.g. sxCynvJV3iAQbr485TlfRLw+9Nofonuwz5K+Kny7'} value={key} onChange={(e)=>{setKey(e.target.value)}} required disabled={disabled}/>
                        </Col>
                    </Form.Group>
                    <NotificationBox message={message} isError={isError} />
                    <Button variant={'primary'} type={'submit'} >Save</Button>
                </Form>
                <hr/>
                <h2>Account</h2>
                <p>Your EdgeBerry.io account settings </p>
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
                </Form>

            </Container>
        </>
    );
}

export default Settings;
