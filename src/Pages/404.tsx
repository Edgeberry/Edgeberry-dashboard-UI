import { Container } from 'react-bootstrap';
import logo from '../EdgeBerry_logo.png';

function NotFound() {
  return (
      <Container className='container-page' style={{textAlign:'center'}}>
            <br/>
            <br/>
            <img src={logo} className="App-logo" alt="logo" />
            <h1>404 Not Found</h1>
            <p>
            I don't know what you're looking for, <br/>
            You haven't found it, baby, that's for sure.
            </p>
      </Container>
  );
}

export default NotFound;