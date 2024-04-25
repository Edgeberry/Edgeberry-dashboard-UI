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

// Update connection parameters
export async function direct_updateConnectionParameters( deviceId:string, parameters:any ){
    const result = await api_things_invokeDirectMethod( deviceId, 'updateConnectionParameters', JSON.stringify(parameters) );
    if( result.message ) return result;
    return result.payload;
}

// Get provisioning parameters
export async function direct_getProvisioningParameters( deviceId:string ){
    const result = await api_things_invokeDirectMethod( deviceId, 'getProvisioningParameters', '');
    if( result.message ) return result;
    return result.payload;
}

// Update connection parameters
export async function direct_updateProvisioningParameters( deviceId:string, parameters:any ){
    const result = await api_things_invokeDirectMethod( deviceId, 'updateProvisioningParameters', JSON.stringify(parameters) );
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

/*
 *  Application
 */

// Get application info
export async function direct_getApplicationInfo( deviceId:string ){
    const result = await api_things_invokeDirectMethod( deviceId, 'getApplicationInfo', '');
    if( result.message ) return result;
    return result.payload;
}

// Restart the application
export async function direct_restartApplication( deviceId:string ){
    const result = await api_things_invokeDirectMethod( deviceId, 'restartApplication', '');
    if( result.message ) return result;
    return result.payload;
}

// Restart the application
export async function direct_stopApplication( deviceId:string ){
    const result = await api_things_invokeDirectMethod( deviceId, 'stopApplication', '');
    if( result.message ) return result;
    return result.payload;
}


