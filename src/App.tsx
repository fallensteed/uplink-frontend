import { router } from "navigation/pages";
import { FC } from "react";
import { RouterProvider } from "react-router-dom";

const App: FC = () => {
    return <RouterProvider router={router} />;
};

export default App;
