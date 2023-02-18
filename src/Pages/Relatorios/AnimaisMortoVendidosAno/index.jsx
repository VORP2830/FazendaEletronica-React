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

export default function AnimaisMortosVendidosAno() {

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
    axios.get(`${url}/relatorio/animal/mortosvendidosano`, {headers:{'token': token}}).then((res) => {
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
        if (!buscaN && !buscaD) {
          return animal;
        }
        let filtered = animal;
        if (buscaN) {
          filtered = filtered.filter(a => String(a.TIPO_PAGAMENTO).toLowerCase().includes(String(buscaN).toLowerCase()));
        }
        if (buscaD) {
          filtered = filtered.filter(a => String(a.ANO).includes(String(buscaD)));
        }
        return filtered;
      }, [animal, buscaN, buscaD]);

      const limpar = () => {
        setBuscaN('')
        setBuscaD('')
      }

  return (
    <>
    <MinhaNavBar/>

  <div className='pesquisa'>
  <Row>
  <label htmlFor="buscaD">Ano de acontecimento:</label>
  <InputGroup className="input-group mb-3">
    <Form.Control id="buscaD" placeholder="Ano de acontecimento" type='number' value={buscaD} onChange={(e) => setBuscaD(e.target.value)}/>
  </InputGroup>
  </Row>
  <button type="button" class="btn btn-primary" onClick={(e) => limpar()}>Limpar filtros</button>
</div>
    
      <div className="conteiner">

      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Ano de acontecimento</th>
          <th>Vendidos no ano</th>
          <th>Mortos no ano</th>
        </tr>
      </thead> 
      <tbody>
      {filteredAnimal.map((value) => {
        return(
               <tr>
                    <td>{value.ANO}</td>
                    <td>{(value.VENDIDOS)}</td>
                    <td>{value.MORTOS}</td>
                  </tr>
        )             
        })}
      </tbody>
    </Table>

      </div>
    </>
  );
}