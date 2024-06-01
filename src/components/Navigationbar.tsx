import { Button, Container, ListGroup, Nav, Navbar, Offcanvas } from "react-bootstrap";
import logo from '../EdgeBerry_Logo_text.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear, faMicrochip, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavigationBar = (props:{user:any|null})=>{

    // Offcanvas menu
    const[ show, setShow ] = useState<boolean>(false);
    return(
        <>
            <Navbar sticky="top" bg={'dark'} data-bs-theme={'dark'}>
                <Container className="container-fluid" style={{paddingRight:'10px', paddingLeft:'10px'}}>
                    <Navbar.Brand href='/dashboard'>
                        <img src={logo} alt="EdgeBerry.io" height={'32px'}/>
                    </Navbar.Brand>

                    {props.user?<>
                        <Nav>
                            <Button variant={'transparent'} className="btn-outline-light" onClick={()=>{setShow(true)}}><FontAwesomeIcon icon={faBars}/></Button>
                        </Nav>
                    </>:<></>}
                </Container>
            </Navbar>

            {/* The menu sliding out from the right */}
            <Offcanvas show={show} onHide={()=>{setShow(false)}} placement={'end'} style={{maxWidth:'300px'}}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body style={{padding:'0px'}}>
                    <ListGroup>
                        <ListGroup.Item as={Link} to='/dashboard/settings' onClick={()=>{setShow(false)}}>
                            <FontAwesomeIcon icon={faGear} /> Settings
                        </ListGroup.Item>
                        <ListGroup.Item as={Link} to='/dashboard/assets' onClick={()=>{setShow(false)}}>
                            <FontAwesomeIcon icon={faMicrochip} /> Devices
                        </ListGroup.Item>
                        <ListGroup.Item as={Link} to='/dashboard/logout' onClick={()=>{setShow(false)}}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Log out
                        </ListGroup.Item>
                    </ListGroup>
                    <Container className="container-bottom" style={{fontSize:'0.8vw'}}>
                        <hr/>
                        <p>Edgeberry Dashboard is open-source software. The source code is available on the <a href={'https://github.com/edgeberry/'} target={'_blank'}>Edgeberry GitHub</a>.</p>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default NavigationBar;