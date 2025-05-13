import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebaseconfig";
import GraficoProductos from "../components/estadisticas/GraficoProductos";
import { Container } from "react-bootstrap";

const Estadisticas = () => {
  const [nombres, setNombres] = useState([]);
  const [precios, setPrecios] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productos = querySnapshot.docs.map((doc) => doc.data());

      const nombresExtraidos = productos.map((p) => p.nombre);
      const preciosExtraidos = productos.map((p) => parseFloat(p.precio));

      setNombres(nombresExtraidos);
      setPrecios(preciosExtraidos);
    };

    obtenerDatos();
  }, []);

  return (
    <Container className="mt-4">
      <GraficoProductos nombres={nombres} precios={precios} />
    </Container>
  );
};

export default Estadisticas;
