import React from "react";
import { Modal, Button } from "react-bootstrap";
import QRCode from "react-qr-code";

const ModalQR = ({ show, handleClose, pdfUrl }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Código QR del PDF</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        {pdfUrl ? <QRCode value={pdfUrl} size={180} /> : <p>No hay URL</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalQR;
