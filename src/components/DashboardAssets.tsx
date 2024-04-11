import { Col, Container, Row } from "react-bootstrap";
import AssetList from "./AssetList";
import AssetDetail from "./AssetDetail";
import { Navigate, useParams } from "react-router-dom";

const Assets = (props:{user:any})=>{
    const { assetId } = useParams();

    if( !props.user ){
        return <Navigate to='/dashboard/login' />;
    }
    return (
        <>
            <Container className="container-page">
                <br/>
                <Row>
                    <Col xs={6} sm={5} md={4} lg={3}>
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
