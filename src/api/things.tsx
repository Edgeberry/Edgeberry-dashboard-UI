/*
 *  Things API
 */

/* Get list of all things */
export async function api_things_getThingsList(){
    const response = await fetch( window.location.origin+'/api/things/list',{
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

/* Restart the application */
export async function api_things_restart(){
    const response = await fetch( window.location.origin+'/api/application/restart',{
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