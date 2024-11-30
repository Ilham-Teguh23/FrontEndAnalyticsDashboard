import { faBook, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../layouts/css/NavigationBar.css"

const NavigationBar = () => {
    return (
        <Navbar expand="lg" className="bg-success shadow">
            <Container>
                <Navbar.Brand href="/" className="text-white fw-bold">AnalyticsDashboard</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            <FontAwesomeIcon icon={faHome} className="me-2" /> HOME
                        </Nav.Link>
                        <Nav.Link as={Link} to="/data-set">
                            <FontAwesomeIcon icon={faBook} className="me-2" /> DATA SET
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
