import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PalabraCard from "../components/pronunciacion/PalabraCard";
import { useTranslation } from "react-i18next";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const palabras = ["apple", "banana", "orange", "grape", "watermelon", "kiwi", "strawberry", "blueberry", "pineapple", "mango"];

const Pronunciacion = () => {
  const { t } = useTranslation();
  const [palabraActual, setPalabraActual] = useState("");
  const [resultado, setResultado] = useState(null);
  const [escuchando, setEscuchando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    generarNuevaPalabra();
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => console.log("Permiso de micrófono concedido"))
        .catch((err) => {
          console.error("Permiso denegado:", err);
          setError(t("pronunciacion.error"));
        });
    } else {
      setError(t("pronunciacion.error"));
    }
  }, []);

  const generarNuevaPalabra = () => {
    const aleatoria = palabras[Math.floor(Math.random() * palabras.length)];
    setPalabraActual(aleatoria);
    setResultado(null);
    setError("");
  };

  const iniciarReconocimiento = () => {
    if (!SpeechRecognition) {
      setError(t("pronunciacion.error"));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setEscuchando(true);
    setResultado(null);
    setError("");

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim().toLowerCase().replace(/[.,!?¿¡;:]+$/, '');
      const objetivo = palabraActual.trim().toLowerCase();
      setResultado({ correcto: transcript === objetivo, texto: transcript });
      setEscuchando(false);
    };

    recognition.onerror = (event) => {
      setError(t("pronunciacion.error") + ": " + event.error);
      setEscuchando(false);
    };

    recognition.onend = () => setEscuchando(false);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">{t("pronunciacion.titulo")}</h2>
      <PalabraCard
        palabra={palabraActual}
        escuchando={escuchando}
        resultado={resultado}
        error={error}
        onHablar={iniciarReconocimiento}
        onNueva={generarNuevaPalabra}
      />
    </Container>
  );
};

export default Pronunciacion;
