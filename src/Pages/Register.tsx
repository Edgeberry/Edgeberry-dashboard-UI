import {useState, SyntheticEvent } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import logo from '../EdgeBerry_Logo_text.svg';
import NotificationBox from '../components/Notification';

const Register = (props:{user:any, onLogin:Function }) => {
    const[ name, setName ] = useState("");
    const[ email, setEmail ] = useState("");
    const[ password, setPassword ] = useState("");
    const[ retypePassword, setRetypePassword ] = useState("");
    const[ message, setMessage] = useState('');

    // on submit ('log in'), post the username and password to the login api,
    const submit = async (e:SyntheticEvent) =>{
        e.preventDefault();   // prevents page refresh

        // Run some checks
        if( password !== retypePassword){
            // TODO
        }
        /*const content = await api_user_login( email, password );   // login user with API call

        if(content.message !== 'success'){
            setMessage(content.message);
        }
        else {
            props.onLogin(true);
        }*/
    }
    
    // if a user is logged in, redirect to home
    if( props.user ){
        return (<Navigate to='/dashboard/assets' />);
    }

    return(
        <Container className="container-page">
            <Container className="centerbox">
                <Form onSubmit={submit}>
                    <img src={logo} width="100%" alt="logo" />
                    <br/>
                    <br/>
                    <Form.Group className="mb-2">
                        <Form.Control type={'text'} placeholder={'Name'} value={name} onChange={(e)=>{setName(e.target.value)}} required/>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control type={'text'} placeholder={'E-mail'} value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control type={'password'} placeholder={'Password'} minLength={8} value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Control type={'password'} placeholder={'Retype password'} minLength={8} value={retypePassword} onChange={(e)=>{setRetypePassword(e.target.value)}} required/>
                    </Form.Group>
                    <hr/>
                    <Form.Group className="mb-2">
                        <Form.Check type={'checkbox'} label={'Agree to terms & conditions'} />
                    </Form.Group>
                    <NotificationBox message={message} isError={true} />
                    <Button variant={'primary'} className="w-100 btn btn-lg" type="submit">Register</Button>
                </Form>
            </Container>
        </Container>
    )
}

export default Register;