import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ModalRegistroCategoria = ({
  showModal,
  setShowModal,
  nuevaCategoria,
  handleInputChange,
  handleAddCategoria,
}) => {
  const { t } = useTranslation();

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{t("categorias.agregar")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>{t("productos.nombre")}</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={nuevaCategoria.nombre}
              onChange={handleInputChange}
              placeholder={t("productos.nombre")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t("categorias.descripcion")}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={nuevaCategoria.descripcion}
              onChange={handleInputChange}
              placeholder={t("categorias.descripcion")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          {t("productos.cancelar")}
        </Button>
        <Button variant="primary" onClick={handleAddCategoria}>
          {t("productos.guardar") || "Guardar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCategoria;