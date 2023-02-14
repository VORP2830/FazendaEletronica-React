import "./index.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie';
import {url} from "../../api.js"
import { useState, useEffect } from "react";
import MinhaNavBar from "../../Components/NavBar/MinhaNavBar";

const cookies = new Cookies();

function App() {

  let [totalPagamento, setTotalPagamento] = useState([])
  let [totalPagamentoE, setTotalPagamentoE] = useState(0)
  let [totalPagamentoS, setTotalPagamentoS] = useState(0)
  let [totalTela, setTotalTela] = useState([])
  let [totalTelaCampo, setTotalTelaCampo] = useState(0)
  let [totalTelaMorto, setTotalTelaMorto] = useState(0)
  let [totalTelaVendido, setTotalTelaVendido] = useState(0)

  const token = cookies.get('Token')
  useEffect(()=>{
    axios.get(`${url}/pagamento/total/tela`, {headers:{'token': token}}).then((res) => {
      setTotalPagamento(res.data.result)
    });
    }, [])
  

  useEffect(()=>{
      for (let i = 0; i < totalPagamento.length; i++) {
        if (totalPagamento[i].CHAR_TIPO_ENTRADA_SAIDA === "S") {
          setTotalPagamentoS(totalPagamento[i].TOTAL_CALCULADO);
        }else if(totalPagamento[i].CHAR_TIPO_ENTRADA_SAIDA === "E"){
          setTotalPagamentoE(totalPagamento[i].TOTAL_CALCULADO);
        }
      }
    })

    
  useEffect(()=>{
      axios.get(`${url}/animal/telaprincipal`, {headers:{'token': token}}).then((res) => {
        console.log(res.data.result)
        setTotalTela(res.data.result)
      });
      }, [])

    useEffect(()=>{
        for (let i = 0; i < totalTela.length; i++) {
          if (totalTela[i].TXT_STATUS === "Em campo") {
            setTotalTelaCampo(totalTela[i].TOTAL);
          }else if(totalTela[i].TXT_STATUS === "Morto"){
            setTotalTelaMorto(totalTela[i].TOTAL);
          }else if(totalTela[i].TXT_STATUS === "Vendido"){
            setTotalTelaVendido(totalTela[i].TOTAL)
          }
        }
      })

  function diferenca(entrada, saida) {
    return +entrada - +saida
  }
  

  return (
    <>
    <MinhaNavBar/>
    <div className="home">
      <div className="container-home">

 
          <Link to='/listagem/animal/campo' className="wrap-home">
          <div className="container-foto">
          Em Campo
          </div>
          <div className="numero">
            {totalTelaCampo}
          </div>
          </Link>
    

          <Link to='/listagem/animal/vendido' className="wrap-home">
        <div className="container-foto">
            Vendidos
          </div>
          <div className="numero">
          {totalTelaVendido}
          </div>
          </Link>

          <Link to='/listagem/animal/morto' className="wrap-home">
        <div className="container-foto">
            Mortos
          </div>
          <div className="numero">
            {totalTelaMorto}
          </div>
          </Link>

      <div className="wrap-pagamento">

        <div className="PagamentoMensal">
          Valor final do mês: R${diferenca(totalPagamentoE, totalPagamentoS)}
          <br></br>
          Total de entradas do mês: R${+totalPagamentoE}
          <br></br>
          Total de saidas do mês: R${+totalPagamentoS}
        </div>

      </div>

      </div>
    </div>
    </>
  );
}

export default App;