import HomeIcon from "@mui/icons-material/Home";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import { ReactElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../routes/ErrorPage/ErrorPage";
import ISTForm from "../routes/ISTForm/ISTForm";
import PingTest from "../routes/PingTest/PingText";
import Root from "../routes/Root";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/pingTest", element: <PingTest /> },
            { path: "/ist", element: <ISTForm /> },
        ],
    },
]);

export const routeList: NavList[] = [
    {
        name: "Home",
        shortName: "Home",
        path: "/",
        icon: <HomeIcon />,
    },
    {
        name: "Interservice Transfers",
        shortName: "IST",
        path: "/ist",
    },
    {
        name: "Ping Test",
        shortName: "Ping Test",
        path: "/pingTest",
        icon: <NetworkCheckIcon />,
    },
];

interface NavList {
    name: string;
    shortName: string;
    path: string;
    icon?: ReactElement;
}
