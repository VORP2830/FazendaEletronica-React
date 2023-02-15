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
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const cookies = new Cookies();

export default function AnimalVivo() {
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
    axios.get(`${url}/animal/campo`, {headers:{'token': token}}).then((res) => {
      setAnimal(res.data.result)
    });
    }, [])

    const excluir = (id) => {
      axios.delete(`${url}/animal/${id}`,
      {headers:{'token': token}}).then((res) => {
        if(res.data.result){
          toast.success(res.data.result)
          window.location.reload()
        }else{
          toast.error(res.data.error)
        }
    })
    }
  return (
    <>
    <MinhaNavBar/>
  <div className='pesquisa'>
      <InputGroup className="mb-3">
          <Form.Control placeholder="Numero do animal"/>
          <Button variant="outline-secondary" id="button-addon2">
            Pesquisar
          </Button>
        </InputGroup>
  </div>
      <div className="conteiner">

      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Numero do animal</th>
          <th>Numero da mãe</th>
          <th>Sexo</th>
          <th>Apelido</th>
          <th>Data nascimento</th>
          <th>Tipo do animal</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead> 
      <tbody>
      {animal.map((value) => {
        return(
               <tr>
                    <td>{value.INT_NUMERO_ANIMAL}</td>
                    <td>{value.NUMERO_PAI}</td>
                    <td>{value.CHA_SEXO}</td>
                    <td>{value.TXT_APELIDO}</td>
                    <td>{formatarData(value.DAT_NASCIMENTO)}</td>
                    <td>{value.TXT_NOME}</td>
                    <td>{value.TXT_STATUS}</td>
                    <td><Button onClick={x => excluir(value.ID_INT_ANIMAL)}><BsFillTrashFill/></Button></td>
                  </tr>
        )             
        })}
      </tbody>
    </Table>

      </div>
    </>
  );
}