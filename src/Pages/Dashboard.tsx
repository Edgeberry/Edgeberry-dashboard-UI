import NavigationBar from "../components/Navigationbar";
import { Outlet } from "react-router-dom";

function Dashboard() {
    // Change the tab title to 'Dashboard'
    document.title = 'Dashboard';

    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    );
}

export default Dashboard;
