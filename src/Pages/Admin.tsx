import { Alert, Container, Tab, Tabs } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faMicrochip, faUnlockKeyhole, faUser } from '@fortawesome/free-solid-svg-icons';
import { Navigate } from 'react-router-dom';
import AdminDevices from '../components/Admin/AdminDevices';

function Admin(props:{user:any}) {

  // If someone gets here without administration access,
  // return to the main page of the dashboard
  if(!props.user || !props.user?.roles.filter((role:string)=>{role.includes("admin")})){
    return <Navigate to="/dashboard"/>
  }

  return (
      <Container style={{textAlign:'left'}}>
        <br/>
        <h2><FontAwesomeIcon icon={faUnlockKeyhole}/> Admin tools</h2>
        <p>Tools for administration of the Edgeberry Dashboard</p>
        <hr/>
        <Tabs defaultActiveKey="devices" className="mb-3">
          <Tab eventKey="users" title={<><FontAwesomeIcon icon={faUser} /> Users</>}>
            <Alert><FontAwesomeIcon icon={faInfoCircle}/> Tools for managing the Dashboard users.</Alert>
          </Tab>
          <Tab eventKey="devices" title={<><FontAwesomeIcon icon={faMicrochip}/> Devices</>}>
            <Alert><FontAwesomeIcon icon={faInfoCircle}/> Tools for managing the devices.</Alert>
            <AdminDevices user={props.user} />
          </Tab>
        </Tabs>
      </Container>
  );
}

export default Admin;