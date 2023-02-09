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

const cookies = new Cookies();

function App() {
  const token = cookies.get('Token')
  //Vindo do banco
  let [tipoAnimal, setTipoAnimal] = useState([])
  let [statusAnimal, setStatusAnimal] = useState([])
  let [finalidadeAnimal, setfinalidadeAnimal] = useState([])
  let [paiAnimal, setPaiAnimal] = useState([])
  //Enviando para o banco
  let [cadastroPaiAnimal, setCadastroPaiAnimal] = useState([])
  let [cadastroTipoAnimal, setCadastroTipoAnimal] = useState([])
  let [cadastroSexoAnimal, setCadastroSexoAnimal] = useState([])
  let [cadastroStatusAnimal, setCadastroStatusAnimal] = useState([])
  let [cadastroFinalidadeAnimal, setCadastroFinalidadeAnimal] = useState([])
  let [cadastroNumeroAnimal, setCadastroNumeroAnimal] = useState([])
  let [cadastroApelidoAnimal, setCadastroApelidoAnimal] = useState([])
  let [cadastroDataNascimentoAnimal, setCadastroDataNascimentoAnimal] = useState([])

  useEffect(()=>{
    axios.get(`${url}/tipo/animal`, {headers:{'token': token}}).then((res) => {
      setTipoAnimal(res.data)
    });
    }, [])
    useEffect(()=>{
      axios.get(`${url}/tipo/status`, {headers:{'token': token}}).then((res) => {
        setStatusAnimal(res.data)
      });
      }, [])

    useEffect(()=>{
        axios.get(`${url}/tipo/finalidade`, {headers:{'token': token}}).then((res) => {
          setfinalidadeAnimal(res.data)
        });
        }, [])
    useEffect(()=>{
        axios.get(`${url}/animal/pai`, {headers:{'token': token}}).then((res) => {
          setPaiAnimal(res.data)
          });
          }, [])
    const cadastroAnimal = (event) => {
      event.preventDefault();
      axios.post(`${url}/animal`,
      {
        numero: cadastroNumeroAnimal,
        id_pai: cadastroPaiAnimal,
        cha_sexo: cadastroSexoAnimal,
        id_finalidade: cadastroFinalidadeAnimal,
        apelido: cadastroApelidoAnimal,
        nascimento: cadastroDataNascimentoAnimal,
        status: cadastroStatusAnimal,
        tipo_animal: cadastroTipoAnimal
      },
      {headers:{'token': token}}
      ).then((res) =>{
        if(res.data.mensagem){
          toast.success(res.data.mensagem)
        }else{
          toast.error(res.data)
        }
      })
    }
  return (
    <>
    <MinhaNavBar/>
    <div className='align-self-center'>
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Numero</Form.Label>
          <Form.Control type="number" placeholder="Numero do animal" onChange={(e) => setCadastroNumeroAnimal(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Apelido</Form.Label>
          <Form.Control type="text" placeholder="Apelido do animal" onChange={(e) => setCadastroApelidoAnimal(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col}  controlId="formGridAddress1">
        <Form.Label>Data de nascimento</Form.Label>
        <Form.Control type='date' placeholder="XX/XX/XXXX" onChange={(e) => setCadastroDataNascimentoAnimal(e.target.value)}/>
      </Form.Group>
      </Row>

      <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Numero da mãe do animal</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={(e) => setCadastroPaiAnimal(e.target.value)}>
            <option value=''>Selecione</option>
            {paiAnimal.map((value) => {
              return(
              <option value={value.ID_INT_ANIMAL}>{value.INT_NUMERO_ANIMAL}</option>
              )
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Finalidade do animal</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={(e) => setCadastroFinalidadeAnimal(e.target.value)}>
            <option>Selecione</option>
            {finalidadeAnimal.map((value) => {
              return(
              <option value={value.ID_INT_FINALIDADE}>{value.TXT_NOME}</option>
              )
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Sexo do animal</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={(e) => setCadastroSexoAnimal(e.target.value)}>
            <option>Selecione</option>
            <option value='M'>Macho</option>
            <option value='F'>Femea</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Status</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={(e) => setCadastroStatusAnimal(e.target.value)}>
            <option>Selecione</option>
            {statusAnimal.map((value) => {
              return(
              <option value={value.ID_INT_STATUS}>{value.TXT_STATUS}</option>
              )
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Tipo do animal</Form.Label>
          <Form.Select defaultValue="Choose..." onChange={(e) => setCadastroTipoAnimal(e.target.value)}>
            <option>Selecione</option>
            {tipoAnimal.map((value) => {
              return(
              <option value={value.ID_INT_TIPO_ANIMAL}>{value.TXT_NOME}</option>
              )
            })}
          </Form.Select>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit" onClick={cadastroAnimal}>
        Cadastrar
      </Button>
    </Form>
    </div>
    </>
  );
}

export default App;