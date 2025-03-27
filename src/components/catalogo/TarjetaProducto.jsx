import { Card, Col, Button } from "react-bootstrap";

const TarjetaProducto = ({ producto, openEditModal }) => {
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
            Precio: C${producto.precio} <br />
            Categoría: {producto.categoria}
          </Card.Text>
          
          {/* Botón Editar */}
          <Button
            variant="outline-primary"
            className="mt-auto"
            onClick={() => openEditModal(producto)}
          >
            Editar
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TarjetaProducto;
