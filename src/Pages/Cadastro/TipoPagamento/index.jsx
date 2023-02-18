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
  let [cadastroNome, setCadastroNome] = useState(null)
  let [cadastroDescricao, setCadastroDescricao] = useState(null)

  const cadastro = (event) => {
    event.preventDefault();
    if(!cadastroNome||!cadastroDescricao){
      toast.error("Todos os campos com * devem ser preenchidos!")
    }else{
      axios.post(`${url}/tipo/pagamento`,      
      {
        nome: cadastroNome,
        descricao: cadastroDescricao
      },
      {headers:{'token': token}}
      ).then((res) =>{
        console.log(res)
        if(res.data){
          toast.success('Tipo de pagamento criado com sucesso')
          window.location.replace(`/listagem/tipo/pagamento`)
        }else{
          toast.error('Ocorreu um erro: '+ res.data)
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
        <Row>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Tipo do pagamento*</Form.Label>
          <Form.Control type="text" placeholder="Tipo do pagamento" onChange={(e) => setCadastroNome(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col}  controlId="formGridAddress1">
        <Form.Label>Descrição do pagamento*</Form.Label>
        <Form.Control placeholder="Descrição" onChange={(e) => setCadastroDescricao(e.target.value)}/>
      </Form.Group>
      </Row>

        <br/>
      <Button variant="primary" type="submit" onClick={cadastro}>
        Cadastrar
      </Button>
    </Form>
    </div>      
    </div>
    </>
  );
}

export default App;