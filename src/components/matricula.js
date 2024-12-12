
import { navigate } from "../navegacion";

export function renderStudentEnrollment(container) {

  container.innerHTML = `

    <div class="container mt-2 px-6">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-[#037470]">Detalles de tu Cursos</h1>
        <p class="mt-3 text-lg text-gray-600">Aquí puedes ver la información de los Cursos.</p>
      </div>

      <!-- Contenedor de tarjetas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        <!-- Tarjeta 1: Primaria -->
        <div class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105">
          <div class="h-48 bg-gray-200">
            <img src="https://via.placeholder.com/300x200?text=Primaria" alt="Matrícula Primaria" class="object-cover w-full h-full">
          </div>
          <div class="p-6">
            <h5 class="text-xl font-semibold text-[#037470]">Primaria</h5>
            <p class="text-gray-600 mt-2">Matrícula confirmada para el ciclo escolar 2024.</p>
            <div class="mt-4 flex justify-between items-center">
              <span class="text-gray-500 text-xs">12 Diciembre, 2024</span>
              <button id="showMatricula" class="bg-[#037470] text-white py-2 px-4 rounded-lg hover:bg-[#026a5c] transition">Ver Matrícula</button>
            </div>
          </div>
        </div>

        <!-- Tarjeta 2: Preparatoria -->
        <div class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105">
          <div class="h-48 bg-gray-200">
            <img src="https://via.placeholder.com/300x200?text=Preparatoria" alt="Matrícula Preparatoria" class="object-cover w-full h-full">
          </div>
          <div class="p-6">
            <h5 class="text-xl font-semibold text-[#037470]">Preparatoria</h5>
            <p class="text-gray-600 mt-2">Matrícula confirmada para el ciclo escolar 2024.</p>
            <div class="mt-4 flex justify-between items-center">
              <span class="text-gray-500 text-xs">10 Diciembre, 2024</span>
              <button id="showMatricula" class="bg-[#037470] text-white py-2 px-4 rounded-lg hover:bg-[#026a5c] transition">Ver Matrícula</button>
            </div>
          </div>
        </div>

        <!-- Tarjeta 3: Bachillerato -->
        <div class="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105">
          <div class="h-48 bg-gray-200">
            <img src="https://via.placeholder.com/300x200?text=Bachillerato" alt="Matrícula Bachillerato" class="object-cover w-full h-full">
          </div>
          <div class="p-6">
            <h5 class="text-xl font-semibold text-[#037470]">Bachillerato</h5>
            <p class="text-gray-600 mt-2">Matrícula confirmada para el ciclo escolar 2024.</p>
            <div class="mt-4 flex justify-between items-center">
              <span class="text-gray-500 text-xs">09 Diciembre, 2024</span>
              <button id="showMatricula" class="bg-[#037470] text-white py-2 px-4 rounded-lg hover:bg-[#026a5c] transition">Ver Matrícula</button>
            </div>
          </div>
        </div>

      </div>

    </div>

  `;

  // Event listener para cerrar sesión desde el navbar
  // document.getElementById('logoutBtn').addEventListener('click', () => {
  //   localStorage.removeItem('token');
  //   window.location.href = "/login.html";  // Redirigir a la página de login
  // });

  // Aquí puedes agregar la lógica para traer los datos de la matrícula desde la API
  // Si tienes una API que proporciona la información de la matrícula, realiza la llamada aquí y llena las tarjetas con los datos reales
}
