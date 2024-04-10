import NavigationBar from "../components/Navigationbar";
import { Col, Container, Row } from "react-bootstrap";
import AssetList from "../components/AssetList";

function Dashboard() {


    return (
        <>
            <NavigationBar />
            <Container className="container-page">
                <br/>
                <Row>
                    <Col sm={3}>
                        <AssetList />
                    </Col>
                    <Col>
                        <h1>Dashboard</h1>
                        <p>Some usefull text</p>
                        <hr/>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;
