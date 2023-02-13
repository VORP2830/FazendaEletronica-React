import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Cookies from 'universal-cookie';
import MinhaNavBar from '../../../../Components/NavBar/MinhaNavBar';
import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';
import './index.css'
import { url } from '../../../../api';
import { BsFillTrashFill } from 'react-icons/bs';
import { wait } from '@testing-library/user-event/dist/utils';

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
        }
    })
    }
  return (
    <>
    <MinhaNavBar/>

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
      {pagamento.map((value) => {
        return(
               <tr>
                    <td>{value.TXT_NOME}</td>
                    <td>{value.TXT_DESCRICAO}</td>
                    <td><Button onClick={x => excluir(value.ID_INT_TIPO_PAGAMENTO)}><BsFillTrashFill/></Button></td>
                  </tr>
        )             
        })}
      </tbody>
    </Table>

      </div>
    </>
  );
}