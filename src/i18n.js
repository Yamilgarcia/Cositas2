// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: {
          menu: {
            inicio: "Inicio",
            categorias: "Categorías",
            productos: "Productos",
            catalogo: "Catálogo",
            libros: "Libros",
            clima: "Clima",
            pronunciacion: "Pronunciación",
            estadisticas: "Estadísticas",
            cerrar: "Cerrar Sesión",
            iniciar: "Iniciar Sesión",
            menu: "Menú"
          },
          productos: {
            titulo: "Gestión de Productos",
            agregar: "Agregar producto",
            pdf: "Generar PDF",
            pdfImagen: "PDF con Imagen",
            excel: "Generar Excel",
            buscar: "Buscar",
            imagen: "Imagen",
            nombre: "Nombre",
            precio: "Precio",
            categoria: "Categoría",
            acciones: "Acciones",
            editar: "Editar",
            actualizar: "Actualizar",
            cancelar: "Cancelar",
            seleccionarCategoria: "Seleccione una categoría",
            actual: "Imagen Actual",
             guardar: "Guardar" 
          },
          categorias: {
            titulo: "Gestión de Categorías",
            agregar: "Agregar categoría",
            descripcion: "Descripción",
            traducidas: {
              "Artículos Escolares": "Artículos Escolares",
              "categoría": "Categoría",
              "basa": "Base",
              "cosas": "Cosas",
              "manolito": "Manolito"
            }
          },
          catalogo: {
            titulo: "Catálogo de Productos",
            filtrar: "Filtrar por categoría:",
            editar: "Editar",
            todas: "Todas",
            sinProductos: "No hay productos en esta categoría."
          },
          alertas: {
            camposObligatorios: "Por favor, completa todos los campos requeridos."
          },
          libros: {
            titulo: "Gestión de Libros",
            agregar: "Agregar libro",
            autor: "Autor",
            genero: "Género",
            pdf: "PDF"
          },
          clima: {
            titulo: "Clima por Hora",
            ubicacion: "Seleccionar Ubicación",
            automatica: "Ubicación Automática",
            manual: "Ubicación Manual",
            cargar: "Cargar",
            error: "Por favor, ingresa o detecta una ubicación válida."
          },
          pronunciacion: {
            titulo: "Ejercicio de Pronunciación",
            instruccion: "Pronuncia esta palabra:",
            hablar: "Hablar",
            nueva: "Nueva Palabra",
            error: "No se pudo acceder al micrófono."
          },
          estadisticas: {
            titulo: "Estadísticas de Productos",
            precio: "Precio de productos"
          }
        }
      },
      en: {
        translation: {
          menu: {
            inicio: "Home",
            categorias: "Categories",
            productos: "Products",
            catalogo: "Catalog",
            libros: "Books",
            clima: "Weather",
            pronunciacion: "Pronunciation",
            estadisticas: "Statistics",
            cerrar: "Log out",
            iniciar: "Login",
            menu: "Menu"
          },
          productos: {
            titulo: "Product Management",
            agregar: "Add product",
            pdf: "Generate PDF",
            pdfImagen: "PDF with Image",
            excel: "Generate Excel",
            buscar: "Search",
            imagen: "Image",
            nombre: "Name",
            precio: "Price",
            categoria: "Category",
            acciones: "Actions",
            editar: "Edit",
            actualizar: "Update",
            cancelar: "Cancel",
            seleccionarCategoria: "Select a category",
            actual: "Current Image",
              guardar: "Save"  // ✅ AÑADIR ESTO
          },
          categorias: {
            titulo: "Category Management",
            agregar: "Add category",
            descripcion: "Description",
            traducidas: {
              "Artículos Escolares": "School Supplies",
              "categoría": "Category",
              "basa": "Base",
              "cosas": "Things",
              "manolito": "Little Manuel"
            }
          },
          catalogo: {
            titulo: "Product Catalog",
            filtrar: "Filter by category:",
            editar: "Edit",
            todas: "All",
            sinProductos: "No products in this category."
          },
          alertas: {
            camposObligatorios: "Please complete all required fields."
          },
          libros: {
            titulo: "Book Management",
            agregar: "Add book",
            autor: "Author",
            genero: "Genre",
            pdf: "PDF"
          },
          clima: {
            titulo: "Hourly Weather",
            ubicacion: "Select Location",
            automatica: "Automatic Location",
            manual: "Manual Location",
            cargar: "Load",
            error: "Please enter or detect a valid location."
          },
          pronunciacion: {
            titulo: "Pronunciation Exercise",
            instruccion: "Say this word:",
            hablar: "Speak",
            nueva: "New Word",
            error: "Microphone access failed."
          },
          estadisticas: {
            titulo: "Product Statistics",
            precio: "Product Price"
          }
        }
      }
    },
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;