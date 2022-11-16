import HomeIcon from "@mui/icons-material/Home";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import { ReactElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import ISTForm from "routes/ISTForm/ISTForm";
import ErrorPage from "../routes/ErrorPage/ErrorPage";
import Home from "../routes/Home/Home";
import PingTest from "../routes/PingTest/PingText";
import Root from "../routes/Root";

interface NavList {
    name: string;
    shortName: string;
    path: string;
    element: ReactElement;
    icon?: ReactElement;
    displayInNavBar: boolean;
}

export const routeList: NavList[] = [
    {
        name: "Home",
        shortName: "Home",
        path: "/home",
        element: <Home />,
        icon: <HomeIcon />,
        displayInNavBar: true,
    },
    {
        name: "Ping Test",
        shortName: "Ping Test",
        path: "/pingTest",
        element: <PingTest />,
        icon: <NetworkCheckIcon />,
        displayInNavBar: true,
    },
    {
        name: "IST App",
        shortName: "IST App",
        path: "/ist",
        element: <ISTForm />,
        displayInNavBar: true,
    },
];

const routerChildren = routeList.map((route) => {
    const { name, shortName, icon, displayInNavBar, ...childRoute } = route;
    return childRoute;
});

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: routerChildren,
    },
]);
