import React from "react";
import { Table, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import "bootstrap-icons/font/bootstrap-icons.css";

const TablaLibros = ({ libros, openEditModal, openDeleteModal, openQRModal, handleCopy }) => {
  const { t } = useTranslation();

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>{t("libros.titulo")}</th>
          <th>{t("libros.autor")}</th>
          <th>{t("libros.genero")}</th>
          <th>{t("libros.pdf")}</th>
          <th>{t("productos.acciones")}</th>
        </tr>
      </thead>
      <tbody>
        {libros.map((libro) => (
          <tr key={libro.id}>
            <td>{libro.nombre}</td>
            <td>{libro.autor}</td>
            <td>{libro.genero}</td>
            <td>
              {libro.pdfUrl && (
                <>
                  <a href={libro.pdfUrl} target="_blank" rel="noopener noreferrer">{t("libros.pdf")}</a>
                  <Button
                    variant="outline-info"
                    size="sm"
                    className="ms-2"
                    onClick={() => openQRModal(libro.pdfUrl)}
                  >
                    <i className="bi bi-qr-code"></i>
                  </Button>
                </>
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
                className="me-2"
                onClick={() => openDeleteModal(libro)}
              >
                <i className="bi bi-trash"></i>
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => handleCopy(libro)}
              >
                <i className="bi bi-clipboard"></i>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaLibros;
