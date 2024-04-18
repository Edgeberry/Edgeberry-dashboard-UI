import { SyntheticEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import NotificationBox from "./Notification";
import { direct_getProvisioningParameters } from "../api/directMethods";
import CertificateControl from "./CertificateControl";

const AssetProvisioning = ( props:{assetId:string|null})=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);

    /* AWS IoT Core connection parameters */
    const[ hostname, setHostname ] = useState<string>('');
    const[ deviceId, setDeviceId ] = useState<string>('');
    // X.509 Certificate
    const[ cert, setCert ] = useState<string>('');
    const[ pKey, setPKey ] = useState<string>('');
    const[ rootca, setRootca ] = useState<string>('');

    useEffect(()=>{
        getProvisioningParameters();
    },[props.assetId]);

    // Disappearing messages
    useEffect(()=>{
        if( message === '' ) return;
        setTimeout(()=>{
            setMessage('');
            setIsError(false);
        },3500);
    },[message]);

    // Get this user's AWS settings
    async function getProvisioningParameters(){
        if( !props.assetId ) return;
        setDisabled(true);
        const result = await direct_getProvisioningParameters( props.assetId );
        if(!result){
            setDisabled(false);
            return;
        }          
        if(result.message){
            setIsError(true);
            setMessage(result.message);
        }
        else {
            // Set the parameters in the fields
            if( typeof(result.hostName) === 'string' ) setHostname(result.hostName);
            if( typeof(result.clientId) === 'string' ) setDeviceId(result.clientId);
            if( typeof(result.certificate) === 'string' ) setCert(result.certificate);
            if( typeof(result.privateKey) === 'string' ) setPKey(result.privateKey);
            if( typeof(result.rootCertificate) === 'string' ) setRootca(result.rootCertificate);
        }
        setDisabled(false);
    }
    
    // on submit, update the AWS settings
    const updateProvisioningSettings = async (e:SyntheticEvent) =>{
        setDisabled(true);
        e.preventDefault();   // prevents page refresh
        /*const content = await api_user_updateAwsSettings( endpoint, region, keyId, key );

        if(content.message !== 'success'){
            setIsError(true);
            setMessage(content.message);
        }
        else {
            setIsError(false);
            setMessage('AWS settings succesfully updated!');
        }*/
        setDisabled(false);
    }

    return (
        <>
            <h2>Provisioning</h2>
            <p className="text-subtitle">The settings of the device's cloud provisioning.</p>
            
            <Form onSubmit={updateProvisioningSettings}>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Hostname</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Hostname'} value={hostname} onChange={(e)=>{setHostname(e.target.value)}} required spellCheck={false} disabled={disabled}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-2">
                    <Form.Label column sm={2}>Registration ID</Form.Label>
                    <Col sm={6}>
                        <Form.Control type={'text'} placeholder={'Device ID'} value={deviceId} onChange={(e)=>{setDeviceId(e.target.value)}} required spellCheck={false} disabled={disabled}/>
                    </Col>
                </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Certificate</Form.Label>
                        <Col sm={6}>
                            <CertificateControl name={'Certificate'} value={cert} onChange={(e:any)=>{setCert(e.target.value)}} disabled={disabled}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Private key</Form.Label>
                        <Col sm={6}>
                            <CertificateControl name={'Private Key'} value={pKey} onChange={(e:any)=>{setPKey(e.target.value)}} disabled={disabled}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Root certificate</Form.Label>
                        <Col sm={6}>
                            <CertificateControl name={'Root Certificate'} value={rootca} onChange={(e:any)=>{setRootca(e.target.value)}} disabled={disabled}/>
                        </Col>
                    </Form.Group>

                <NotificationBox message={message} isError={isError} />
                <div style={{width:'100%', textAlign:'right'}}>
                    <Button variant={'primary'} type={'submit'} disabled={disabled}>Save</Button>
                </div>
            </Form>
        </>
    );
}

export default AssetProvisioning;