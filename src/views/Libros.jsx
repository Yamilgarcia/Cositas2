import React, { useState, useEffect } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../database/firebaseconfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import TablaLibros from "../components/libros/TablaLibros";
import ModalRegistroLibro from "../components/libros/ModalRegistroLibro";
import ModalEdicionLibro from "../components/libros/ModalEdicionLibro";
import ModalEliminacionLibro from "../components/libros/ModalEliminacionLibro";
import { useAuth } from "../database/authcontext";
import { convertirArchivoABase64 } from "../utils/archivoToBase64"; 
const Libros = () => {
  const [libros, setLibros] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [nuevoLibro, setNuevoLibro] = useState({
    nombre: "",
    autor: "",
    genero: "",
    pdfBase64: "",
  });
  const [libroEditado, setLibroEditado] = useState(null);
  const [libroAEliminar, setLibroAEliminar] = useState(null);
  const [error, setError] = useState(null);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const librosCollection = collection(db, "libros");



  
  const fetchData = async () => {
    try {
      const librosData = await getDocs(librosCollection);
      const fetchedLibros = librosData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLibros(fetchedLibros);
    } catch (error) {
      console.error("Error al obtener datos:", error);
      setError("Error al cargar los datos. Intenta de nuevo.");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoLibro((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setLibroEditado((prev) => ({ ...prev, [name]: value }));
  };

  const handleArchivoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      const base64 = await convertirArchivoABase64(file);
      setNuevoLibro((prev) => ({ ...prev, pdfBase64: base64 }));
    } catch (err) {
      console.error(err);
      alert("Error al procesar el archivo.");
    }
  };

  const handleArchivoEditChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      const base64 = await convertirArchivoABase64(file);
      setLibroEditado((prev) => ({ ...prev, pdfBase64: base64 }));
    } catch (err) {
      console.error(err);
      alert("Error al procesar el archivo.");
    }
  };

  const handleAddLibro = async () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para agregar un libro.");
      navigate("/login");
      return;
    }

    const { nombre, autor, genero, pdfBase64 } = nuevoLibro;
    if (!nombre || !autor || !genero || !pdfBase64) {
      alert("Por favor, completa todos los campos y adjunta un documento.");
      return;
    }

    try {
      await addDoc(librosCollection, nuevoLibro);
      setShowModal(false);
      setNuevoLibro({ nombre: "", autor: "", genero: "", pdfBase64: "" });
      await fetchData();
    } catch (error) {
      console.error("Error al agregar libro:", error);
      setError("Error al agregar el libro. Intenta de nuevo.");
    }
  };

  const handleEditLibro = async () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para editar un libro.");
      navigate("/login");
      return;
    }

    const { nombre, autor, genero } = libroEditado;
    if (!nombre || !autor || !genero) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      const libroRef = doc(db, "libros", libroEditado.id);
      await updateDoc(libroRef, libroEditado);
      setShowEditModal(false);
      await fetchData();
    } catch (error) {
      console.error("Error al actualizar libro:", error);
      setError("Error al actualizar el libro. Intenta de nuevo.");
    }
  };

  const handleDeleteLibro = async () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para eliminar un libro.");
      navigate("/login");
      return;
    }

    if (libroAEliminar) {
      try {
        const libroRef = doc(db, "libros", libroAEliminar.id);
        await deleteDoc(libroRef);
        setShowDeleteModal(false);
        await fetchData();
      } catch (error) {
        console.error("Error al eliminar libro:", error);
        setError("Error al eliminar el libro. Intenta de nuevo.");
      }
    }
  };

  const openEditModal = (libro) => {
    setLibroEditado({ ...libro });
    setShowEditModal(true);
  };

  const openDeleteModal = (libro) => {
    setLibroAEliminar(libro);
    setShowDeleteModal(true);
  };

  return (
    <Container className="mt-5">
      <br />
      <h4>Gestión de Libros</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Agregar libro
      </Button>
      <TablaLibros
        libros={libros}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />
      <ModalRegistroLibro
        showModal={showModal}
        setShowModal={setShowModal}
        nuevoLibro={nuevoLibro}
        handleInputChange={handleInputChange}
        handleArchivoChange={handleArchivoChange}
        handleAddLibro={handleAddLibro}
      />
      <ModalEdicionLibro
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        libroEditado={libroEditado}
        handleEditInputChange={handleEditInputChange}
        handleArchivoEditChange={handleArchivoEditChange}
        handleEditLibro={handleEditLibro}
      />
      <ModalEliminacionLibro
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteLibro={handleDeleteLibro}
      />
    </Container>
  );
};

export default Libros;
