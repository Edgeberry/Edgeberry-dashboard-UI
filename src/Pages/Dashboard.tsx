import { Button, Offcanvas } from "react-bootstrap";
import NavigationBar from "../components/Navigationbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Dashboard = (props:{user:any|null}) => {
    // Change the tab title to 'Dashboard'
    document.title = 'Dashboard';

    return (
        <>
            <NavigationBar user={props.user}/>
            <Outlet />
        </>
    );

}

export default Dashboard;
