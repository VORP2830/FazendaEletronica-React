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
import Row from 'react-bootstrap/Row';


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
        }
    })

    }

    const [busca, setBusca] = useState();
    const [buscaD, setBuscaD] = useState();
    const [buscaV, setBuscaV] = useState();
    
    const filteredPagamento = useMemo(() => {
      if (!busca && !buscaD) {
        return pagamento;
      }
      if (busca) {
        return pagamento.filter(a => String(a.TXT_DESCRICAO).toLowerCase().includes(busca.toLowerCase()));
      }
      else if (buscaD){
        return pagamento.filter(a => formatarDataa(a.DAT_PAGAMENTO) === (buscaD));
      } else if (buscaV){
        //mexer em buscar valor
        return pagamento.filter(a => a.VLR_PAGAMENTO === (buscaV));
      }
      return pagamento;
    }, [pagamento, busca, buscaD, buscaV]);

    const limpar = () => {
      setBusca('')
      setBuscaD('')
      setBuscaV('')
    }
    
  return (
    <>
    <MinhaNavBar/>
    
    <div className='pesquisa'>
     
      <InputGroup className="mb-3">
          <Form.Control placeholder="Descrição do pagamento" type='text' value={busca} onChange={(e) => setBusca(e.target.value)}/>
            
        </InputGroup>

        <InputGroup className="mb-3">
          <Form.Control placeholder="Data do pagamento" type='date' value={buscaD} onChange={(e) => setBuscaD(e.target.value)}/>
            
        </InputGroup>
       
        <InputGroup className="mb-3">
          <Form.Control placeholder="Valor pago" type='number' value={buscaV} onChange={(e) => setBuscaV(e.target.value)}/>
            
        </InputGroup>
        

  </div><button type="button" class="btn btn-primary" onClick={(e) => limpar()}>Limpar filtros</button>
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
                    <td>{value.CHAR_TIPO_ENTRADA_SAIDA}</td>
                    <td>{formatarData(value.DAT_PAGAMENTO)}</td>
                    <td>{value.TXT_DESCRICAO}</td>
                    <td>{value.TXT_NOME}</td>
                    <td>R${value.VLR_PAGAMENTO}</td>
                    <td><Button onClick={x => excluir(value.ID_INT_PAGAMENTO)}><BsFillTrashFill/></Button></td>
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