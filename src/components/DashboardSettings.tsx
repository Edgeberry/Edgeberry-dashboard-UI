import { useState } from "react";
import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import SettingsAWS from "./SettingsAWS";
import SettingsAccount from "./SettingsAccount";

const Settings = (props:{user:any|null})=>{
    const[ disabled, setDisabled ] = useState<boolean>(false);

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
