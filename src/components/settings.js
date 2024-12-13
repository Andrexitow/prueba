// import '../styles/settings.css';
import { Toast } from 'bootstrap'; // Importa específicamente Toast
import { navigate } from '../navegacion';
import { mensajito, getUserInfo,infoUserById } from "../navegacion";

export async function renderSettings(container) {
  container.innerHTML = `
    <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div class="card shadow-lg p-4" style="max-width: 500px; width: 100%; border-radius: 10px;">
        <div class="text-center mb-4">
          <h3 class="mb-3 text-[#037470]">Configuración</h3> <!-- Título con color principal -->
        </div>

        <!-- Información del Usuario -->
        <div class="mb-3">
          <label class="form-label text-[#037470]">Nombre</label>
          <p id="settingsName" class="form-control-plaintext">Cargando...</p> <!-- Nombre del usuario (por defecto "Cargando...") -->
        </div>

        <div class="mb-3">
          <label class="form-label text-[#037470]">Correo Electrónico</label>
          <p id="settingsEmail" class="form-control-plaintext">Cargando...</p> <!-- Correo del usuario (por defecto "Cargando...") -->
        </div>

        <!-- Botón Referir -->
        <div class="d-grid gap-2 mt-4">
          <button id="referButton" class="btn" style="background-color: #037470; color: white;">Referir</button>
        </div>

        <!-- Botón para editar configuración -->
        <div class="d-grid gap-2 mt-3">
          <button id="editButton" class="btn" style="background-color: #ff8c00; color: white;">Editar Configuración</button>
        </div>

        <!-- Mensajes de éxito y error -->
        <div id="successMessage" class="alert alert-success text-center" style="display: none;"></div>
        <div id="errorMessage" class="alert alert-danger text-center" style="display: none;"></div>
      </div>
    </div>

    <!-- Toast Message -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div id="toastMessage" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img src="https://via.placeholder.com/20" class="rounded me-2" alt="...">
          <strong class="me-auto">Notificación</strong>
          <small>Ahora</small>
          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body" id="toastBody">
          Cargando mensaje...
        </div>
      </div>
    </div>
  `;

  // Obtener información del usuario
  const userInfo = await getUserInfo(); // Supongo que esta función obtiene los datos del usuario desde la base de datos o API
  const mensaje = await mensajito(userInfo.userId); // Llamada para obtener mensaje adicional del usuario
  const infoUser = await infoUserById(userInfo.userId)
  // Mostrar los datos del usuario en la vista
  const settingsName = document.getElementById('settingsName');
  const settingsEmail = document.getElementById('settingsEmail');



  console.log(infoUser);
  

  settingsName.textContent = infoUser.nombre || "Nombre no disponible"; // Mostrar el nombre o un mensaje si no está disponible
  settingsEmail.textContent = infoUser.correo || "Correo no disponible"; // Mostrar el correo o un mensaje si no está disponible

  // Mostrar el mensaje de notificación con el contenido recibido
  const toastElement = document.getElementById('toastMessage');
  const toastBody = document.getElementById('toastBody');
  toastBody.textContent = mensaje;

  const toast = new Toast(toastElement);
  toast.show();

  // Lógica para los botones
  const referButton = document.getElementById('referButton');
  referButton.addEventListener('click', () => {
    // Lógica para el botón "Referir"
    alert("Funcionalidad de referir no implementada aún.");
  });

  const editButton = document.getElementById('editButton');
  editButton.addEventListener('click', () => {
    // Lógica para el botón de edición (navegar a una vista de edición)
    navigate('editSettings');
  });
}
