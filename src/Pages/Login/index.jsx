import { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import logo from "../../Imagens/boi.png"
import {url} from "../../api.js"
import axios from "axios";
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify'

const cookies = new Cookies();

function App() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const Botao = (event) =>{
    event.preventDefault();
    if(!login || !password){
      toast.error(`Os campos são obrigatórios!!`)
    }else{
    axios.post(`${url}/usuario/login`,
    {
      login: login,
      senha: password,
    }).then((res)=>{
      console.log(res)
    if(res.data.token){
      cookies.set('Token',res.data.token)
      window.location.replace(`/home`)
  }else if(res.data.erro){
    toast.error(res.data.erro)
  }else{
    toast.error("Erro: entre em contato com o administrador!")
  }
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

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={Botao}>Login</button>
              <span className="txt1">Esqueceu a senha?</span>
              <Link className="txt2" to="/login/forgot">Clique aqui</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;