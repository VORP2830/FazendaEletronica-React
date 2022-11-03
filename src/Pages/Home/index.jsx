import "./index.css";
import { toast } from 'react-toastify'
import Hearder from '../../Components/Header'
import axios from "axios";
import Cookies from 'universal-cookie';
import {url} from "../../api.js"
import { useState } from "react";

const cookies = new Cookies();

function App() {
  return (
    <>
    <Hearder>
    </Hearder>
    <div className="home">
      <div className="container-home">

        <div className="wrap-home">
          <div className="container-foto">
          Em Campo
          </div>
          <div className="numero">
            120
          </div>
        </div>

        <div className="wrap-home">
        <div className="container-foto">
            Vendidos
          </div>
          <div className="numero">
          12
          </div>
          
        </div>  

        <div className="wrap-home">
        <div className="container-foto">
            Mortos
          </div>
          <div className="numero">
            2
          </div>
          
        </div> 

      <div className="wrap-pagamento">

        <div className="PagamentoMensal">
          Valor final do mês: R${}
        </div>

      </div>

      </div>
    </div>
    </>
  );
}

export default App;