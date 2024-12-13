// import { navigate } from '../navegacion/index.js';
// import { navigate } from '../navegacion';

export async function renderSettings(container) {
    const token = localStorage.getItem('token'); // O usa tu función para obtener el token
    if (!token) {
      navigate('login'); // Si no hay token, redirige al login
      return;
    }
  
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.userId) {
      navigate('login'); // Si no hay userInfo o userId, redirige al login
      return;
    }
  
    try {
      // Realiza la solicitud a la API usando el userId y el token
      const response = await fetch(`https://api-skolmi.onrender.com/v1/user/users/${userInfo.userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Para manejar cookies o sesiones si es necesario
      });
  
      if (!response.ok) {
        throw new Error('No se pudo obtener la información del usuario');
      }
  
      const data = await response.json();
  
      // Verifica si la respuesta tiene la estructura esperada
      if (!data || !data.nombre) {
        throw new Error('Datos incompletos del usuario');
      }
  
      // Recuperamos el código de referencia
      const codigo = data[0]?.codigo || 'No disponible';
  
      // Renderiza el perfil con los datos obtenidos
      container.innerHTML = `
        <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
          <div class="card shadow-lg p-4" style="max-width: 600px; width: 100%; border-radius: 10px;">
            <div class="text-center mb-4">
              <img src="../sources/descarga.png" alt="User Icon" class="img-fluid rounded-circle mb-3" style="width: 100px; height: 100px; object-fit: cover;">
              <h3 class="mb-3 text-[#037470]">Perfil de Usuario</h3>
            </div>
  
            <!-- Nombre -->
            <div class="mb-3">
              <label for="profileName" class="form-label text-[#037470]">Nombre</label>
              <input type="text" id="profileName" class="form-control border-[#037470] focus:ring-[#037470]" value="${data.nombre}" disabled>
            </div>
  
            <!-- Correo Electrónico -->
            <div class="mb-3">
              <label for="profileEmail" class="form-label text-[#037470]">Correo Electrónico</label>
              <input type="email" id="profileEmail" class="form-control border-[#037470] focus:ring-[#037470]" value="${data.correo}" disabled>
            </div>
  
            <!-- Código de Referencia -->
            <div class="mb-3">
              <label for="profileReferralCode" class="form-label text-[#037470]">Código de Referencia</label>
              <input type="text" id="profileReferralCode" class="form-control border-[#037470] focus:ring-[#037470]" value="${codigo}" disabled>
            </div>
  
            <!-- Teléfono -->
            <div class="mb-3">
              <label for="profilePhone" class="form-label text-[#037470]">Teléfono</label>
              <input type="text" id="profilePhone" class="form-control border-[#037470] focus:ring-[#037470]" value="${data.telefono}" disabled>
            </div>
  
            <!-- Fecha de Registro -->
            <div class="mb-3">
              <label for="profileRegisterDate" class="form-label text-[#037470]">Fecha de Registro</label>
              <input type="text" id="profileRegisterDate" class="form-control border-[#037470] focus:ring-[#037470]" value="${new Date(data.fecha_registro).toLocaleDateString()}" disabled>
            </div>
  
            <!-- Estado del Usuario -->
            <div class="mb-3">
              <label for="profileStatus" class="form-label text-[#037470]">Estado</label>
              <input type="text" id="profileStatus" class="form-control border-[#037470] focus:ring-[#037470]" value="${data.estado_usuario === 1 ? 'Activo' : 'Inactivo'}" disabled>
            </div>
  
            <!-- Código -->
            <div class="mb-3">
              <label for="profileCode" class="form-label text-[#037470]">Código</label>
              <input type="text" id="profileCode" class="form-control border-[#037470] focus:ring-[#037470]" value="${data.codigo}" disabled>
            </div>
  
            <!-- Rol -->
            <div class="mb-3">
              <label for="profileRole" class="form-label text-[#037470]">Rol</label>
              <input type="text" id="profileRole" class="form-control border-[#037470] focus:ring-[#037470]" value="${data.id_rol === 1 ? 'Admin' : 'Usuario'}" disabled>
            </div>
  
            <!-- Curso -->
            <div class="mb-3">
              <label for="profileCourse" class="form-label text-[#037470]">Curso Asignado</label>
              <input type="text" id="profileCourse" class="form-control border-[#037470] focus:ring-[#037470]" value="${data.id_curso ? `Curso ID: ${data.id_curso}` : 'No asignado'}" disabled>
            </div>
  
            <!-- Botón de Editar Perfil -->
            <div class="d-grid gap-2 mt-4">
              <button type="button" id="editProfileButton" class="btn" style="background-color: #ff8c00; color: white;">Editar Perfil</button>
            </div>
  
            <!-- Botón de Guardar Cambios -->
            <div class="d-grid gap-2 mt-3" style="display: none;" id="saveChangesButtonContainer">
              <button type="submit" class="btn" style="background-color: #037470; color: white;">Guardar Cambios</button>
            </div>
  
            <div id="errorMessage" class="alert alert-danger text-center" style="display: none;"></div> <!-- Contenedor para el mensaje de error -->
            <div id="successMessage" class="alert alert-success text-center" style="display: none;"></div> <!-- Contenedor para el mensaje de éxito -->
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Error al obtener la información del usuario:', error);
      navigate('login'); // Redirige al login si hubo un error
    }
  }
  