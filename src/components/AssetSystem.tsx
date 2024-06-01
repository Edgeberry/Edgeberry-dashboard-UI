import AssetAttributes from "./AssetAttributes";
import AssetSystemSoftware from "./AssetSystemSoftware";
import AssetSystemHardware from "./AssetSystemHardware";

const AssetSystem = (props:{assetId:string, assetShadow:any })=>{
    return(
        <>
            <AssetAttributes assetId={props.assetId} assetShadow={props.assetShadow} />
            <hr/>
            <AssetSystemHardware assetId={props.assetId} assetShadow={props.assetShadow} />
            <hr/>
            <AssetSystemSoftware assetId={props.assetId} assetShadow={props.assetShadow} />
        </>
    );
}

export default AssetSystem;