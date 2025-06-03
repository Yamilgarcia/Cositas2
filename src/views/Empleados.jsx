import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import ModalRegistroEmpleado from "../components/empleados/ModalRegistroEmpleado";
import TablaEmpleados from "../components/empleados/TablaEmpleados";
import { Zoom } from "react-awesome-reveal";

const Empleados = () => {
  const [showModal, setShowModal] = useState(false);
  const [empleados, setEmpleados] = useState([]);

  const handleGuardarEmpleado = (nuevoEmpleado) => {
    setEmpleados([...empleados, nuevoEmpleado]);
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Gestión de Empleados</h2>
      <div className="text-end mb-3">
        <Button onClick={() => setShowModal(true)}>Agregar Empleado</Button>
      </div>

      <Zoom cascade triggerOnce delay={10} duration={600}>
        <TablaEmpleados empleados={empleados} />
      </Zoom>

      <ModalRegistroEmpleado
        show={showModal}
        onHide={() => setShowModal(false)}
        onGuardar={handleGuardarEmpleado}
      />
    </Container>
  );
};

export default Empleados;
