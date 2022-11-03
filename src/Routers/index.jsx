import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PrivateRouter from "./PrivateRouter";
import LoggedRoter from './LoggedRouter'

import Login from '../Pages/Login'
import Register from '../Pages/Register'
import EsqueceuSenha from '../Pages/EsqueceuSenha'
import Principal from '../Pages/Principal'
import Home from '../Pages/Home'
import Page404 from "../Pages/Page404"

export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>

                <Route path="/login" exact element={<LoggedRoter/>}>
                    <Route path="/login" exact element={<Login/>}/>
                </Route>

                <Route path="/registro" exact element={<Register/>}/>
                <Route path="/login/forgot" exact element={<EsqueceuSenha/>}/>
                <Route path="*" exact element={<Page404/>}/>

                <Route path="/principal" exact element={<PrivateRouter/>}>
                    <Route path="/principal" exact element={<Principal/>}/>
                </Route>

                <Route path="/home" exact element={<PrivateRouter/>}>
                    <Route path="/home" exact element={<Home/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}