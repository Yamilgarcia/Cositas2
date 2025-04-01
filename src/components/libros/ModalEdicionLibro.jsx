import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionLibro = ({
  showEditModal,
  setShowEditModal,
  libroEditado,
  handleEditInputChange,
  handleArchivoEditChange,
  handleEditLibro,
}) => {
  if (!libroEditado) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Libro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={libroEditado.nombre}
              onChange={handleEditInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Autor</Form.Label>
            <Form.Control
              type="text"
              name="autor"
              value={libroEditado.autor}
              onChange={handleEditInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Género</Form.Label>
            <Form.Control
              type="text"
              name="genero"
              value={libroEditado.genero}
              onChange={handleEditInputChange}
              placeholder="Ej: Ficción, No Ficción, Fantasía"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Archivo actual</Form.Label>
            
            <Form.Control
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.bmp"
              onChange={handleArchivoEditChange}
            />
            <Form.Text className="text-muted">
              Si seleccionás un nuevo archivo, se reemplazará el anterior.
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditLibro}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionLibro;
