import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import SettingsAccount from "./Settings/SettingsAccount";
import SettingsDevices from "./Settings/SettingsDevices";

const Settings = (props:{user:any|null})=>{
    // When no user is logged in, navigate to the
    // login page. Dashboard settings requires a user.
    if( !props.user ){
        return <Navigate to='/dashboard/login' />;
    }

    return (
        <>
            <Container style={{textAlign:'left'}}>
                <br/>
                <h1>Settings</h1>
                <p className="text-subtitle">Settings for your Edgeberry Dashboard</p>
                <hr/>
                <SettingsAccount user={props.user} />
                {/*<hr/>
                <SettingsDevices user={props.user} />*/}
            </Container>
        </>
    );
}

export default Settings;
