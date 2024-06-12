import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { Navigate } from 'react-router-dom';

function Admin(props:{user:any}) {

  // If someone gets here without administration access,
  // return to the main page of the dashboard
  if(!props.user || !props.user?.roles.filter((role:string)=>{role.includes("admin")})){
    return <Navigate to="/dashboard"/>
  }
  
  return (
      <Container>
            <br/>
            <h2><FontAwesomeIcon icon={faUnlockKeyhole}/> Admin tools</h2>
            <p>Tools for administration of the Edgeberry Dashboard</p>
      </Container>
  );
}

export default Admin;