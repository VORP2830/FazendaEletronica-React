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


const cookies = new Cookies();

export default function ListagemPagamento() {
  let [animal, setAnimal] = useState([])
  const token = cookies.get('Token')
  useEffect(()=>{
    axios.get(`${url}/pagamento`, {headers:{'token': token}}).then((res) => {
      console.log(res)
      setAnimal(res.data.result)
    });
    }, [])

    const excluir = (id) => {
      axios.delete(`${url}/pagamento/${id}`,
      {headers:{'token': token}}).then((res) => {
        if(res.data.result){
          toast.success(res.data.result)
        }else{
          toast.error(res.data.error)
        }
    })

    }
  return (
    <>
    <MinhaNavBar/>

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
      {animal.map((value) => {
        return(
               <tr>
                    <td>{value.CHAR_TIPO_ENTRADA_SAIDA}</td>
                    <td>{value.DAT_PAGAMENTO}</td>
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
    </>
  );
}