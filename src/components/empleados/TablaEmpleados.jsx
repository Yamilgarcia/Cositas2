import React from "react";
import { Table } from "react-bootstrap";

const TablaEmpleados = ({ empleados }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Cédula</th>
          <th>Fecha de Nacimiento</th>
        </tr>
      </thead>
      <tbody>
        {empleados.length > 0 ? (
          empleados.map((emp, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{emp.nombre}</td>
              <td>{emp.apellido}</td>
              <td>{emp.correo}</td>
              <td>{emp.telefono}</td>
              <td>{emp.cedula}</td>
              <td>{emp.fechaNacimiento}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">
              No hay empleados registrados.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default TablaEmpleados;
