import { Col, Container, Row } from "react-bootstrap";
import AssetList from "./AssetList";
import AssetDetail from "./AssetDetail";
import { useParams } from "react-router-dom";

function Assets() {
    const { assetId } = useParams();

    return (
        <>
            <Container className="container-page">
                <br/>
                <Row>
                    <Col sm={3}>
                        <AssetList />
                    </Col>
                    <Col>
                        <AssetDetail assetId={assetId}/>
                    </Col>
                </Row>
            </Container>    
        </>
    );
}

export default Assets;
