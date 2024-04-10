import NavigationBar from "../components/Navigationbar";
import { Col, Container, Row } from "react-bootstrap";
import AssetList from "../components/AssetList";
import AssetDetail from "../components/AssetDetail";

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
                        <AssetDetail />
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;
