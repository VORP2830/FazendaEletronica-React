import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Cookies from 'universal-cookie';
import MinhaNavBar from '../../../../Components/NavBar/MinhaNavBar';
import React, { useState, useEffect, useMemo } from "react";
import Table from 'react-bootstrap/Table';
import './index.css'
import { url } from '../../../../api';
import { BsFillTrashFill } from 'react-icons/bs';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { FiEdit } from 'react-icons/fi'
import { Row } from 'react-bootstrap';


const cookies = new Cookies();

export default function ListagemPagamento() {
  function formatarData(data) {
    if(data){
          const date = new Date(data);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}/${month}/${year}`;
    }
  }
  function formatarDataa(data) {
    if(data){
          const date = new Date(data);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
    }
  }

  let [pagamento, setPagamento] = useState([])
  const token = cookies.get('Token')
  useEffect(()=>{
    axios.get(`${url}/pagamento`, {headers:{'token': token}}).then((res) => {
      console.log(res)
      setPagamento(res.data.result)
    });
    }, [])

    const excluir = (id) => {
      axios.delete(`${url}/pagamento/${id}`,
      {headers:{'token': token}}).then((res) => {
        if(res.data.result){
          window.location.reload()
          toast.success(res.data.result)
        }else{
          toast.error(res.data.error)
          setTimeout(() => {
            window.location.replace(`/home`);
          }, 3000);
        }
    })
    }    
    function formatarDataMesAno(data) {
      const date = new Date(data);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      return `${year}-${month}`;
    }

    const [busca, setBusca] = useState();
    const [buscaD, setBuscaD] = useState();
    const [buscaV, setBuscaV] = useState();
    const [buscaS, setBuscaS] = useState();
    const [buscaMA, setBuscaMA] = useState();

    const filteredPagamento = useMemo(() => {
      if (!busca && !buscaD && !buscaV && !buscaS && !buscaMA) {
        return pagamento;
      }
      let filtered = pagamento;
      if (busca) {
        filtered = filtered.filter(a => String(a.TXT_DESCRICAO).toLowerCase().includes(busca.toLowerCase()));
      }
      if (buscaD) {
        filtered = filtered.filter(a => formatarDataa(a.DAT_PAGAMENTO) === (buscaD));
      }
      if (buscaV) {
        filtered = filtered.filter(a => String(a.VLR_PAGAMENTO).includes(String(buscaV)));
      }
      if (buscaS) {
        filtered = filtered.filter(a => String(a.CHAR_TIPO_ENTRADA_SAIDA).includes(String(buscaS)));
      }
      if (buscaMA) {
        filtered = filtered.filter(a => formatarDataMesAno(a.DAT_PAGAMENTO) === (buscaMA));      }
      return filtered;
    }, [pagamento, busca, buscaD, buscaV, buscaS, buscaMA]);

    const limpar = () => {
      setBusca('')
      setBuscaD('')
      setBuscaV('')
      setBuscaS('')
      setBuscaMA('')
    }
  function EouS(string){
    if(string == 'E') return 'Entrada'
    else return 'Saída'
  }
    
  return (
    <>
    <MinhaNavBar/>
    
    <div className='pesquisa'>
     <Row>
     <label>Descrição do pagamento:</label>
      <InputGroup className="input-group mb-3">
          <Form.Control placeholder="Descrição do pagamento" type='text' value={busca} onChange={(e) => setBusca(e.target.value)}/>   
        </InputGroup>
        <label>Data do pagamento:</label>
        <InputGroup className="input-group mb-3">
          <Form.Control placeholder="Data do pagamento" type='date' value={buscaD} onChange={(e) => setBuscaD(e.target.value)}/>
        </InputGroup>
        <label>Valor do pagamento:</label>
        <InputGroup className="input-group mb-3">
          <Form.Control placeholder="Valor pago" type='number' value={buscaV} onChange={(e) => setBuscaV(e.target.value)}/>
        </InputGroup>
        </Row>
        <Row>
        <label>Tipo do pagamento (Entrada/Saída):</label>
        <select className='input-group mb-3' name="select" value={buscaS} onChange={(e) => setBuscaS(e.target.value)}> 
          <option value="" selected>Selecione...</option>
          <option value="E">Entrada</option>
          <option value="S">Saída</option>
        </select>
        <label>Mes e ano do pagamento:</label>
        <InputGroup className="input-group mb-3">
          <Form.Control id="buscaMA" placeholder="Data de venda" type='month' value={buscaMA} onChange={(e) => setBuscaMA(e.target.value)}/>
        </InputGroup>
        </Row>

  </div>
  <div className='pesquisa'>
  <button type="button" class="btn btn-primary" onClick={(e) => limpar()}>Limpar filtros</button>
  </div >
      <div className='conteiner'>
        
      <div className="d-flex justify-content-center">

      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Entrada/Saida</th>
          <th>Data do pagamento</th>
          <th>Descrição do pagamento</th>
          <th>Tipo do pagamento</th>
          <th>Valor pagamento</th>
          <th>Ações</th>
        </tr>
      </thead> 
      <tbody>
      {filteredPagamento.map((value) => {
        return(
               <tr>
                    <td>{EouS(value.CHAR_TIPO_ENTRADA_SAIDA)}</td>
                    <td>{formatarData(value.DAT_PAGAMENTO)}</td>
                    <td>{value.TXT_DESCRICAO}</td>
                    <td>{value.TXT_NOME}</td>
                    <td>R${value.VLR_PAGAMENTO}</td>
                    <td><Button onClick={x => excluir(value.ID_INT_PAGAMENTO)}><BsFillTrashFill/></Button> <Button href={`/editar/pagamento/${value.ID_INT_PAGAMENTO}`} ><FiEdit/></Button></td>
                  </tr>
        )             
        })}
      </tbody>
    </Table>

      </div>
      </div>
    </>
  );
}