import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'universal-cookie';
import { waitFor } from '@testing-library/react';

const cookies = new Cookies();

export default function MinhaNavBar() {
  const Logout = () => {
    cookies.remove('Token')
    waitFor(5000)
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
              <NavDropdown.Item href="/listagem/pagamento">Listar pagamentos</NavDropdown.Item>
              <NavDropdown.Item href="/listagem/tipo/pagamento">Listar tipos de pagamentos</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Animal" id="basic-nav-dropdown">
            <NavDropdown.Item href="/cadastro/animal">Cadastrar animal</NavDropdown.Item>
              <NavDropdown.Item href="/listagem/animal/campo">Listar animais em campo</NavDropdown.Item>
              <NavDropdown.Item href="/listagem/animal/morto">Listar animais mortos</NavDropdown.Item>
              <NavDropdown.Item href="/listagem/animal/vendido">Listar animais vendidos</NavDropdown.Item>
            </NavDropdown>

            <button class="btn btn-sm btn-outline-secondary" type="button" onClick={x=>Logout()}>Logout</button>
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}