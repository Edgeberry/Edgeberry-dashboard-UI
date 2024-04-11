
import { Navigate } from 'react-router-dom';
import { api_user_logout } from '../api/user';
import { useEffect } from 'react';

const Logout = (props:{user:any, onLogout:Function }) => {
    useEffect(()=>{
        api_user_logout();
    },[])

    return(
        <Navigate to='/dashboard/login' />
    )
}

export default Logout;