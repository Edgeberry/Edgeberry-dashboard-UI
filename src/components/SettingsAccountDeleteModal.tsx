import { useEffect, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import NotificationBox from "./Notification";
import { api_things_invokeDirectMethod } from "../api/things";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

const SettingsAccountDeleteModal = ( props:{ show:boolean, onClose:Function })=>{
    // User feedback
    const[ message, setMessage ] = useState<string>('');
    const[ isError, setIsError ] = useState<boolean>(false);
    const[ disabled, setDisabled ] = useState<boolean>(true);

    const[ deletePhrase, setDeletePhrase ] = useState<string>('');
    // Delete phrase check
    function checkDeletePhrase( value:string ){
        setDeletePhrase( value )
        if( value.toLowerCase() !== 'delete'){
            return setDisabled(true);
        }
        return setDisabled(false);
    }

    // Disappearing messages
    const[ timeoutKeeper, setTimeoutKeeper ] = useState<ReturnType<typeof setTimeout>|null>(null);
    useEffect(()=>{
        if( message === '' ) return;
        if( timeoutKeeper ) clearTimeout( timeoutKeeper );
        setTimeoutKeeper(setTimeout(()=>{
            setMessage('');
            setIsError(false);
        },3500));
    },[message]);

    // Delete the account
    async function deleteUserAccount(){
        // TODO: implement
    }

    return(<>
            <Modal onHide={()=>{props.onClose()}} show={props.show} >
                <Modal.Body>
                    <Form>
                        <Alert variant={'danger'}>
                            <strong><FontAwesomeIcon icon={faWarning}/> Deleting your account is irreversible!</strong><br/>
                            The following actions will be taken when you continue deleting:
                            <ul>
                                <li>All your user data will be deleted</li>
                                <li>All devices owned by you will become available again to be claimed</li>
                            </ul>
                        </Alert>
                        <Form.Group className="mb-2">
                            <Form.Label>Type 'delete' to permanently delete this account</Form.Label>
                            <Form.Control type={'text'} placeholder={'type "delete" to continue'} value={deletePhrase} onChange={(e)=>{checkDeletePhrase(e.target.value)}}/>
                        </Form.Group>
                    </Form>
                    <NotificationBox message={message} isError={isError} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'primary'} onClick={()=>{props.onClose()}}>Cancel</Button>
                    <Button variant={'danger'} onClick={()=>{deleteUserAccount()}} disabled={disabled}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>);
}

export default SettingsAccountDeleteModal;