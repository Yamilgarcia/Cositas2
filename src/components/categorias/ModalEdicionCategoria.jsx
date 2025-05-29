import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ModalEdicionCategoria = ({
  showEditModal,
  setShowEditModal,
  categoriaEditada,
  handleEditInputChange,
  handleEditCategoria,
}) => {
  const { t } = useTranslation();

  if (!categoriaEditada) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{t("productos.editar")} {t("menu.categorias")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>{t("productos.nombre")}</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={categoriaEditada.nombre}
              onChange={handleEditInputChange}
              placeholder={t("productos.nombre")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t("categorias.descripcion")}</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={categoriaEditada.descripcion}
              onChange={handleEditInputChange}
              placeholder={t("categorias.descripcion")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          {t("productos.cancelar") || "Cancelar"}
        </Button>
        <Button variant="primary" onClick={handleEditCategoria}>
          {t("productos.actualizar") || "Actualizar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionCategoria;
