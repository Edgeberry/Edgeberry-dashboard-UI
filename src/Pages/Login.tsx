import {useState, SyntheticEvent } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import logo from '../Edgeberry_logo_text.png';

const Login = (props:{user:any, onLogin: (isLoggedIn:boolean)=>void }) => {
    const[ email, setEmail ] = useState("");
    const[ password, setPassword ] = useState("");
    const[ msg, setMsg] = useState('');
    let message;

    // on submit ('log in'), post the username and password to the login api,
    const submit = async (e:SyntheticEvent) =>{
        e.preventDefault();   // prevents page refresh
        /*const content = await FreyaAPI_user_login( email, password );   // login user with API call

        if(content.message !== 'success'){
            setMsg(content.message);
        }
        else {
            props.onLogin(true);
        }*/
    }

    // Display error message if login fails
    if( msg !== '' ){
        message = (
            <div className="alert alert-danger" role="alert">
                {msg}. Trouble logging in? <a href="mailto:support@freyavivariums.com">Contact support</a>.
            </div>
        );
    }
    
    // if a user is logged in, redirect to home
    if( props.user !== null ){
      return <Navigate to="/" />;
    }

    return(
        <main className="centerbox">
            <Form onSubmit={submit}>
                <img src={logo} width="100%" alt="logo" />

                <br/>
                <br/>


                <Form.Group className="mb-2">
                    <Form.Control type={'text'} placeholder={'E-mail'} value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control type={'text'} placeholder={'Password'} value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                </Form.Group>
                {message}
                <Button variant={'primary'} className="w-100 btn btn-lg" type="submit">Log in</Button>
            </Form>
        </main>
    )
}

export default Login;