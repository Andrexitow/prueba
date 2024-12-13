// import '../styles/settings.css';
import { Toast } from 'bootstrap'; // Importa específicamente Toast
import { navigate } from '../navegacion';
import { mensajito, getUserInfo, infoUserById } from "../navegacion";
import Chart from "chart.js/auto";

export async function renderSettings(container) {
  container.innerHTML = `
    <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div class="row card shadow-lg p-4" style="max-width: 900px; width: 100%; border-radius: 10px;">
        <!-- Sección del usuario -->
        <div class="col-12 text-center mb-4">
          <h3 class="mb-3 text-[#037470]">Configuración</h3>
        </div>

        <!-- Información del Usuario -->
        <div class="col-12" id="userInfoSection">
          <div class="mb-3">
            <label class="form-label text-[#037470]">Nombre</label>
            <p id="settingsName" class="form-control-plaintext">Cargando...</p>
          </div>

          <div class="mb-3">
            <label class="form-label text-[#037470]">Correo Electrónico</label>
            <p id="settingsEmail" class="form-control-plaintext">Cargando...</p>
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

        <!-- Modelo de Entrenamiento -->
        <div class="col-12 d-none mt-5" id="modelSection">
          <h3 class="text-center text-[#037470]">Modelo de Entrenamiento</h3>
          <canvas id="myChart" class="mt-4" width="400" height="200"></canvas>
          <div class="mt-4 text-center">
            <p><strong>Error Cuadrático Medio (MSE):</strong> <span id="mseValue">Cargando...</span></p>
            <p><strong>Coeficiente de Determinación (R²):</strong> <span id="r2Value">Cargando...</span></p>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Message -->
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div id="toastMessage" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <img src="./public/sources/descarga.png" class="rounded me-2" alt="..." style="width: 30px; height: 30px;">
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
  const userInfo = await getUserInfo();
  const mensaje = await mensajito(userInfo.userId);
  const infoUser = await infoUserById(userInfo.userId);

  // Mostrar los datos del usuario en la vista
  const settingsName = document.getElementById('settingsName');
  const settingsEmail = document.getElementById('settingsEmail');

  settingsName.textContent = infoUser.nombre || "Nombre no disponible";
  settingsEmail.textContent = infoUser.correo || "Correo no disponible";

  // Mostrar el mensaje de notificación con el contenido recibido
  const toastElement = document.getElementById('toastMessage');
  const toastBody = document.getElementById('toastBody');
  toastBody.textContent = mensaje;

  const toast = new Toast(toastElement);
  toast.show();

  const editButton = document.getElementById('editButton');
  editButton.addEventListener('click', () => {
    navigate('editSettings');
  });

  // Mostrar la sección del gráfico solo si el usuario es admin (rol 0)
  if (userInfo.rol === 0) {
    const modelSection = document.getElementById('modelSection');
    modelSection.classList.remove('d-none');

    // Configurar y renderizar el gráfico
    const ctx = document.getElementById('myChart').getContext('2d');
    const datosReales = [1.5, 2.8, 3.6, 4.2, 5.5, 6.0]; // Datos reales
    const predicciones = [1.0, 2.2, 3.4, 4.5, 5.6, 6.7]; // Predicciones

    const data = {
      labels: [1, 2, 3, 4, 5, 6], // Etiquetas del eje X
      datasets: [
        {
          label: 'Datos Reales',
          data: datosReales,
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
        },
        {
          label: 'Regresión Lineal',
          data: predicciones,
          borderColor: 'rgb(255, 99, 132)',
          fill: false,
        }
      ]
    };

    const config = {
      type: 'line',
      data: data,
    };

    new Chart(ctx, config);

    // Calcular métricas y mostrarlas
    function calcularMSE(real, prediccion) {
      let sumaError = 0;
      for (let i = 0; i < real.length; i++) {
        sumaError += Math.pow(real[i] - prediccion[i], 2);
      }
      return sumaError / real.length;
    }

    function calcularR2(real, prediccion) {
      const mediaReal = real.reduce((acc, val) => acc + val, 0) / real.length;
      let sumaTotal = 0;
      let sumaResiduo = 0;
      for (let i = 0; i < real.length; i++) {
        sumaTotal += Math.pow(real[i] - mediaReal, 2);
        sumaResiduo += Math.pow(real[i] - prediccion[i], 2);
      }
      return 1 - (sumaResiduo / sumaTotal);
    }

    const mse = calcularMSE(datosReales, predicciones);
    const r2 = calcularR2(datosReales, predicciones);

    document.getElementById('mseValue').textContent = mse.toFixed(2);
    document.getElementById('r2Value').textContent = r2.toFixed(2);
  }
}
