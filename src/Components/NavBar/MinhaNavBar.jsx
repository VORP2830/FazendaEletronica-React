import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { BiLogIn } from 'react-icons/bi';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function MinhaNavBar() {
  const Logout = () => {
    cookies.remove('Token')
    window.location.replace(`/login`)
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/home">Fazenda Eletrônica</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <NavDropdown title="Pagamento" id="basic-nav-dropdown">
              <NavDropdown.Item href="/cadastro/tipo/pagamento">Cadastrar tipo pagamento</NavDropdown.Item>
              <NavDropdown.Item href="/cadastro/pagamento">Cadastrar pagamento</NavDropdown.Item>
              <NavDropdown.Item href="/listagem/pagamento">Pagamento</NavDropdown.Item>
              <NavDropdown.Item href="/listagem/tipo/pagamento">Tipo de pagamento</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Animal" id="basic-nav-dropdown">
            <NavDropdown.Item href="/cadastro/animal">Cadastrar animal</NavDropdown.Item>
              <NavDropdown.Item href="/listagem/animal/campo">Animais em campo</NavDropdown.Item>
              <NavDropdown.Item href="/listagem/animal/morto">Animais mortos</NavDropdown.Item>
              <NavDropdown.Item href="/listagem/animal/vendido">Animais vendidos</NavDropdown.Item>
            </NavDropdown>

            <Button onClick={x=>Logout()}>Logout</Button>
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}