export const convertirArchivoABase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!file) return reject("Archivo vacío");
  
      const tipo = file.type;
  
      // Si es imagen, la comprimimos
      if (tipo.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
  
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX_WIDTH = 800;
            const scale = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scale;
  
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  
            const base64Final = canvas.toDataURL("image/jpeg", 0.7);
            resolve(base64Final);
          };
  
          img.onerror = (err) => reject("Error al cargar imagen: " + err);
        };
  
        reader.onerror = (err) => reject("Error al leer imagen: " + err);
        reader.readAsDataURL(file);
      } else {
        // PDF, Word, etc. se convierten sin compresión
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (err) => reject("Error al leer archivo: " + err);
        reader.readAsDataURL(file);
      }
    });
  };
  