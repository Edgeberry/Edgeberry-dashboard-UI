import { useEffect, useState } from "react";
import AdminDeviceOnboardingModal from "./AdminDeviceOnboardingModal";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AdminDevices = (props:{user:any|null})=>{
    // Device Onboarding Modal
    const[ onboardingModalShow, setOnboardingModalShow ] = useState<boolean>(false);

    return (
        <>
            <Button variant={'primary'} onClick={()=>{setOnboardingModalShow(true)}}><FontAwesomeIcon icon={faPlus}/> Onboard</Button>
            <AdminDeviceOnboardingModal show={onboardingModalShow} onClose={() => { setOnboardingModalShow(false); } }/>
        </>
    );
}

export default AdminDevices;
