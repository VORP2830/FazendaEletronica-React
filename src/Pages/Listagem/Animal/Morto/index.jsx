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
import { FiEdit } from 'react-icons/fi'
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const cookies = new Cookies();

export default function AnimalMorto() {
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
    axios.get(`${url}/animal/morto`, {headers:{'token': token}}).then((res) => {
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

    function formatarDataa(data) {
      if(data){
            const date = new Date(data);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
      }
    }
    function sexo(string){
      if(string == "M") return "Macho"
      else return "Femea"
    }

    function formatarDataMesAno(data) {
      const date = new Date(data);
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      return `${year}-${month}`;
    }

    const [buscaN, setBuscaN] = useState()
    const [buscaNM, setBuscaNM] = useState()
    const [buscaA, setBuscaA] = useState()
    const [buscaD, setBuscaD] = useState()
    const [buscaS, setBuscaS] = useState()
    const [buscaMA, setBuscaMA] = useState()

      const filteredAnimal = useMemo(() => {
        if (!buscaN && !buscaNM && !buscaD && !buscaA && !buscaS) {
          return animal;
        }
        let filtered = animal;
        if (buscaN) {
          filtered = filtered.filter(a => String(a.INT_NUMERO_ANIMAL).includes(String(buscaN)));
        }
        if (buscaD) {
          filtered = filtered.filter(a => formatarDataa(a.DAT_NASCIMENTO) === (buscaD));
        }
        if (buscaA) {
          filtered = filtered.filter(a => String(a.TXT_APELIDO).includes(String(buscaA)));
        }
        if (buscaNM) {
          filtered = filtered.filter(a => String(a.NUMERO_PAI).includes(String(buscaNM)));
        }
        if (buscaS) {
          filtered = filtered.filter(a => String(a.CHA_SEXO).includes(String(buscaS)));
        }
        return filtered;
      }, [animal, buscaN, buscaNM, buscaA, buscaD, buscaS]);

      const limpar = () => {
        setBuscaN('')
        setBuscaNM('')
        setBuscaA('')
        setBuscaD('')
        setBuscaS('')
      }

  return (
    <>
    <MinhaNavBar/>

    <div className='pesquisa'>
      <InputGroup className="input-group mb-3">
          <Form.Control placeholder="Numero do animal" type='number' value={buscaN} onChange={(e) => setBuscaN(e.target.value)}/>
      </InputGroup>

      <InputGroup className="input-group mb-3">
          <Form.Control placeholder="Numero da mãe" type='number' value={buscaNM} onChange={(e) => setBuscaNM(e.target.value)}/>
      </InputGroup>

      <InputGroup className="input-group mb-3">
          <Form.Control placeholder="Apelido" type='text' value={buscaA} onChange={(e) => setBuscaA(e.target.value)}/>
      </InputGroup>

      <InputGroup className="input-group mb-3">
          <Form.Control placeholder="Data nascimento" type='date' value={buscaD} onChange={(e) => setBuscaD(e.target.value)}/>
      </InputGroup>

      <select class="input-group mb-3" value={buscaS} onChange={(e) => setBuscaS(e.target.value)}>
        <option value='' selected>Selecionar</option>
        <option value="M">Macho</option>
        <option value="F">Femea</option>
      </select>
    </div>
    
    <button type="button" class="btn btn-primary" onClick={(e) => limpar()}>Limpar filtros</button>
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
      {filteredAnimal.map((value) => {
        return(
               <tr>
                    <td>{value.INT_NUMERO_ANIMAL}</td>
                    <td>{value.NUMERO_PAI}</td>
                    <td>{sexo(value.CHA_SEXO)}</td>
                    <td>{value.TXT_APELIDO}</td>
                    <td>{formatarData(value.DAT_NASCIMENTO)}</td>
                    <td>{value.TXT_NOME}</td>
                    <td>{value.TXT_STATUS}</td>
                    <td><Button onClick={x => excluir(value.ID_INT_ANIMAL)}><BsFillTrashFill/></Button> <Button href={`/editar/animal/${value.ID_INT_ANIMAL}`} ><FiEdit/></Button></td>
                  </tr>
        )             
        })}
      </tbody>
    </Table>

      </div>
    </>
  );
}