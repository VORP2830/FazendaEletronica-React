import React from "react";
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'

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
import ListagemPagamento from "../Pages/Listagem/Pagamento/Pagamento";
import ListagemTipoPagamento from "../Pages/Listagem/Pagamento/TipoPagamento";
import AlterarSenha from "../Pages/AlterarSenha";
import EditarAnimal from "../Pages/Alteracao/Animal";
import EditarPagamento from "../Pages/Alteracao/Pagamento";
import EditarTipoPgamento from "../Pages/Alteracao/TipoPagamento";
import AnimalFilhos from "../Pages/Relatorios/FilhosPorVaca"
import PagamentoAno from "../Pages/Relatorios/PagamentoAno";
import PagamentoTipo from "../Pages/Relatorios/PagamentoTipo";
import AnimaisMortosVendidosAno from "../Pages/Relatorios/AnimaisMortoVendidosAno";


export default function Rotas() {
    return(
        <BrowserRouter>
            <Routes>

                <Route path="/login" exact element={<LoggedRoter/>}>
                    <Route path="/login" exact element={<Login/>}/>
                </Route>

                <Route path="/registro" exact element={<Register/>}/>
                <Route path="/login/forgot" exact element={<EsqueceuSenha/>}/>
                <Route path="/login/forgot/:token" exact element={<AlterarSenha/>}/>
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

                <Route path="/listagem/pagamento" exact element={<PrivateRouter/>}>
                    <Route path="/listagem/pagamento" exact element={<ListagemPagamento/>}/>
                </Route>

                <Route path="/listagem/tipo/pagamento" exact element={<PrivateRouter/>}>
                    <Route path="/listagem/tipo/pagamento" exact element={<ListagemTipoPagamento/>}/>
                </Route>

                <Route path="/editar/animal/:id" exact element={<PrivateRouter/>}>
                    <Route path="/editar/animal/:id" exact element={<EditarAnimal/>}/>
                </Route>
       
                <Route path="/editar/tipo/pagamento/:id" exact element={<PrivateRouter/>}>
                    <Route path="/editar/tipo/pagamento/:id" exact element={<EditarTipoPgamento/>}/>
                </Route>

                <Route path="/editar/pagamento/:id" exact element={<PrivateRouter/>}>
                    <Route path="/editar/pagamento/:id" exact element={<EditarPagamento/>}/>
                </Route>

                <Route path="/animal/filhos" exact element={<PrivateRouter/>}>
                    <Route path="/animal/filhos" exact element={<AnimalFilhos/>}/>
                </Route>

                <Route path="/relatorio/pagamento" exact element={<PrivateRouter/>}>
                    <Route path="/relatorio/pagamento" exact element={<PagamentoAno/>}/>
                </Route>
                
                <Route path="/relatorio/tipo/pagamento" exact element={<PrivateRouter/>}>
                    <Route path="/relatorio/tipo/pagamento" exact element={<PagamentoTipo/>}/>
                </Route>

                <Route path="/relatorio/animais/vendidomorto" exact element={<PrivateRouter/>}>
                    <Route path="/relatorio/animais/vendidomorto" exact element={<AnimaisMortosVendidosAno/>}/>
                </Route>
                
            </Routes>
        </BrowserRouter>
    )
}