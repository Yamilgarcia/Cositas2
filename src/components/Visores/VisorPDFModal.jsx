import React from "react";
import { Modal, Button } from "react-bootstrap";

const VisorPDFModal = ({ base64Doc, onClose }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = base64Doc;
    link.download = "documento.pdf";
    link.click();
  };

  return (
    <Modal show onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Vista previa de PDF</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe
          src={base64Doc}
          title="Vista PDF"
          style={{ width: "100%", height: "80vh", border: "none" }}
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

export default VisorPDFModal;
