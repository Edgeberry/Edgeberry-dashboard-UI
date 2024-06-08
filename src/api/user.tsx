/*
 *  User API
 */

/*
 *  Register
 *  Register a new user
 */
export async function api_user_register( email:string, password:string, name:string ){
    const response = await fetch( window.location.origin+'/api/user/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            email:email,
            password: password,
            name: name
        })
    });
    try{
        let content = await response.json();
        content.ok = response.ok;
        return content;
    } catch(err:any){
        return {message:err.toString()};
    }
}

/*
 *  Login
 *  On a successful login, the user object is returned and a JWT is created
 */
export async function api_user_login( email:string, password:string ){
    const response = await fetch( window.location.origin+'/api/user/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            email:email,
            password: password
        })
    });
    try{
        let content = await response.json();
        content.ok = response.ok;
        return content;
    } catch(err:any){
        return {message:err.toString()};
    }
}

/*
 *  Log out
 *  Destroy the cookie
 */
export async function api_user_logout(){
    const response = await fetch( window.location.origin+'/api/user/logout',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
    try{
        let content = await response.json();
        content.ok = response.ok;
        return content;
    } catch(err:any){
        return {message:err.toString()};
    }
}

/* Get The authenticated user */
export async function api_user_getAuthenticatedUser(){
    const response = await fetch( window.location.origin+'/api/user/user',{
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include'
    });
    try{
        const content = await response.json();
        return content;
    } catch(err:any){
        return {message:err.toString()};
    }
}