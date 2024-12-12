function isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si el token existe, de lo contrario false
  }
  
  export function renderStudentEnrollment(container) {
    if (!isAuthenticated()) {
      alert('Por favor, inicia sesión para acceder.');
      navigate('login');
      return;
    }
  
    container.innerHTML = `
      <div>
        <h1>Formulario de Matrícula</h1>
        <!-- Contenido de la matrícula -->
      </div>
    `;
  }
  