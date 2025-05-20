import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  updateDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../../database/firebaseconfig";
import { Button, Form, ListGroup, Spinner, Modal } from "react-bootstrap";

const ChatIA = ({ showChatModal, setShowChatModal }) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);
  const [cargando, setCargando] = useState(false);

  const chatCollection = collection(db, "chat");
  const categoriasCollection = collection(db, "categorias");

  useEffect(() => {
    const q = query(chatCollection, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mensajesObtenidos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMensajes(mensajesObtenidos);
    });
    return () => unsubscribe();
  }, []);

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return;
    const nuevoMensaje = {
      texto: mensaje,
      emisor: "usuario",
      timestamp: new Date(),
    };

    setCargando(true);
    setMensaje("");

    try {
      await addDoc(chatCollection, nuevoMensaje);

      const lowerMensaje = mensaje.toLowerCase();

      // 1. Mostrar cantidad total
      if (lowerMensaje.includes("cuántas") || lowerMensaje.includes("total")) {
        const snap = await getDocs(categoriasCollection);
        await addDoc(chatCollection, {
          texto: `Actualmente tienes ${snap.size} categorías registradas.`,
          emisor: "IA",
          timestamp: new Date(),
        });
      }
      // 2. Buscar todas las categorías
      else if (
        lowerMensaje.includes("categorías hay") ||
        lowerMensaje.includes("listar")
      ) {
        const snap = await getDocs(categoriasCollection);
        const lista = snap.docs.map((d) => `• ${d.data().nombre}`).join("\n");
        await addDoc(chatCollection, {
          texto: `Estas son tus categorías:\n${lista}`,
          emisor: "IA",
          timestamp: new Date(),
        });
      }
      // 3. Eliminar
      else if (
        lowerMensaje.includes("elimina") ||
        lowerMensaje.includes("borrar")
      ) {
        const coincidencias = mensaje.match(/"([^"]+)"/);
        if (coincidencias) {
          const nombreABorrar = coincidencias[1].toLowerCase();
          const snap = await getDocs(categoriasCollection);
          const docBorrar = snap.docs.find(
            (d) => d.data().nombre.toLowerCase() === nombreABorrar
          );
          if (docBorrar) {
            await deleteDoc(doc(db, "categorias", docBorrar.id));
            await addDoc(chatCollection, {
              texto: `Categoría "${nombreABorrar}" eliminada correctamente.`,
              emisor: "IA",
              timestamp: new Date(),
            });
          } else {
            await addDoc(chatCollection, {
              texto: `No se encontró la categoría "${nombreABorrar}".`,
              emisor: "IA",
              timestamp: new Date(),
            });
          }
        } else {
          await addDoc(chatCollection, {
            texto: 'Por favor, especifica el nombre entre comillas ("...").',
            emisor: "IA",
            timestamp: new Date(),
          });
        }
      }
      // 4. Editar descripción
      else if (
        lowerMensaje.includes("editar") &&
        lowerMensaje.includes("descripción")
      ) {
        const coincidencias = mensaje.match(/"([^"]+)"/g);
        if (coincidencias?.length >= 2) {
          const nombreCat = coincidencias[0].replace(/"/g, "");
          const nuevaDesc = coincidencias[1].replace(/"/g, "");
          const snap = await getDocs(categoriasCollection);
          const docEditar = snap.docs.find(
            (d) => d.data().nombre.toLowerCase() === nombreCat.toLowerCase()
          );
          if (docEditar) {
            await updateDoc(doc(db, "categorias", docEditar.id), {
              descripcion: nuevaDesc,
            });
            await addDoc(chatCollection, {
              texto: `Descripción de "${nombreCat}" actualizada con éxito.`,
              emisor: "IA",
              timestamp: new Date(),
            });
          } else {
            await addDoc(chatCollection, {
              texto: `No se encontró la categoría "${nombreCat}".`,
              emisor: "IA",
              timestamp: new Date(),
            });
          }
        } else {
          await addDoc(chatCollection, {
            texto:
              'Formato incorrecto. Usa: editar "nombre" con descripción "nueva descripción".',
            emisor: "IA",
            timestamp: new Date(),
          });
        }
      }
      // 5. Registro nuevo (por IA generativa)
      // 5. Registro nuevo (por IA generativa)
      else if (
        lowerMensaje.includes("crear") ||
        lowerMensaje.includes("añade") ||
        lowerMensaje.includes("agrega") ||
        lowerMensaje.includes("nueva categoría")
      ) {
        const respuestaIA = await obtenerRespuestaIA(mensaje);
        await addDoc(chatCollection, {
          texto: `Ok, vamos a registrar ${respuestaIA} en la base de datos.`,
          emisor: "IA",
          timestamp: new Date(),
        });

        try {
          const datos = JSON.parse(respuestaIA);
          if (datos.nombre && datos.descripcion) {
            await addDoc(categoriasCollection, {
              nombre: datos.nombre,
              descripcion: datos.descripcion,
              timestamp: new Date(),
            });
            await addDoc(chatCollection, {
              texto: `Categoría ${datos.nombre} registrada con éxito.`,
              emisor: "IA",
              timestamp: new Date(),
            });
          } else {
            await addDoc(chatCollection, {
              texto:
                "No se pudo registrar. El JSON no contenía los datos esperados.",
              emisor: "IA",
              timestamp: new Date(),
            });
          }
        } catch {
          await addDoc(chatCollection, {
            texto: "La IA no devolvió un JSON válido.",
            emisor: "IA",
            timestamp: new Date(),
          });
        }
      }

      // 6. Mensajes generales
      else {
        await addDoc(chatCollection, {
          texto:
            'Hola, soy tu asistente de categorías. Puedes decirme cosas como:\n• Añade una categoría\n• ¿Cuántas categorías hay?\n• Elimina "nombre"\n• Edita "nombre" con descripción "..."',
          emisor: "IA",
          timestamp: new Date(),
        });
      }
    } catch {
      await addDoc(chatCollection, {
        texto: "Ocurrió un error inesperado. Intenta de nuevo.",
        emisor: "IA",
        timestamp: new Date(),
      });
    } finally {
      setCargando(false);
    }
  };

  const obtenerRespuestaIA = async (promptUsuario) => {
    const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
    const prompt = `Extrae el nombre y la descripción de categoría en este mensaje: "${promptUsuario}". Si no hay descripción, genera una corta. Devuélvelo como {"nombre":"...","descripcion":"..."}`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { response_mime_type: "application/json" },
          }),
        }
      );

      if (response.status === 429)
        return "Demasiadas solicitudes. Intenta luego.";

      const data = await response.json();
      return (
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No hubo respuesta de la IA."
      );
    } catch (error) {
      console.error("Error al obtener respuesta de la IA:", error);
      return "No se pudo conectar con la IA.";
    }
  };

  return (
    <Modal
      show={showChatModal}
      onHide={() => setShowChatModal(false)}
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Chat con IA</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup style={{ maxHeight: "300px", overflowY: "auto" }}>
          {mensajes.map((msg) => (
            <ListGroup.Item
              key={msg.id}
              className={`d-flex flex-column ${
                msg.emisor === "IA"
                  ? "align-self-start bg-light text-dark"
                  : "align-self-end bg-primary text-white"
              }`}
              style={{
                borderRadius: "10px",
                marginBottom: "10px",
                maxWidth: "80%",
                padding: "10px",
                whiteSpace: "pre-wrap",
              }}
            >
              <strong>{msg.emisor === "IA" ? "🤖 IA" : "👤 Tú"}:</strong>
              <span>
                {typeof msg.texto === "string"
                  ? msg.texto
                  : JSON.stringify(msg.texto)}
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Form.Control
          className="mt-3"
          type="text"
          placeholder="Escribe tu mensaje..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowChatModal(false)}>
          Cerrar
        </Button>
        <Button onClick={enviarMensaje} disabled={cargando}>
          {cargando ? <Spinner size="sm" animation="border" /> : "Enviar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatIA;
