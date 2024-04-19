/*
 *  Direct Method API
 *  For communication with the devices
 */

import { api_things_invokeDirectMethod } from "./things";

/*
 *  Connectivity
 */

// Get connection parameters
export async function direct_getConnectionParameters( deviceId:string ){
    const result = await api_things_invokeDirectMethod( deviceId, 'getConnectionParameters', '');
    if( result.message ) return result;
    return result.payload;
}

// Get provisioning parameters
export async function direct_getProvisioningParameters( deviceId:string ){
    const result = await api_things_invokeDirectMethod( deviceId, 'getProvisioningParameters', '');
    if( result.message ) return result;
    return result.payload;
}

/*
 *  System
 */

// Get system application info
export async function direct_getSystemApplicationInfo( deviceId:string ){
    const result = await api_things_invokeDirectMethod( deviceId, 'getSystemApplicationInfo', '');
    if( result.message ) return result;
    return result.payload;
}

// Request system application update
export async function direct_updateSystemApplication( deviceId:string ){
    const result = await api_things_invokeDirectMethod( deviceId, 'updateSystemApplication', '');
    if( result.message ) return result;
    return result.payload;
}

// Get network info
export async function direct_getSystemNetworkInfo( deviceId:string ){
    const result = await api_things_invokeDirectMethod( deviceId, 'getSystemNetworkInfo', '');
    if( result.message ) return result;
    return result.payload;
}
