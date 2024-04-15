import { Container, Nav, Navbar } from "react-bootstrap";
import logo from '../Edgeberry_logo_text.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const NavigationBar = (props:{user:any|null})=>{

    return(
        <Navbar sticky="top" bg={'dark'} data-bs-theme={'dark'}>
            <Container className="container-fluid" style={{paddingRight:'10px', paddingLeft:'10px'}}>
                <Navbar.Brand href='/dashboard'>
                    <img src={logo} alt="EdgeBerry.io" height={'32px'}/>
                </Navbar.Brand>
                {props.user?
                <Nav>
                    <Nav.Link href='/dashboard/assets'>
                        Assets
                    </Nav.Link>
                    <Nav.Link href='/dashboard/settings'>
                        Settings
                    </Nav.Link>
                    <Nav.Link href='/dashboard/logout'>
                        Log out &nbsp;<FontAwesomeIcon icon={faSignOutAlt} />
                    </Nav.Link>
                </Nav>
                :<></>}
            </Container>
        </Navbar>
    );
}

export default NavigationBar;