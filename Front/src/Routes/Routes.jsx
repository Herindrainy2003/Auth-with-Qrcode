import { createBrowserRouter } from "react-router-dom";
import Register from "../Component/Register";
import Login from "../Component/Login";

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Register />
    },
    {
        path : "/login",
        element : <Login />
    }
   
]);


export default Routes;