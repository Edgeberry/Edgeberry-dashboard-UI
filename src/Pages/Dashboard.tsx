import NavigationBar from "../components/Navigationbar";
import { Outlet } from "react-router-dom";

function Dashboard() {


    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    );
}

export default Dashboard;
