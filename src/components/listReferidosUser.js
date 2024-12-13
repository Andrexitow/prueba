import { getUserInfo } from "../navegacion";

// Renderiza la vista de Referidos
export async function renderReferidosUser(container) {
  container.innerHTML = `
    <div class="container mt-5">
      <div class="row">
        <!-- Título de la vista -->
        <div class="col-12">
          <h3 class="mb-4">Listado de Referidos</h3>
        </div>
      </div>

      <div class="row">
        <!-- Sección izquierda: Tabla de referidos -->
        <div class="col-lg-8">
          <div class="card shadow-sm">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 class="card-title m-0">Referidos</h5>
              <input type="text" id="searchInput" class="form-control form-control-sm w-25" placeholder="Buscar referido...">
            </div>
            <div class="card-body" style="height: 400px; overflow-y: auto;">
              <table class="table table-hover">
                <thead class="table-light">
                  <tr>
                    <th>ID Usuario Referido</th>
                    <th>Correo Usuario Referido</th>
                    <th>ID Usuario Referidor</th>
                    <th>Correo Usuario Referidor</th>
                    <th>Estado</th>
                    <th>Fecha de Referido</th>
                  </tr>
                </thead>
                <tbody id="referidoList">
                  <tr>
                    <td colspan="6" class="text-center">Cargando...</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <nav>
              <ul id="pagination" class="pagination justify-content-center"></ul>
            </nav>
          </div>
        </div>

        <!-- Sección derecha: Formulario de referencia -->
        <div class="col-lg-4">
          <div class="d-flex justify-content-center align-items-center bg-light h-100">
            <div class="card shadow-lg p-4" style="max-width: 400px; border-radius: 10px;">
              <h2 class="text-center text-dark mb-4">Referencia a una persona</h2>
              <form>
                <!-- Campo: Nombre -->
                <div class="mb-3">
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Tu nombre" 
                    required 
                    aria-label="Nombre">
                </div>
                
                <!-- Campo: Celular -->
                <div class="mb-3">
                  <input 
                    type="tel" 
                    class="form-control" 
                    placeholder="Celular" 
                    required 
                    aria-label="Celular">
                </div>
                
                <!-- Campo: Correo Electrónico -->
                <div class="mb-3">
                  <input 
                    type="email" 
                    class="form-control" 
                    placeholder="Correo electrónico" 
                    required 
                    aria-label="Correo Electrónico">
                </div>
                
                <!-- Botón de Envío -->
                <button 
                  type="submit" 
                  class="btn btn-primary w-100">
                  ¡Listo!
                </button>
              </form>

              <!-- Texto de descargo -->
              <p class="text-center text-muted mt-3" style="font-size: 12px;">
                * Al hacer click aceptas ser contactado por los medios informados
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Obtener el ID del usuario
  const userId = getUserInfo().userId;
  await fetchReferidos(userId);

  // Función para obtener los referidos desde la API
  async function fetchReferidos(userId) {
    try {
      const response = await fetch(`https://api-skolmi.onrender.com/v1/dashboard/referidos/${userId}`);
      if (!response.ok) throw new Error('Error al obtener los referidos');

      const referidos = await response.json();
      if (referidos.length === 0) {
        document.getElementById('referidoList').innerHTML = '<tr><td colspan="6" class="text-center">No hay referidos</td></tr>';
        return;
      }

      const referidoList = document.getElementById('referidoList');
      referidoList.innerHTML = '';

      referidos.forEach(referido => {
        const estado = referido.estado === 1 ? 'Activo' : 'Inactivo';
        const fechaReferido = new Date(referido.fecha_referido);
       
        const fechaFormateada = `${fechaReferido.getDate().toString().padStart(2, '0')}/${(fechaReferido.getMonth() + 1).toString().padStart(2, '0')}/${fechaReferido.getFullYear()}`;

        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${referido.nombre_usuario_referido}</td>
          <td>${referido.correo_usuario_referido}</td>
          <td>${referido.nombre_usuario_referidor}</td>
          <td>${referido.correo_usuario_referidor}</td>
          <td><span class="badge bg-${estado === 'Activo' ? 'success' : 'secondary'}">${estado}</span></td>
          <td>${fechaFormateada}</td>
        `;
        referidoList.appendChild(row);
      });
    } catch (error) {
      console.error("Error al obtener los referidos:", error);
      document.getElementById('referidoList').innerHTML = '<tr><td colspan="6" class="text-center">Error al cargar los datos</td></tr>';
    }
  }

  // Búsqueda en la tabla de referidos
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const rows = document.querySelectorAll('#referidoList tr');

    rows.forEach(row => {
      const nombreReferido = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
      const correoReferido = row.querySelector('td:nth-child(3)').textContent.toLowerCase();

      row.style.display = nombreReferido.includes(query) || correoReferido.includes(query) ? '' : 'none';
    });
  });
}
