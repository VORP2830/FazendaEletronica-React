import React from "react";
import Rotas from "./Routers";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return(
        <>
            <Rotas/>
            <ToastContainer autoClose={3000} className="toast-container"/>
        </>
    )
}
export default App;