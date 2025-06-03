import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const ModalRegistroEmpleado = ({ show, onHide, onGuardar }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cedula, setCedula] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [foto, setFoto] = useState(null);

  const [errores, setErrores] = useState({});
  const [formValido, setFormValido] = useState(false);

  const regex = {
    nombre: /^[a-zA-Z\s]{2,50}$/,
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    telefono: /^\d{4}-\d{4}$/,
    cedula: /^\d{3}-\d{6}-\d{4}[A-Za-z]$/,
    contrasena: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
  };

  const validarCampos = () => {
    const nuevosErrores = {};

    if (!regex.nombre.test(nombre)) nuevosErrores.nombre = "Nombre inválido.";
    if (!regex.nombre.test(apellido))
      nuevosErrores.apellido = "Apellido inválido.";
    if (!regex.correo.test(correo)) nuevosErrores.correo = "Correo inválido.";
    if (!regex.telefono.test(telefono))
      nuevosErrores.telefono = "Teléfono inválido.";
    if (!regex.cedula.test(cedula)) nuevosErrores.cedula = "Cédula inválida.";
    if (!regex.contrasena.test(contrasena))
      nuevosErrores.contrasena = "Contraseña débil.";
    if (contrasena !== confirmarContrasena)
      nuevosErrores.confirmarContrasena = "No coinciden.";

    const edad =
      new Date().getFullYear() - new Date(fechaNacimiento).getFullYear();
    if (!fechaNacimiento || edad < 18)
      nuevosErrores.fechaNacimiento = "Debe ser mayor de edad.";

    if (
      !foto ||
      !["image/jpeg", "image/png"].includes(foto.type) ||
      foto.size > 2 * 1024 * 1024
    ) {
      nuevosErrores.foto = "Archivo inválido.";
    }

    setErrores(nuevosErrores);
    setFormValido(Object.keys(nuevosErrores).length === 0);
  };

  const handleGuardar = () => {
    if (formValido) {
      const datos = {
        nombre,
        apellido,
        correo,
        telefono,
        cedula,
        contrasena,
        fechaNacimiento,
        foto,
      };
      onGuardar(datos);
      limpiarFormulario();
    }
  };

  const handleArchivo = (e) => setFoto(e.target.files[0]);

  const limpiarFormulario = () => {
    setNombre("");
    setApellido("");
    setCorreo("");
    setTelefono("");
    setCedula("");
    setContrasena("");
    setConfirmarContrasena("");
    setFechaNacimiento("");
    setFoto(null);
    setErrores({});
    setFormValido(false);
  };

  useEffect(() => {
    if (show) validarCampos();
  }, [
    nombre,
    apellido,
    correo,
    telefono,
    cedula,
    contrasena,
    confirmarContrasena,
    fechaNacimiento,
    foto,
  ]);

  const formatearTelefono = (valor) => {
    // Elimina todo lo que no sea dígito
    const limpio = valor.replace(/\D/g, "");

    if (limpio.length <= 4) {
      return limpio;
    } else if (limpio.length <= 8) {
      return `${limpio.slice(0, 4)}-${limpio.slice(4)}`;
    } else {
      return `${limpio.slice(0, 4)}-${limpio.slice(4, 8)}`;
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Empleado</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errores.nombre && <Alert variant="danger">{errores.nombre}</Alert>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
            {errores.apellido && (
              <Alert variant="danger">{errores.apellido}</Alert>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Correo</Form.Label>
            <Form.Control
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            {errores.correo && <Alert variant="danger">{errores.correo}</Alert>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              value={telefono}
              onChange={(e) => setTelefono(formatearTelefono(e.target.value))}
            />

            {errores.telefono && (
              <Alert variant="danger">{errores.telefono}</Alert>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Cédula</Form.Label>
            <Form.Control
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
            {errores.cedula && <Alert variant="danger">{errores.cedula}</Alert>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            {errores.contrasena && (
              <Alert variant="danger">{errores.contrasena}</Alert>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
            />
            {errores.confirmarContrasena && (
              <Alert variant="danger">{errores.confirmarContrasena}</Alert>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Fecha de Nacimiento</Form.Label>
            <Form.Control
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
            />
            {errores.fechaNacimiento && (
              <Alert variant="danger">{errores.fechaNacimiento}</Alert>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Foto</Form.Label>
            <Form.Control
              type="file"
              accept=".jpg,.png"
              onChange={handleArchivo}
            />
            {errores.foto && <Alert variant="danger">{errores.foto}</Alert>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button
          variant="primary"
          onClick={handleGuardar}
          disabled={!formValido}
        >
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroEmpleado;
