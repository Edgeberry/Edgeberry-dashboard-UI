/*
 *  Admin API
 */

/*
 *  Device onboarding
 *  Adding a new device to the Edgeberry ecosystem
 */
export async function api_admin_onboardDevice( id:string, version:string, batch:string ){
    const response = await fetch( window.location.origin+'/api/admin/onboard',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            id:id,
            hardwareVersion: version,
            batchNumber: batch
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