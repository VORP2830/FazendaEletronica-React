import { toast } from 'react-toastify'
import axios from "axios";
import Cookies from 'universal-cookie';
import MinhaNavBar from '../../../Components/NavBar/MinhaNavBar';
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './index.css'
import { url } from '../../../api';
import { waitFor } from '@testing-library/react';

const cookies = new Cookies();

export default function Pagamento() {
  const token = cookies.get('Token')
  //Vindo do banco
  let [tipoPagamento, setTipoPagamento] = useState([])
  //Enviando para o banco
  let [cadastroPagamentoTipo, setCadastroPagamentoTipo] = useState(null)
  let [cadastroPagamentoChar, setCadastroPagamentoChar] = useState(null)
  let [cadastroPagamentoDescricao, setCadastroPagamentoDescricao] = useState(null)
  let [cadastroPagamentoDataPagamento, setCadastroPagamentoDataPagamento] = useState(null)
  let [cadastroPagamentoValor, setCadastroPagamentoValor] = useState(null)

  useEffect(()=>{
    axios.get(`${url}/tipo/pagamento`, {headers:{'token': token}}).then((res) => {
      setTipoPagamento(res.data.result)
    });
    }, [])

    const cadastro = (event) => {
      event.preventDefault();
      if(!cadastroPagamentoChar||!cadastroPagamentoValor||!cadastroPagamentoDataPagamento){
        toast.error("Todos os campos com * devem ser preenchidos!")
      }else{
        axios.post(`${url}/pagamento`,
          {
            idTipo: cadastroPagamentoTipo,
            charTipo: cadastroPagamentoChar,
            descricao: cadastroPagamentoDescricao,
            dataPagamento: cadastroPagamentoDataPagamento,
            valorPagamento: cadastroPagamentoValor
          },
          {headers:{'token': token}}
          ).then((res) =>{
            if(res.data.result){
              toast.success(res.data.result)
              waitFor(50000)
              window.location.replace(`/listagem/pagamento`)
            }else{
              toast.error(res.data.error)
            }
          })
      }

    }
  return (
    <>
    <MinhaNavBar/>
    <div className='container'>
    <div className='align-self-center'>
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Descrição do pagamento</Form.Label>
          <Form.Control type="text" placeholder="Descrição" onChange={(e) => setCadastroPagamentoDescricao(e.target.value)}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">

      <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Valor do pagamento*</Form.Label>
          <Form.Control type="number" placeholder="Valor pago" onChange={(e) => setCadastroPagamentoValor(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Data do pagamento*</Form.Label>
          <Form.Control type="date" placeholder="Data do pagamento" onChange={(e) => setCadastroPagamentoDataPagamento(e.target.value)}/>
        </Form.Group>
      <Row/>
      <Row>
        
      </Row>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Tipo do pagamento</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={(e) => setCadastroPagamentoTipo(e.target.value)}>
            <option value=''>Selecione</option>
            {tipoPagamento.map((value) => {
              return(
              <option value={value.ID_INT_TIPO_PAGAMENTO}>{value.TXT_NOME}</option>
              )
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Tipo de lançamento*</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={(e) => setCadastroPagamentoChar(e.target.value)}>
            <option>Selecione</option>
            <option value='E'>Entrada</option>
            <option value='S'>Saida</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit" onClick={cadastro}>
        Cadastrar
      </Button>
    </Form>
    </div>
    </div>
    </>
  );
}