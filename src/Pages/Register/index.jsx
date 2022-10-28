import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../Components/Header/boi.png"
import "../../App.css";
import {url} from "../../api.js"
import axios from "axios";
import { toast } from 'react-toastify'

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [NomeUsuario, setNomeUsuario] = useState("");

  const Botao = (event) =>{
    event.preventDefault()
    if(!nome || !password || !email || !NomeUsuario){
      alert("Todos os campos precisam ser preenchidos")
    }else{
    axios.post(`${url}/usuario/register`,{
      login: NomeUsuario,
      password: password,
      nome: nome,
      email: email,
    }).then((res)=>{
      if(res.data.erro){
        toast.error(res.data.erro)
      }else if(res.data){
        toast.info(res.data)
        window.location.replace(`/login`)
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

            <span className="login-form-title"> Cadastro </span>

            <span className="login-form-title">
            </span>

            <div className="wrap-input">
              <input
                className={nome !== "" ? "has-val input" : "input"}
                type="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Nome"></span>
            </div>

            <div className="wrap-input">
              <input
                className={NomeUsuario !== "" ? "has-val input" : "input"}
                type="email"
                value={NomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Nome de usuário"></span>
            </div>

            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Email"></span>
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
              <button className="login-form-btn" onClick={Botao}>Criar conta</button>
            </div>

            <div className="text-center">
              <span className="txt1">Já possui conta? </span>
              <Link className="txt2" to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;