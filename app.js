const WHATSAPP_NUMBER = "56950159793";

const form = document.querySelector("#quoteForm");
const formNote = document.querySelector("#formNote");

function clean(value) {
  return value.trim().replace(/\s+/g, " ");
}

function buildMessage(data) {
  const lines = [
    "Hola Barraca de Fierro Huaquén, quiero solicitar un presupuesto.",
    "",
    `Nombre: ${data.nombre}`,
    `Teléfono: ${data.telefono}`,
    `Tipo de solicitud: ${data.tipo}`,
    `Medidas aproximadas: ${data.medidas || "No especificadas"}`,
    `Mensaje: ${data.mensaje}`,
  ];

  return lines.join("\n");
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {
    nombre: clean(formData.get("nombre") || ""),
    telefono: clean(formData.get("telefono") || ""),
    tipo: clean(formData.get("tipo") || ""),
    medidas: clean(formData.get("medidas") || ""),
    mensaje: clean(formData.get("mensaje") || ""),
  };

  if (!data.nombre || !data.telefono || !data.tipo || !data.mensaje) {
    formNote.textContent = "Completa los campos obligatorios para generar el mensaje.";
    return;
  }

  const message = encodeURIComponent(buildMessage(data));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  formNote.textContent = "Abriendo WhatsApp con el mensaje preparado...";
  window.open(url, "_blank", "noopener,noreferrer");
});
