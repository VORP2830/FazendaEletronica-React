import { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import logo from "../../Components/Header/boi.png"
import axios from "axios";
import {url} from "../../api.js"
import { toast } from 'react-toastify'

function App() {
  const [login, setLogin] = useState("");

  const Botao = (event) =>{
    event.preventDefault();
    if(!login){
      toast.info("O campo login/usuário é obrigatório!")
    }else{
    axios.post(`${url}/usuario/esqueceusenha`,
    {
      login: login
    }).then((res)=>{
        toast.info(res.data)
    })
  }
}

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">

          <span className="login-form-title">
              <img src={logo} alt="Logo" />
            </span>

            <span className="login-form-title">
            </span>

            <div className="wrap-input">
              <input
                className={login !== "" ? "has-val input" : "input"}
                type="login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Login/Usuário"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={Botao}>Enviar email</button>

              <div className="text-center">
              <span className="txt1">Já possui conta? </span>
              <Link className="txt2" to="/login">Login</Link>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;