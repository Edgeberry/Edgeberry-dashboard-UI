import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

function Settings() {
    const[ disabled, setDisabled ] = useState<boolean>(false);

    const[ endpoint, setEndpoint ] = useState<string>('');
    const[ region, setRegion ] = useState<string>('');
    const[ keyId, setKeyId ] = useState<string>('');
    const[ key, setKey ] = useState<string>('');

    
    return (
        <>
            <Container style={{textAlign:'left'}}>
                <br/>
                <h1>Settings</h1>
                <p>Settings for your EdgeBerry.io stuff</p>
                <hr/>
                <h2>AWS IoT Core</h2>
                <p>The settings required by EdgeBerry.io to access your AWS IoT Core</p>
                <Form>
                    <Form.Group as={Row} className="mb-2">
                        <Form.Label column sm={2}>Endpoint</Form.Label>
                        <Col sm={6}>
                            <Form.Control type={'text'} placeholder={'e.g. a1fjdanvisao-ats.iot.eu-north-1.amazonaws.com'} value={endpoint} onChange={(e)=>{setEndpoint(e.target.value)}} required disabled={disabled}/>
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
                </Form>
                <hr/>
                <h2>Account</h2>
                <p>Your EdgeBerry.io account settings </p>

            </Container>
        </>
    );
}

export default Settings;
