import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../App.css";
import logo from "../../Imagens/boi.png"
import axios from "axios";
import {url} from "../../api.js"
import { toast } from 'react-toastify'

function AlterarSenha() {
  let { token } = useParams()
  const [senha, setSenha] = useState("");

  const Botao = (event) =>{
    event.preventDefault();
    
    if(!senha){
      toast.info("O campo senha é obrigatório!")
    }else{
    axios.post(`${url}/${token}}`,
    {
      password: senha
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
                className={senha !== "" ? "has-val input" : "input"}
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Nova senha"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={Botao}>Alterar senha</button>

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

export default AlterarSenha;