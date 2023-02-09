import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function MinhaNavBar() {
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
            </NavDropdown>
            <NavDropdown title="Animal" id="basic-nav-dropdown">
            <NavDropdown.Item href="/cadastro/animal">Cadastrar animal</NavDropdown.Item>
              <NavDropdown.Item href="/listagem/animal/campo">Animais em campo</NavDropdown.Item>
              <NavDropdown.Item href="/listagem/animal/morto">Animais mortos</NavDropdown.Item>
              <NavDropdown.Item href="/listagem/animal/vendido">Animais vendidos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}