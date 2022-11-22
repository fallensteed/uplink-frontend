import HomeIcon from "@mui/icons-material/Home";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import { ReactElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import ISTForm from "routes/ISTForm/ISTForm";
import NewPost from "routes/Uplink/components/NewPost";
import ViewPost from "routes/Uplink/components/ViewPost/ViewPost";
import ErrorPage from "../routes/ErrorPage/ErrorPage";
import Home from "../routes/Home/Home";
import IST from "../routes/ISTForm/ISTForm";
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
<<<<<<< HEAD
        name: "Interservice Transfers",
        shortName: "IST",
        path: "/ist",
        element: <IST />,
        displayInNavBar: true,
    },
    {
=======
>>>>>>> 03c7c81592dceb44bf98079c14af36d4005d35d3
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
    {
        name: "Create Post",
        shortName: "Create Post",
        path: "/submit/:communityLink?",
        element: <NewPost />,
        displayInNavBar: false,
    },
    {
        name: "Create Post",
        shortName: "Create Post",
        path: "/submit",
        element: <NewPost />,
        displayInNavBar: false,
    },
    {
        name: "View Post",
        shortName: "View Post",
        path: "/c/:community/p/:miniLink",
        element: <ViewPost />,
        displayInNavBar: false,
    },
];

const routerChildren = routeList.map((route) => {
    const { name, shortName, icon, displayInNavBar, ...childRoute } = route;
    return childRoute;
});

export const routeObject = [
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: routerChildren,
    },
];

export const router = createBrowserRouter(routeObject);
