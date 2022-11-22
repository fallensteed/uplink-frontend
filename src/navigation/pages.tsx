import HomeIcon from "@mui/icons-material/Home";
import NetworkCheckIcon from "@mui/icons-material/NetworkCheck";
import { ReactElement } from "react";
import { createBrowserRouter } from "react-router-dom";
import NewCommunity from "routes/Uplink/pages/NewCommunity";
import NewPost from "routes/Uplink/pages/NewPost";
import ViewPost from "routes/Uplink/pages/ViewPost/ViewPost";
import ViewUser from "routes/Uplink/pages/ViewUser/ViewUser";
import ErrorPage from "../routes/ErrorPage/ErrorPage";
import Home from "../routes/Home/Home";
import ISTForm from "../routes/ISTForm/ISTForm";
import PingTest from "../routes/PingTest/PingText";
import Root from "../routes/Root";
import ViewCommunity from "../routes/Uplink/pages/ViewCommunity/ViewCommunity";

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
    {
        name: "Create Post",
        shortName: "Create Post",
        path: "/submit/:communityLink",
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
    {
        name: "Community Posts",
        shortName: "Community Posts",
        path: "/c/:communityLink",
        element: <ViewCommunity />,
        displayInNavBar: false,
    },
    {
        name: "User Posts",
        shortName: "User Posts",
        path: "/u/:uplinkUsername",
        element: <ViewUser />,
        displayInNavBar: false,
    },
    {
        name: "New Community",
        shortName: "New Community",
        path: "/new-community",
        element: <NewCommunity />,
        displayInNavBar: false,
    },
];

const routerChildren = routeList.map((route) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
