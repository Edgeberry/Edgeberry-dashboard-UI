import {useState, SyntheticEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import logo from '../Edgeberry_logo_text.png';
import { api_user_login } from '../api/user';
import NotificationBox from '../components/Notification';

const Login = (props:{user:any, onLogin:Function }) => {
    const[ email, setEmail ] = useState("");
    const[ password, setPassword ] = useState("");
    const[ message, setMessage] = useState('');

    // on submit ('log in'), post the username and password to the login api,
    const submit = async (e:SyntheticEvent) =>{
        e.preventDefault();   // prevents page refresh
        const content = await api_user_login( email, password );   // login user with API call

        if(content.message !== 'success'){
            setMessage(content.message);
        }
        else {
            props.onLogin(true);
        }
    }
    
    // if a user is logged in, redirect to home
    if( props.user ){
        return (<Navigate to='/dashboard/assets' />);
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
                    <Form.Control type={'password'} placeholder={'Password'} value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                </Form.Group>
                <NotificationBox message={message} isError={true} />
                <Button variant={'primary'} className="w-100 btn btn-lg" type="submit">Log in</Button>
            </Form>
        </main>
    )
}

export default Login;