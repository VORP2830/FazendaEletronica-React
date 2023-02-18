import { toast } from 'react-toastify'
import axios from "axios";
import Cookies from 'universal-cookie';
import MinhaNavBar from '../../../Components/NavBar/MinhaNavBar';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './index.css'
import { url } from '../../../api';

const cookies = new Cookies();

function App() {
  const { id } = useParams();
  const token = cookies.get('Token')
  //Vindo do banco
  let [tipoAnimal, setTipoAnimal] = useState([])
  let [statusAnimal, setStatusAnimal] = useState([])
  let [finalidadeAnimal, setfinalidadeAnimal] = useState([])
  let [paiAnimal, setPaiAnimal] = useState([])
  let [animalId, setAnimalId] = useState([])
  //Enviando para o banco
  let [cadastroPaiAnimal, setCadastroPaiAnimal] = useState()
  let [cadastroTipoAnimal, setCadastroTipoAnimal] = useState()
  let [cadastroSexoAnimal, setCadastroSexoAnimal] = useState()
  let [cadastroStatusAnimal, setCadastroStatusAnimal] = useState()
  let [cadastroFinalidadeAnimal, setCadastroFinalidadeAnimal] = useState()
  let [cadastroNumeroAnimal, setCadastroNumeroAnimal] = useState()
  let [cadastroApelidoAnimal, setCadastroApelidoAnimal] = useState()
  let [cadastroDataNascimentoAnimal, setCadastroDataNascimentoAnimal] = useState()
  let [cadastroDataVenda, setCadastroDataVenda] = useState()

  useEffect(() => {
    axios.get(`${url}/animal/${id}`, { headers: { 'token': token } })
      .then((res) => {
        if (res.data.result) {
          const animal = res.data.result[0];
          setCadastroPaiAnimal(animal.ID_INT_PAI);
          setCadastroTipoAnimal(animal.ID_INT_TIPO_ANIMAL);
          setCadastroSexoAnimal(animal.CHA_SEXO);
          setCadastroStatusAnimal(animal.ID_INT_STATUS);
          setCadastroFinalidadeAnimal(animal.ID_INT_FINALIDADE);
          setCadastroNumeroAnimal(animal.INT_NUMERO_ANIMAL);
          setCadastroApelidoAnimal(animal.TXT_APELIDO);
          setCadastroDataNascimentoAnimal(formatarData(animal.DAT_NASCIMENTO));
          setAnimalId(animal.ID_INT_ANIMAL)
        } else {
          toast.error(res.data.error);
        }
      });
  }, []);

  function formatarData(data) {
    if(data){
          const date = new Date(data);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
    }
  }

  useEffect(()=>{
    axios.get(`${url}/tipo/animal`, {headers:{'token': token}}).then((res) => {
      setTipoAnimal(res.data.result)
    });
    }, [])
    useEffect(()=>{
      axios.get(`${url}/tipo/status`, {headers:{'token': token}}).then((res) => {
        setStatusAnimal(res.data.result)
      });
      }, [])

    useEffect(()=>{
        axios.get(`${url}/tipo/finalidade`, {headers:{'token': token}}).then((res) => {
          setfinalidadeAnimal(res.data.result)
        });
        }, [])
    useEffect(()=>{
        axios.get(`${url}/animal/pai`, {headers:{'token': token}}).then((res) => {
          setPaiAnimal(res.data.result)
          });
          }, [])

    const cadastroAnimal = (event) => {
      event.preventDefault();
      if(!cadastroNumeroAnimal||!cadastroSexoAnimal||!cadastroFinalidadeAnimal||!cadastroStatusAnimal||!cadastroTipoAnimal){
        toast.error("Todos os campos com * devem ser preenchidos!")
      }else{
        axios.put(`${url}/animal`,
            {
              idAnimal: animalId,
              numero: cadastroNumeroAnimal,
              idPai: cadastroPaiAnimal,
              charSexo: cadastroSexoAnimal,
              idFinalidade: cadastroFinalidadeAnimal,
              apelido: cadastroApelidoAnimal,
              nascimento: cadastroDataNascimentoAnimal,
              idStatus: cadastroStatusAnimal,
              idTipoAnimal: cadastroTipoAnimal,
              dataVenda: cadastroDataVenda
            },
            {headers:{'token': token}}
            ).then((res) =>{
              if(res.data.result){
                toast.success(res.data.result)
                window.location.replace(`/home`)
              }else{
                toast.error(res.data.error)
              }
            })
      }

    }
    const [mostrarCampoDataVenda, setMostrarCampoDataVenda] = useState(false);

    function getIdStatusVendido(statusAnimal) {
      for (let i = 0; i < statusAnimal.length; i++) {
        if (statusAnimal[i].TXT_STATUS === 'Vendido') {
          return statusAnimal[i].ID_INT_STATUS;
        }
      }
      return null;
    }
    

      const idStatusVendido = getIdStatusVendido(statusAnimal);


      useEffect(() => {
        if (+cadastroStatusAnimal === +idStatusVendido) {
          setMostrarCampoDataVenda(true);
        } else {
          setMostrarCampoDataVenda(false);
        }
      }, [cadastroStatusAnimal, idStatusVendido]);
      
  return (
    <>
    <MinhaNavBar/>
    <div className='container'>
    <div className='align-self-center'>
    <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Numero*</Form.Label>
          <Form.Control type="number" placeholder="Numero do animal" value={cadastroNumeroAnimal} onChange={(e) => setCadastroNumeroAnimal(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Apelido</Form.Label>
          <Form.Control type="text" placeholder="Apelido do animal" value={cadastroApelidoAnimal} onChange={(e) => setCadastroApelidoAnimal(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col}  controlId="formGridAddress1">
        <Form.Label>Data de nascimento</Form.Label>
        <Form.Control type='date' placeholder="XX/XX/XXXX" value={cadastroDataNascimentoAnimal} onChange={(e) => setCadastroDataNascimentoAnimal(e.target.value)}/>
      </Form.Group>
      </Row>

      <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Numero da mãe do animal</Form.Label>
          <Form.Select defaultValue="Choose..." value={cadastroPaiAnimal} onChange={(e) => setCadastroPaiAnimal(e.target.value)}>
            <option value=''>Selecione</option>
            {paiAnimal.map((value) => {
              return(
              <option value={value.ID_INT_ANIMAL}>{value.INT_NUMERO_ANIMAL}</option>
              )
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Finalidade do animal*</Form.Label>
          <Form.Select defaultValue={cadastroFinalidadeAnimal} value={cadastroFinalidadeAnimal} onChange={(e) => setCadastroFinalidadeAnimal(e.target.value)}>
            <option>Selecione</option>
            {finalidadeAnimal.map((value) => {
              return(
              <option value={value.ID_INT_FINALIDADE}>{value.TXT_NOME}</option>
              )
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Sexo do animal*</Form.Label>
          <Form.Select defaultValue={cadastroSexoAnimal} value={cadastroSexoAnimal} onChange={(e) => setCadastroSexoAnimal(e.target.value)}>
            <option>Selecione</option>
            <option value='M'>Macho</option>
            <option value='F'>Femea</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Status*</Form.Label>
          <Form.Select defaultValue={cadastroStatusAnimal} value={cadastroStatusAnimal} onChange={(e) => setCadastroStatusAnimal(e.target.value) }>
            <option>Selecione</option>
            {statusAnimal.map((value) => {
              return(
              <option value={value.ID_INT_STATUS}>{value.TXT_STATUS}</option>
              )
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Tipo do animal*</Form.Label>
          <Form.Select defaultValue={cadastroTipoAnimal} value={cadastroTipoAnimal} onChange={(e) => setCadastroTipoAnimal(e.target.value)}>
            <option>Selecione</option>
            {tipoAnimal.map((value) => {
              return(
              <option value={value.ID_INT_TIPO_ANIMAL}>{value.TXT_NOME}</option>
              )
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridAddress1" style={{ display: mostrarCampoDataVenda ? 'block' : 'none' }}>
        <Form.Label>Data de venda</Form.Label>
        <Form.Control type='date' placeholder="XX/XX/XXXX" value={cadastroDataVenda} onChange={(e) => setCadastroDataVenda(e.target.value)}/>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit" onClick={cadastroAnimal}>
        Atualizar
      </Button>
    </Form>
    </div>
    </div>
    </>
  );
}

export default App;