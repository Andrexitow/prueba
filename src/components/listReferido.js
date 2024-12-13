// Renderiza la vista de Referidos
export async function renderReferidos(container) {
    container.innerHTML = `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <!-- Título de la vista -->
        <div class="col-12 text-center">
          <h3 class="mb-4">Listado de Referidos</h3>
        </div>
      </div>

      <div class="row justify-content-center">
        <!-- Sección izquierda: Tabla de referidos -->
        <div class="col-lg-10 col-md-12">
          <div class="card shadow-sm">
            <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 class="card-title m-0">Referidos</h5>
              <input type="text" id="searchInput" class="form-control form-control-sm w-25" placeholder="Buscar referido...">
            </div>
            <div class="card-body" style="height: 400px; overflow-y: auto;">
              <table class="table table-bordered table-hover">
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
      </div>
    </div>
    `;
  
    // Llamar a la función para obtener los referidos desde la API
    await fetchReferidos();
  
    // Función para obtener los referidos desde la API
    async function fetchReferidos() {
      try {
        // Realizar la solicitud GET a la API para obtener los referidos
        const response = await fetch('https://api-skolmi.onrender.com/v1/dashboard/referidos/all');
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          throw new Error('Error al obtener los referidos');
        }
  
        // Convertir la respuesta a formato JSON
        const referidos = await response.json();
        
        // Verificar si hay datos
        if (referidos.length === 0) {
          document.getElementById('referidoList').innerHTML = '<tr><td colspan="6" class="text-center">No hay referidos</td></tr>';
          return;
        }
  
        // Actualizar la tabla con los datos obtenidos
        const referidoList = document.getElementById('referidoList');
        referidoList.innerHTML = '';  // Limpiar la tabla
  
        referidos.forEach(referido => {
          // Convertir estado numérico a texto
          const estado = referido.estado === 1 ? 'Activo' : 'Inactivo';
  
          // Formatear la fecha de referido
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
  
        // Aquí podrías añadir más lógica para la paginación si es necesario
      } catch (error) {
        console.error("Error al obtener los referidos:", error);
        document.getElementById('referidoList').innerHTML = '<tr><td colspan="6" class="text-center">Error al cargar los datos</td></tr>';
      }
    }
  
    // Función para manejar el filtro de búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const rows = document.querySelectorAll('#referidoList tr');
      
      rows.forEach(row => {
        const nombreReferido = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
        const correoReferido = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
        
        // Mostrar solo las filas que coincidan con la búsqueda
        if (nombreReferido.includes(query) || correoReferido.includes(query)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }
  