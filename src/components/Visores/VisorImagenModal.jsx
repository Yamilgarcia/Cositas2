import React from "react";
import { Modal, Button } from "react-bootstrap";

const VisorImagenModal = ({ base64Doc, onClose }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = base64Doc;
    link.download = "imagen.jpg";
    link.click();
  };

  return (
    <Modal show onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Vista previa de imagen</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center">
        <img
          src={base64Doc}
          alt="Vista previa"
          style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleDownload}>
          Descargar
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VisorImagenModal;
