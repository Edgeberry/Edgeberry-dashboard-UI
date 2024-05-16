import { Col, Container, Row } from "react-bootstrap";
import AssetList from "./AssetList";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AssetDetailModal from "./AssetDetailModal";
import AssetListHeader from "./AssetListHeader";

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
    },[assetId]);

    const navigate = useNavigate();
    function clearSelected(){
        navigate('/dashboard/assets');
    }

    if( !props.user ){
        return <Navigate to='/dashboard/login' />;
    }
    return (
        <>
            <Container>
                <br/>
                <AssetListHeader />
                <hr/>
                <AssetList selected={assetId}/>
            </Container>

            {/*Asset details Modal*/}
            <AssetDetailModal assetId={selectedAsset?selectedAsset:''} show={selectedAsset?true:false} onClose={()=>{clearSelected()}}/>

        </>
    );
}

export default Assets;
