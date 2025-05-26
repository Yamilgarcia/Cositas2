// Importaciones
import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { db } from "../database/firebaseconfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import TablaProductos from "../components/productos/TablaProductos";
import ModalRegistroProducto from "../components/productos/ModalRegistroProducto";
import ModalEdicionProducto from "../components/productos/ModalEdicionProducto";
import ModalEliminacionProducto from "../components/productos/ModalEliminacionProducto";
import CuadroBusqueda from "../components/busqueda/cuadrobusqueda";
import Paginacion from "../components/ordenamiento/Paginacion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ← IMPORTACIÓN CORRECTA
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Componente principal
const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]); // ✅ Se agregó este estado
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    imagen: ""
  });
  const [productoEditado, setProductoEditado] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  const productosCollection = collection(db, "productos");
  const categoriasCollection = collection(db, "categorias");

  const isOffline = !navigator.onLine;

  useEffect(() => {
    const unsubscribeProductos = onSnapshot(productosCollection, (snapshot) => {
      const fetchedProductos = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProductos(fetchedProductos);
      setProductosFiltrados(fetchedProductos);
      if (isOffline) {
        console.log("Offline: Productos cargados desde caché local.");
      }
    }, (error) => {
      console.error("Error al escuchar productos:", error);
    });

    const unsubscribeCategorias = onSnapshot(categoriasCollection, (snapshot) => {
      const fetchedCategorias = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCategorias(fetchedCategorias);
    }, (error) => {
      console.error("Error al escuchar categorías:", error);
    });

    return () => {
      unsubscribeProductos();
      unsubscribeCategorias();
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setProductoEditado((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoProducto((prev) => ({ ...prev, imagen: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductoEditado((prev) => ({ ...prev, imagen: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProducto = async () => {
    if (!nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.categoria || !nuevoProducto.imagen) {
      alert("Por favor, completa todos los campos, incluyendo la imagen.");
      return;
    }

    setShowModal(false);

    const tempId = `temp_${Date.now()}`;
    const productoConId = {
      ...nuevoProducto,
      id: tempId,
      precio: parseFloat(nuevoProducto.precio),
    };

    try {
      setProductos((prev) => [...prev, productoConId]);
      setProductosFiltrados((prev) => [...prev, productoConId]);

      if (isOffline) {
        alert("Sin conexión: Producto agregado localmente. Se sincronizará al reconectar.");
      }

      await addDoc(productosCollection, productoConId);
      setNuevoProducto({ nombre: "", precio: "", categoria: "", imagen: "" });
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      setProductos((prev) => prev.filter((prod) => prod.id !== tempId));
      setProductosFiltrados((prev) => prev.filter((prod) => prod.id !== tempId));
      alert("Error al agregar el producto: " + error.message);
    }
  };

  const handleEditProducto = async () => {
    if (!productoEditado.nombre || !productoEditado.precio || !productoEditado.categoria || !productoEditado.imagen) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    setShowEditModal(false);
    const productoRef = doc(db, "productos", productoEditado.id);

    try {
      const actualizado = {
        ...productoEditado,
        precio: parseFloat(productoEditado.precio),
      };

      setProductos((prev) => prev.map((prod) => (prod.id === actualizado.id ? actualizado : prod)));
      setProductosFiltrados((prev) => prev.map((prod) => (prod.id === actualizado.id ? actualizado : prod)));

      await updateDoc(productoRef, actualizado);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Error al actualizar el producto: " + error.message);
    }
  };

  const handleDeleteProducto = async () => {
    if (!productoAEliminar) return;

    setShowDeleteModal(false);

    try {
      setProductos((prev) => prev.filter((prod) => prod.id !== productoAEliminar.id));
      setProductosFiltrados((prev) => prev.filter((prod) => prod.id !== productoAEliminar.id));

      const productoRef = doc(db, "productos", productoAEliminar.id);
      await deleteDoc(productoRef);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Error al eliminar el producto: " + error.message);
    }
  };

  const openEditModal = (producto) => {
    setProductoEditado({ ...producto });
    setShowEditModal(true);
  };

  const openDeleteModal = (producto) => {
    setProductoAEliminar(producto);
    setShowDeleteModal(true);
  };

  const handleSearchChange = (e) => {
    const texto = e.target.value.toLowerCase();
    setSearchText(texto);
    const filtrados = productos.filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(texto) ||
        producto.categoria.toLowerCase().includes(texto)
    );
    setProductosFiltrados(filtrados);
    setCurrentPage(1);
  };

  const paginatedProductos = productosFiltrados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );




  const generarPDFProductos = () => {
    const doc = new jsPDF();

    // Encabezado con fondo
    doc.setFillColor(40, 53, 88); // Azul oscuro
    doc.rect(0, 0, 210, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("Reporte de Productos", 105, 20, { align: "center" });

    // Encabezados de tabla
    const encabezados = [["Nombre", "Precio", "Categoría"]];

    // Filas de la tabla
    const filas = paginatedProductos.map((prod) => [

      prod.nombre,
      `C$${parseFloat(prod.precio).toFixed(2)}`,

      prod.categoria,
    ]);

   autoTable(doc, {

      head: encabezados,
      body: filas,
      startY: 40,
      theme: "grid",
      headStyles: { fillColor: [40, 53, 88], textColor: 255 },
      styles: { fontSize: 12 },
    });

    // Pie de página con fecha
    const fecha = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(`Fecha: ${fecha}`, 15, 285);

    // Guardar
    doc.save(`Productos_${fecha.replace(/\//g, "-")}.pdf`);
  };





  const generarPDFProductosConImagen = () => {
  const doc = new jsPDF();
  let y = 20;

  doc.setFontSize(18);
  doc.setTextColor(40, 53, 88);
  doc.text("Reporte Detallado de Productos", 105, y, { align: "center" });
  y += 10;

  paginatedProductos.forEach((prod, index) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    // Imagen
    if (prod.imagen) {
      try {
        doc.addImage(prod.imagen, "JPEG", 15, y, 30, 30); // x, y, width, height
      } catch (e) {
        console.warn("Error al agregar imagen del producto:", prod.nombre);
      }
    }

    // Texto
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Nombre: ${prod.nombre}`, 50, y + 5);
    doc.text(`Precio: C$${parseFloat(prod.precio).toFixed(2)}`, 50, y + 15);
    doc.text(`Categoría: ${prod.categoria}`, 50, y + 25);

    y += 40; // espacio entre productos
  });

  const fecha = new Date().toLocaleDateString();
  doc.save(`Detalle_Productos_${fecha.replace(/\//g, "-")}.pdf`);
};


  const exportarExcelProductos = () => {
  const fecha = new Date().toLocaleDateString().replace(/\//g, "-");
  const nombreArchivo = `Productos_${fecha}.xlsx`;

  // Usamos precio como número real
  const datos = productos.map((prod) => ({
    Nombre: prod.nombre,
    Precio: parseFloat(prod.precio), // sin símbolo
    Categoría: prod.categoria,
  }));

  const hoja = XLSX.utils.json_to_sheet(datos);
  const libro = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(libro, hoja, "Productos");

  // Ajustar ancho de columnas automáticamente (opcional)
  const wscols = [{ wch: 20 }, { wch: 10 }, { wch: 25 }];
  hoja["!cols"] = wscols;

  const excelBuffer = XLSX.write(libro, {
    bookType: "xlsx",
    type: "array",
  });

  const archivo = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(archivo, nombreArchivo);
};



  return (
    <Container className="mt-5">
      <h4>Gestión de Productos</h4>
      <Button className="mb-3" onClick={() => setShowModal(true)}>
        Agregar producto
      </Button>

      <Button className="mb-3 ms-2 btn-success" onClick={generarPDFProductos}>
        Generar PDF
      </Button>


<Button className="mb-3 ms-2 btn-warning" onClick={generarPDFProductosConImagen}>
  PDF con Imagen
</Button>

      <Button className="mb-3 ms-2 btn-primary" onClick={exportarExcelProductos}>
        Generar Excel
      </Button>

      <CuadroBusqueda searchText={searchText} handleSearchChange={handleSearchChange} />

      <TablaProductos
        productos={paginatedProductos}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
        totalItems={productosFiltrados.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={productosFiltrados.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <ModalRegistroProducto
        showModal={showModal}
        setShowModal={setShowModal}
        nuevoProducto={nuevoProducto}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleAddProducto={handleAddProducto}
        categorias={categorias}
      />

      <ModalEdicionProducto
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        productoEditado={productoEditado}
        handleEditInputChange={handleEditInputChange}
        handleEditImageChange={handleEditImageChange}
        handleEditProducto={handleEditProducto}
        categorias={categorias}
      />

      <ModalEliminacionProducto
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleDeleteProducto={handleDeleteProducto}
      />
    </Container>
  );
};

export default Productos;
