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
            <img src="./public/sources/primaria.jpg" alt="Matrícula Primaria" class="object-cover w-full h-full">
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
            <img src="./public/sources/secundaria.jpg" alt="Matrícula Preparatoria" class="object-cover w-full h-full">
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
            <img src="./public/sources/bachiller.jpg" alt="Matrícula Bachillerato" class="object-cover w-full h-full">
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

}
