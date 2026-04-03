import { createBrowserRouter } from "react-router-dom";
import ParenLayout from "../layout/ParenLayout";
import HomePage from "../PublicPage/Home/HomePage";
import LoginPage from "../PublicPage/auth/LoginPage";
import RegisterPage from "../PublicPage/auth/RegisterPage";

export const router = createBrowserRouter([{
    path:'/',
    element:<ParenLayout/>,
    children:([
        {
            path:'/',
            element:<HomePage/>
        },
        {
            path:'login',
            element:<LoginPage/>
        },
    {
        path:'register',
        element:<RegisterPage/>
    }
    ])
},

])