import { toast } from 'react-toastify'
import axios from "axios";
import Cookies from 'universal-cookie';
import MinhaNavBar from '../../../Components/NavBar/MinhaNavBar';
import React, { useState, useEffect, useMemo } from "react";
import Table from 'react-bootstrap/Table';
import './index.css'
import { url } from '../../../api';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Row } from 'react-bootstrap';

const cookies = new Cookies();

export default function PagamentoAno() {

  function formatarData(data) {
    if(data){
          const date = new Date(data);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}/${month}/${year}`;
    }
  }

  let [animal, setAnimal] = useState([])
  const token = cookies.get('Token')
  useEffect(()=>{
    axios.get(`${url}/relatorio/pagamento`, {headers:{'token': token}}).then((res) => {
      setAnimal(res.data.result)
    });
    }, [])

    
    function formatarDataa(data) {
      if(data){
      const date = new Date(data);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
      }
    }

    const [buscaN, setBuscaN] = useState()
    const [buscaD, setBuscaD] = useState()
 
      const filteredAnimal = useMemo(() => {
        if (!buscaN) {
          return animal;
        }
        let filtered = animal;
        if (buscaN) {
          filtered = filtered.filter(a => String(a.ANO).includes(String(buscaN)));
        }
        return filtered;
      }, [animal, buscaN]);

      const limpar = () => {
        setBuscaN('')
        setBuscaD('')
      }

  return (
    <>
    <MinhaNavBar/>

  <div className='pesquisa'>
  <Row>
  <label htmlFor="buscaN">Ano de acontecimento:</label>
  <InputGroup className="input-group mb-3">
    <Form.Control id="buscaN" placeholder="Ano de acontecimento" type='number' value={buscaN} onChange={(e) => setBuscaN(e.target.value)}/>
  </InputGroup>
  </Row>
  <button type="button" class="btn btn-primary" onClick={(e) => limpar()}>Limpar filtros</button>
 
</div>
    
      <div className="conteiner">

      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Ano</th>
          <th>Total entradas</th>
          <th>Total saidas</th>
          <th>Valor final ano</th>
        </tr>
      </thead> 
      <tbody>
      {filteredAnimal.map((value) => {
        return(
               <tr>
                    <td>{value.ANO}</td>
                    <td>R${(value.TOTAL_ENTRADAS)}</td>
                    <td>R${value.TOTAL_SAIDAS}</td>
                    <td>R${(value.VALOR_FINAL_ANO)}</td>
                  </tr>
        )             
        })}
      </tbody>
    </Table>

      </div>
    </>
  );
}