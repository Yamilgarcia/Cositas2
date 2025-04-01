import React, { useEffect, useState, useCallback } from "react";
import { Modal, Button } from "react-bootstrap";
import mammoth from "mammoth";

const VisorWordModal = ({ base64Doc, onClose }) => {
  const [htmlContent, setHtmlContent] = useState("");

  const convertWordToHtml = useCallback(async () => {
    try {
      const base64ToArrayBuffer = (base64) => {
        const parts = base64.split(",");
        const byteString = window.atob(parts[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        return ab;
      };

      const arrayBuffer = base64ToArrayBuffer(base64Doc);
      const result = await mammoth.convertToHtml({ arrayBuffer });
      setHtmlContent(result.value);
    } catch (error) {
      console.error("Error al convertir Word:", error);
      setHtmlContent("<p>Error al mostrar el documento.</p>");
    }
  }, [base64Doc]);

  useEffect(() => {
    if (base64Doc) convertWordToHtml();
  }, [base64Doc, convertWordToHtml]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = base64Doc;
    link.download = "documento.docx";
    link.click();
  };

  return (
    <Modal show onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Vista previa de Word</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          style={{ padding: "1rem" }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
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

export default VisorWordModal;
