import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { api_things_getThingDescription } from "../api/things";

const AssetDetail = ( props:{assetId?:string})=>{
    const[ description, setDescription ] = useState<any|null>(null);

    useEffect(()=>{
        getThingDescription();
    },[props.assetId]);

    // Get the Thing description
    async function getThingDescription(){
        if( !props.assetId ) return;
        const result = await api_things_getThingDescription(props.assetId);
        if( result.message ){
            // TODO: do something with the error
            return;
        }
        setDescription(result);
    }
    
    if(!props.assetId) return <h1>No asset selected</h1>;
    return(
        <Container className="container-fluid">
            <h1>{description && description?.thingName?description.thingName:'No asset ID'}</h1>
            <p>{description && description?.thingTypeName?description.thingTypeName:'No asset type'}</p>
            <hr/>
        </Container>
    );
}

export default AssetDetail;