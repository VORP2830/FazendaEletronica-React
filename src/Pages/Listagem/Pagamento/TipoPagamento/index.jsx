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

export default function ListagemTipoPagamento() {
  let [pagamento, setPagamento] = useState([])
  const token = cookies.get('Token')
  useEffect(()=>{
    axios.get(`${url}/tipo/pagamento`, {headers:{'token': token}}).then((res) => {
      setPagamento(res.data.result)
    });
    }, [])

    const excluir = (id) => {
      axios.delete(`${url}/tipo/pagamento/${id}`,
      {headers:{'token': token}}).then((res) => {
        window.location.reload()
        if(res.data){
          toast.success(res.data)
        }else{
          toast.error(res.data.error)
          setTimeout(() => {
            window.location.replace(`/home`);
          }, 3000);
        }
    })
    }

    const [busca, setBusca] = useState()
    const filteredPagamento = useMemo(() => {
      if (!busca) {
        return pagamento;
      }
      return pagamento.filter(a => String(a.TXT_NOME).toLowerCase().includes(busca.toLowerCase()));
    }, [pagamento, busca]);
  return (
    <>
    <MinhaNavBar/>

    <div className='pesquisa'>
      <Row>
    <label>Nome do tipo de pagamento:</label>
      <InputGroup className="mb-3">
          <Form.Control placeholder="Nome do tipo de pagamento" type='text' value={busca} onChange={(e) => setBusca(e.target.value)}/>
        </InputGroup>
      </Row>
  </div>

      <div className="conteiner">

      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Nome do tipo de pagamento</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead> 
      <tbody>
      {filteredPagamento.map((value) => {
        return(
               <tr>
                    <td>{value.TXT_NOME}</td>
                    <td>{value.TXT_DESCRICAO}</td>
                    <td><Button onClick={x => excluir(value.ID_INT_TIPO_PAGAMENTO)}><BsFillTrashFill/></Button> <Button href={`/editar/tipo/pagamento/${value.ID_INT_TIPO_PAGAMENTO}`} ><FiEdit/></Button></td>
                  </tr>
        )             
        })}
      </tbody>
    </Table>

      </div>
    </>
  );
}