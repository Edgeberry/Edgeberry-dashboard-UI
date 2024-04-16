/*
 *  Direct Method API
 *  For communication with the devices
 */

import { api_things_invokeDirectMethod } from "./things";

export async function direct_getConnectionParameters( deviceId:string ){
    const result = await api_things_invokeDirectMethod( deviceId, 'getConnectionParameters', '');
    if( result.message ) return result;
    return result.payload;
}

export async function direct_getProvisioningParameters( deviceId:string ){
    const result = await api_things_invokeDirectMethod( deviceId, 'getProvisioningParameters', '');
    if( result.message ) return result;
    return result.payload;
}