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
import AnimalVivo from "../Pages/Listagem/Animal/Vivo";
import CadastroAnimal from '../Pages/Cadastro/Animal'
import AnimalVendido from '../Pages/Listagem/Animal/Vendido'
import AnimalMorto from "../Pages/Listagem/Animal/Morto";
import TipoPagamento from '../Pages/Cadastro/TipoPagamento'
import Pagamento from "../Pages/Cadastro/Pagamento";

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

                <Route path="/listagem/animal/vendido" exact element={<PrivateRouter/>}>
                    <Route path="/listagem/animal/vendido" exact element={<AnimalVendido/>}/>
                </Route>

                <Route path="/listagem/animal/campo" exact element={<PrivateRouter/>}>
                    <Route path="/listagem/animal/campo" exact element={<AnimalVivo/>}/>
                </Route>

                
                <Route path="/listagem/animal/morto" exact element={<PrivateRouter/>}>
                    <Route path="/listagem/animal/morto" exact element={<AnimalMorto/>}/>
                </Route>

                
                <Route path="/cadastro/animal" exact element={<PrivateRouter/>}>
                    <Route path="/cadastro/animal" exact element={<CadastroAnimal/>}/>
                </Route>
       
                <Route path="/cadastro/tipo/pagamento" exact element={<PrivateRouter/>}>
                    <Route path="/cadastro/tipo/pagamento" exact element={<TipoPagamento/>}/>
                </Route>

                <Route path="/cadastro/pagamento" exact element={<PrivateRouter/>}>
                    <Route path="/cadastro/pagamento" exact element={<Pagamento/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    )
}