const translations = {
  en: {
    setupAcceptedText: "PWA setup accepted",
    setupRejectedText: "PWA setup rejected",
    installBtnText: "Install",
    title: "My todo list",
    placeholder: "Enter your todo",
    sm1:
      "Mobile - Tap the screen to complete and long pres to delete the Todo.",
    sm2:
      "PC - Left click to toggle complete and Right click to delete the Todo."
  },
  es: {
    setupAcceptedText: "Configuración de PWA aceptada",
    setupRejectedText: "Configuración de PWA rechazada",
    installBtnText: "Instalar",
    title: "Mi lista de tareas",
    placeholder: "Ingresa tu tarea",
    sm1:
      "Mobil - Toca la pantalla para completar y toque largo para borrar la tarea.",
    sm2:
      "PC - Click izquierdo para completar y click derecho para borrar la tarea."
  }
};

export function getTranslation(key) {
  const lang = navigator.language.substring(0, 2);
  console.log(lang);
  return translations[lang][key];
}
