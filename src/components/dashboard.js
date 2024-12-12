export async function renderDashboard(container) {
  const token = localStorage.getItem('token');

  // Verificar si el token está presente
  if (!token) {
    window.location.href = "/login.html";  // Redirigir al login si no hay token
    return;
  }

  container.innerHTML = `

    <!-- Contenido del Dashboard -->
    <div class="pt-24 px-4">
        <div class="text-center">
            <h1 class="text-4xl font-semibold text-gray-800">Bienvenido al Dashboard</h1>
            <p class="mt-3 text-lg text-gray-600">Aquí puedes ver toda la información que tienes disponible como estudiante.</p>
            
            <!-- Botón para referir a otro estudiante -->
            <button id="referBtn" class="bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 mt-6">Referir a otro estudiante nuevo</button>

            <!-- Tabla de referidos -->
            <h3 class="mt-8 text-2xl font-semibold">Estudiantes Referidos</h3>
            <table class="min-w-full mt-4 table-auto">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="py-2 px-4 text-left">#</th>
                        <th class="py-2 px-4 text-left">Nombre</th>
                        <th class="py-2 px-4 text-left">Correo Electrónico</th>
                        <th class="py-2 px-4 text-left">Fecha de Registro</th>
                    </tr>
                </thead>
                <tbody id="referidosTableBody" class="text-gray-700">
                    <!-- Aquí se llenarán los datos de los referidos -->
                </tbody>
            </table>
        </div>
    </div>
  `;

  // Event listener para referir a otro estudiante
  document.getElementById('referBtn').addEventListener('click', () => {
    alert('Redirigiendo para referir a un nuevo estudiante.');
    // Aquí puedes agregar la lógica para referir a un estudiante o redirigir a una página
  });

  // Obtener los referidos desde la API
  try {
    const response = await fetch('https://api-skolmi.onrender.com/v1/referidos', {
      headers: { 'Authorization': `Bearer ${token}` }  // Autenticación con el token
    });

    if (response.ok) {
      const data = await response.json();  // Suponiendo que la respuesta tiene la lista de referidos
      const referidosTableBody = document.getElementById('referidosTableBody');
      referidosTableBody.innerHTML = '';  // Limpiar la tabla antes de llenarla

      // Recorrer la lista de referidos y agregar filas a la tabla
      data.referidos.forEach((referido, index) => {
        referidosTableBody.innerHTML += `
          <tr>
            <td class="py-2 px-4">${index + 1}</td>
            <td class="py-2 px-4">${referido.nombre}</td>
            <td class="py-2 px-4">${referido.email}</td>
            <td class="py-2 px-4">${new Date(referido.fecha_registro).toLocaleDateString()}</td>
          </tr>
        `;
      });
    } else {
      console.error('Error al obtener los referidos');
    }
  } catch (error) {
    console.error('Error en la solicitud de la API:', error);
  }
}
