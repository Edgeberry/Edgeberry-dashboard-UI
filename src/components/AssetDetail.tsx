import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { api_things_getThingDescription, api_things_getThingShadow } from "../api/things";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

const AssetDetail = ( props:{assetId?:string})=>{
    const[ description, setDescription ] = useState<any|null>(null);
    const[ shadow, setShadow ] = useState<any|null>(null);

    useEffect(()=>{
        getThingDescription();
        getThingShadow();
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

    async function getThingShadow(){
        if( !props.assetId ) return;
        const result = await api_things_getThingShadow(props.assetId);
        if( result.message ){
            // TODO: do something with the error
            console.log(result.message);
            return;
        }
        console.log(result)
        setShadow(result);
    }
    
    if(!props.assetId) return <h1>No asset selected</h1>;
    return(
        <Container className="container-fluid">
            <div style={{float:'right'}}>
                <Button variant={'primary'}><FontAwesomeIcon icon={faSmileBeam}/></Button> &nbsp;
                <Button variant={'danger'}><FontAwesomeIcon icon={faPowerOff}/></Button>
            </div>
            <h1>{description && description?.thingName?description.thingName:'No asset ID'}</h1>
            <p style={{color:'#808080'}}>
                {description && description?.thingTypeName? description.thingTypeName:'No asset type'} &nbsp;
                {shadow && shadow?.state?.reported?.system?.system?.version? shadow?.state?.reported?.system?.system?.version:'No hardware platform'} &nbsp;
                ({shadow && shadow?.state?.reported?.system?.system?.platform? shadow?.state?.reported?.system?.system?.platform:'No hardware platform'})
            </p>
            <hr/>
        </Container>
    );
}

export default AssetDetail;