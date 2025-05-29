import React from "react";
import { Modal, Form, Button, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const ModalEdicionProducto = ({
  showEditModal,
  setShowEditModal,
  productoEditado,
  handleEditInputChange,
  handleEditImageChange,
  handleEditProducto,
  categorias
}) => {
  const { t } = useTranslation();

  if (!productoEditado) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{t("productos.editar")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>{t("productos.nombre")}</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={productoEditado.nombre}
              onChange={handleEditInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t("productos.precio")}</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={productoEditado.precio}
              onChange={handleEditInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t("productos.categoria")}</Form.Label>
            <Form.Select
              name="categoria"
              value={productoEditado.categoria}
              onChange={handleEditInputChange}
            >
              <option value="">{t("productos.seleccionarCategoria")}</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nombre}>
                  {t(`categorias.traducidas.${cat.nombre}`, cat.nombre)}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>{t("productos.actual")}</Form.Label>
            {productoEditado.imagen && (
              <Image
                src={productoEditado.imagen}
                width="100"
                className="mb-2"
              />
            )}
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowEditModal(false)}
        >
          {t("productos.cancelar")}
        </Button>
        <Button variant="primary" onClick={handleEditProducto}>
          {t("productos.actualizar")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProducto;
