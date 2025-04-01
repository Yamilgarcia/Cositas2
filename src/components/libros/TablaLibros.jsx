import React, { useState } from "react";
import { Table, Button, Image } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import VisorPDFModal from "../Visores/VisorPDFModal";
import VisorWordModal from "../Visores/VisorWordModal";
import VisorImagenModal from "../Visores/VisorImagenModal";

const TablaLibros = ({ libros, openEditModal, openDeleteModal }) => {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [modalType, setModalType] = useState(null);

  const handlePreview = (base64) => {
    if (base64.startsWith("data:image")) {
      setModalType("image");
    } else if (base64.startsWith("data:application/pdf")) {
      setModalType("pdf");
    } else if (
      base64.startsWith(
        "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) ||
      base64.startsWith("data:application/msword")
    ) {
      setModalType("word");
    } else {
      setModalType(null);
    }
    setSelectedDoc(base64);
  };

  const closeModal = () => {
    setSelectedDoc(null);
    setModalType(null);
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Autor</th>
            <th>Género</th>
            <th>Documento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id}>
              <td>{libro.nombre}</td>
              <td>{libro.autor}</td>
              <td>{libro.genero}</td>
              <td>
                {libro.pdfBase64 ? (
                  libro.pdfBase64.startsWith("data:image") ? (
                    <>
                      <Image
                        src={libro.pdfBase64}
                        thumbnail
                        style={{ width: "60px", cursor: "pointer" }}
                        onClick={() => handlePreview(libro.pdfBase64)}
                      />
                    </>
                  ) : (
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => handlePreview(libro.pdfBase64)}
                    >
                      Ver Documento
                    </Button>
                  )
                ) : (
                  "Sin archivo"
                )}
              </td>
              <td>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => openEditModal(libro)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => openDeleteModal(libro)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Visores de documentos */}
      {modalType === "pdf" && selectedDoc && (
        <VisorPDFModal base64Doc={selectedDoc} onClose={closeModal} />
      )}
      {modalType === "word" && selectedDoc && (
        <VisorWordModal base64Doc={selectedDoc} onClose={closeModal} />
      )}
      {modalType === "image" && selectedDoc && (
        <VisorImagenModal base64Doc={selectedDoc} onClose={closeModal} />
      )}
    </>
  );
};

export default TablaLibros;
