import { Card, Col, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next"; // 🟡 Importar hook de traducción

const TarjetaProducto = ({ producto, openEditModal }) => {
  const { t } = useTranslation(); // 🟡 Inicializar traducción

  return (
    <Col lg={3} md={4} sm={12} className="mb-4">
      <Card className="h-100">
        {producto.imagen && (
          <Card.Img
            variant="top"
            src={producto.imagen}
            alt={producto.nombre}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "200px",
            }}
          />
        )}
        <Card.Body className="d-flex flex-column">
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>
            {t("productos.precio")}: C${producto.precio} <br />
            {t("productos.categoria")}: {producto.categoria}
          </Card.Text>

          {/* Botón Editar traducido */}
          <Button
            variant="outline-primary"
            className="mt-auto"
            onClick={() => openEditModal(producto)}
          >
            {t("productos.editar")}
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TarjetaProducto;
