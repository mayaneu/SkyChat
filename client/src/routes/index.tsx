import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUpPage from "../Pages/SignUp";
import DroneDashboard from "../Pages/DroneControl";

const routes = [
    {
        path: '/',
        element: (<RequireAuth>
            <Home />
        </RequireAuth>)
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <SignUpPage />
    },
    {
        path: '/droneControl',
        element: <DroneDashboard />
    }]

const Router: FC = () => {
    return <BrowserRouter>
        <Routes>
            {
                routes.map(({ path, element }) => <Route key={path} path={path} element={element} />)
            }
        </Routes>
    </BrowserRouter>
}

export default Router;