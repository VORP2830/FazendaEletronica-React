import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import PrivateRouter from "./PrivateRouter";

import Login from '../Pages/Login'
import Register from '../Pages/Register'
import EsqueceuSenha from '../Pages/EsqueceuSenha'
import Principal from '../Pages/Principal'

export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/login" exact element={<Login/>}/>
                <Route path="/registro" exact element={<Register/>}/>
                <Route path="/login/forgot" exact element={<EsqueceuSenha/>}/>

                <Route path="/principal" exact element={<PrivateRouter/>}>
                    <Route path="/principal" exact element={<Principal/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}