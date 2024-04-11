import { Col, Container, Row } from "react-bootstrap";
import AssetList from "./AssetList";
import AssetDetail from "./AssetDetail";

function Assets() {


    return (
        <>
            <Container className="container-page">
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

export default Assets;
