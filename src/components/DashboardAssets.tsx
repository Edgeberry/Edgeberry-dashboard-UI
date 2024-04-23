import { Col, Container, Row } from "react-bootstrap";
import AssetList from "./AssetList";
import AssetDetail from "./AssetDetail";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Assets = (props:{user:any})=>{
    const { assetId } = useParams();
    const[ selectedAsset, setSelectedAsset] = useState<string|null>('');

    // Dirty fix for refreshing asset details
    useEffect(()=>{
        setSelectedAsset(null);
        if(assetId)
        setTimeout(()=>{
            setSelectedAsset(assetId);
        });
    },[assetId])

    if( !props.user ){
        return <Navigate to='/dashboard/login' />;
    }
    return (
        <>
            <Container className="container-page">
                <br/>
                <Row>
                    <Col xs={6} sm={5} md={4} lg={3}>
                        <AssetList selected={assetId}/>
                    </Col>
                    <Col>
                        {typeof(selectedAsset) === 'string'?<AssetDetail assetId={selectedAsset?selectedAsset:''}/>:<></>}
                    </Col>
                </Row>
            </Container>    
        </>
    );
}

export default Assets;
