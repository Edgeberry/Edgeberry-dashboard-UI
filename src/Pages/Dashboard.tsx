import NavigationBar from "../components/Navigationbar";
import { Navigate, Outlet } from "react-router-dom";

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
