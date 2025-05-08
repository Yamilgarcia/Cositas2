import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from '../assets/ferreteria_selva_logo.png'; // o la ruta relativa correcta

import { useAuth } from "../database/authcontext";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../App.css";

const Encabezado = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setIsCollapsed(false);
      localStorage.removeItem("adminEmail");
      localStorage.removeItem("adminPassword");
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleToggle = () => setIsCollapsed(!isCollapsed);

  // Función de navegación
  const handleNavigate = (path) => {
    navigate(path);
    setIsCollapsed(false);
  };

  return (
    <Navbar expand="sm" fixed="top" className="color-navbar">
      <Container>
        <Navbar.Brand onClick={() => handleNavigate("/inicio")} className="text-white" style={{ cursor: "pointer" }}>
          <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />{" "}
          <strong>De mamaica</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" onClick={handleToggle} />
        <Navbar.Offcanvas
          id="offcanvasNavbar-expand-sm"
          aria-labelledby="offcanvasNavbarLabel-expand-sm"
          placement="end"
          show={isCollapsed}
          onHide={() => setIsCollapsed(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm" className={isCollapsed ? "color-texto-marca" : "text-white"}>
              Menú
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link onClick={() => handleNavigate("/inicio")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                {isCollapsed ? <i className="bi-house-door-fill me-2"></i> : null}
                <strong>Inicio</strong>
              </Nav.Link>

              {/* Nueva opción de navegación: Categorías */}
              <Nav.Link onClick={() => handleNavigate("/categorias")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                {isCollapsed ? <i className="bi bi-tags-fill me-2"></i> : null}
                <strong>Categorías</strong>
              </Nav.Link>

              {/* Nueva opción de navegación: Productos */}
              <Nav.Link onClick={() => handleNavigate("/productos")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                {isCollapsed ? <i className="bi bi-box-seam-fill me-2"></i> : null}
                <strong>Productos</strong>
              </Nav.Link>


              <Nav.Link onClick={() => handleNavigate("/catalogo")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                {isCollapsed ? <i className="bi bi-cart-fill me-2"></i> : null}
                <strong>Catálogo</strong>
              </Nav.Link>


              <Nav.Link onClick={() => handleNavigate("/Libros")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                {isCollapsed ? <i className="bi bi-cart-fill me-2"></i> : null}
                <strong>Libros</strong>
              </Nav.Link>

              <Nav.Link onClick={() => handleNavigate("/Clima")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                {isCollapsed ? <i className="bi bi-cart-fill me-2"></i> : null}
                <strong>Clima</strong>
              </Nav.Link>


              <Nav.Link onClick={() => handleNavigate("/Pronunciacion")} className={isCollapsed ? "color-texto-marca" : "text-white"}>
                {isCollapsed ? <i className="bi bi-cart-fill me-2"></i> : null}
                <strong>Pronunciacion</strong>
              </Nav.Link>


              {isLoggedIn ? (
                <Nav.Link onClick={handleLogout} className={isCollapsed ? "text-black" : "text-white"}>
                  Cerrar Sesión
                </Nav.Link>
              ) : location.pathname === "/" && (
                <Nav.Link onClick={() => handleNavigate("/")} className={isCollapsed ? "text-black" : "text-white"}>
                  Iniciar Sesión
                </Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Encabezado;
