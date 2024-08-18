import { Button, Container } from "react-bootstrap";
import AssetList from "./Devices/AssetList";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AssetDetailModal from "./Devices/AssetDetailModal";
import AssetListHeader from "./Devices/AssetListHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faRetweet } from "@fortawesome/free-solid-svg-icons";
import AssetAddNewModal from "./Devices/AssetAddNewModal";

const Assets = (props:{user:any})=>{
    const { assetId } = useParams();
    // Asset details modal with asset ID
    const[ selectedAsset, setSelectedAsset] = useState<string|null>('');
    // Add new asset modal
    const[ showAddNew, setShowAddNew ] = useState<boolean>(false);

    const assetListRef = useRef<{refresh():void}>();

    // Refresh the asset list
    function refreshAssetList(){
        setSelectedAsset(null);
        // allow the system to implement changes (dirty?...)
        setTimeout(()=>{assetListRef.current?.refresh()},700);
    }

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
        navigate('/assets');
    }

    if( !props.user ){
        return <Navigate to='/login' />;
    }
    return (
        <>
            <Container style={{textAlign:'left'}}>
                <br/>
                <AssetListHeader />
                <hr/>
                <AssetList ref={assetListRef} selected={assetId}/>
                <hr/>
                <Button variant={"primary"} onClick={()=>setShowAddNew(true)}><FontAwesomeIcon icon={faPlus} />Add device</Button>
                <Button variant={"primary"} className="mx-2" onClick={()=>refreshAssetList()}><FontAwesomeIcon icon={faRetweet} /> Refresh</Button>
            </Container>

            {/*Asset details Modal*/}
            <AssetDetailModal assetId={selectedAsset?selectedAsset:''} show={selectedAsset?true:false} onClose={()=>{clearSelected()}} onChange={()=>{refreshAssetList()}}/>
            <AssetAddNewModal show={showAddNew} onClose={()=>{setShowAddNew(false)}} onChange={()=>{refreshAssetList()}}/>
        </>
    );
}

export default Assets;
