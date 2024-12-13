import { renderLogin } from '../components/login.js';
import { renderRegister } from '../components/register.js';
import { renderDashboard } from '../components/dashboardADMIN.js';
import { renderStudentEnrollment } from '../components/matricula.js';
import { renderMatricula } from '../components/matriculacion.js';
import { renderAcademicPlatform } from '../components/academicPlataform.js';
import renderEducacionVirtual from '../components/views/educacionVirtual.js';
import { renderHome } from '../components/home.js';


const appContainer = document.getElementById('app');

// Función para decodificar el token
function decodeToken(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

// Función para obtener información del usuario
export function getUserInfo() {
  const token = getToken();
  if (token) {
    const decodedToken = decodeToken(token);
    return decodedToken ? {
      name: decodedToken.nombre || 'Usuario',
      rol: decodedToken.rol,
      userId: decodedToken.userId
    } : null;
  }
  return null;
}


// Función para obtener el token
function getToken() {
  return localStorage.getItem('token');
}

// Función para verificar si el usuario está autenticado
function isAuthenticated() {
  const token = getToken();
  return !!token; // Retorna true si el token existe, false si no
}


// Función de navegación
async function navigate(view) {
  appContainer.innerHTML = ''; // Limpiar el contenedor

  // Renderiza la vista según la navegación
  const userInfo = getUserInfo();

  if (view === 'login') {
    renderLogin(appContainer);
  } else if (view === 'register') {
    renderRegister(appContainer);
  } else if (view === 'dashboard') {
    if (isAuthenticated() && userInfo?.rol === 0) {
      renderDashboard(appContainer);
    } else {
      alert('Acceso denegado. No tienes permisos para ver esta página.');
      return navigate('home'); // Evitar bucles usando return
    }
  } else if (view === 'matricula') {
    if (isAuthenticated()) {
      try {
        const isEnrolled = await validate(userInfo.userId);
        console.log('Resultado de isEnrolled:', isEnrolled);

        if (!isEnrolled) {
          renderStudentEnrollment(appContainer); // Si no está matriculado, muestra la vista de matrícula.
        } else {
          return navigate('academicPlataform'); // Evitar bucles usando return
        }
      } catch (error) {
        console.error('Error al validar la matrícula:', error);
        alert('Hubo un problema al validar tu matrícula. Intenta más tarde.');
      }
    } else {
      alert('No estás autenticado. Redirigiendo al login...');
      return navigate('login'); // Evitar bucles usando return
    }
  } else if (view === 'academicPlataform') {
    if (isAuthenticated()) {
      try {
        const isEnrolled = await validate(userInfo.userId);
        console.log('Resultado de validate:', isEnrolled);

        if (isEnrolled) {
          renderAcademicPlatform(appContainer); // Si está matriculado, muestra la plataforma académica.
        } else {
          return navigate('matricula'); // Evitar bucles usando return
        }
      } catch (error) {
        console.error('Error al validar la plataforma académica:', error);
        alert('Hubo un problema al validar tu acceso. Intenta más tarde.');
      }
    } else {
      alert('No estás autenticado. Redirigiendo al login...');
      return navigate('login'); // Evitar bucles usando return
    }
  } else if (view === 'educacionVirtual') { // NUEVA VISTA -------------
    renderEducacionVirtual(appContainer);
  } else if (view === 'matriculacion') {
    if (isAuthenticated()) {
      renderMatricula(appContainer);
    } else {
      alert('No estás autenticado. Redirigiendo al login...');
      return navigate('login'); // Evitar bucles usando return
    }
  } else {
    renderHome(appContainer);
  }

  // Actualizar navbar
  updateNavbar();
}



// Función para actualizar la navbar
function updateNavbar() {
  const navbarContent = document.getElementById('navbarContent');
  const isLoggedIn = isAuthenticated();
  const userInfo = getUserInfo();

  navbarContent.innerHTML = '';

  if (isLoggedIn && userInfo) {
    navbarContent.innerHTML = `
      <div class="flex items-center space-x-6">
        <!-- Nuevos enlaces de navegación dentro de este div -->
        <a href="#" id="showCourseUser" class="text-gray-800 hover:text-blue-600 text-lg font-semibold no-underline transition duration-200">Mis Cursos</a>
        <a href="#" id="showCourse" class="text-gray-800 hover:text-blue-600 text-lg font-semibold no-underline transition duration-200">Cursos</a>
        <a href="#" id="showSettings" class="text-gray-800 hover:text-blue-600 text-lg font-semibold no-underline transition duration-200">Configuración</a>

        <!-- Información de usuario y botón de logout -->
        <div class="flex items-center space-x-4">
          <span class="text-gray-800 font-medium text-lg">Hola, ${userInfo.name}</span>
          <button id="logoutButton" class="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition duration-200">Cerrar Sesión</button>
        </div>
      </div>

    `;

    document.getElementById('logoutButton').addEventListener('click', () => {
      localStorage.removeItem('token');
      navigate('educacionVirtual');
    });
  } else {
    navbarContent.innerHTML = `
      <div class="flex items-center space-x-6">
        <a href="#" id="showHome" class="text-[#037470] hover:text-[#026a5c] text-lg font-semibold no-underline transition duration-200">Inicio</a>
        <a href="#" id="showCourse" class="text-[#037470] hover:text-[#026a5c] text-lg font-semibold no-underline transition duration-200">Cursos</a>
        <!-- Botón Login con color anaranjado -->
        <a href="#" id="navbarLogin" class="bg-[#FF8C00] text-white px-6 py-2 rounded-md hover:bg-[#e07700] transition duration-200 no-underline">Login</a>
        <!-- Botón Sign up -->
        <button id="showRegister" class="bg-[#037470] text-white px-6 py-2 rounded-md hover:bg-[#026a5c] transition duration-200">Sign up</button>
      </div>



    `;
  }
}

// Configuración de eventos de navegación
function setupNavigationEvents() {
  document.addEventListener('click', (e) => {
    if (e.target.id === 'showRegister') {
      e.preventDefault();
      navigate('register');
    } else if (e.target.id === 'navbarLogin') {
      e.preventDefault();
      navigate('login');
    } else if (e.target.id === 'showDashboard') {
      e.preventDefault();
      navigate('dashboard');
    } else if (e.target.id === 'showCourse') {
      e.preventDefault();
      navigate('matricula');
    } else if (e.target.id === 'showMatricula') {
      e.preventDefault();
      navigate('matriculacion');
    } else if (e.target.id === 'showHome') {
      e.preventDefault();
      navigate('educacionVirtual');
    } else if (e.target.id === 'showCourseUser') {
      e.preventDefault();
      navigate('academicPlatform');
    }
  });
}

export const validate = async (userId) => {
  try {
    console.log(`${userId} desde función validate`);
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token no encontrado. No se puede validar al usuario.');
    }

    const url = new URL(`https://api-skolmi.onrender.com/v1/user/users/${userId}`);
    const responseUser = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      credentials: 'include'
    });

    if (!responseUser.ok) {
      throw new Error(`Error en la solicitud: ${responseUser.statusText}`);
    }

    const userData = await responseUser.json();
    console.log(userData[0]);
    

    if (!Array.isArray(userData) || userData.length === 0) {
      throw new Error('Datos de usuario no válidos o usuario no encontrado.');
    }

    console.log(`Código del usuario: ${userData[0].codigo}`);
    return userData[0].codigo !== null;
  } catch (error) {
    console.error('Error en validate:', error.message);
    return false; // Si ocurre un error, redirige al flujo de matrícula.
  }
};
// Función para obtener el código de referencia desde el servidor
const getReferralCode = async () => {
  const token = localStorage.getItem('token'); // Obtener el token del usuario desde localStorage

  if (!token) {
    return Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No estás autenticado.',
    });
  }

  try {
    const userInfo = getUserInfo();  // Obtener la información del usuario logueado
    if (!userInfo || !userInfo.userId) {
      throw new Error('No se pudo obtener el userId.');
    }

    // Utiliza el userId en la URL
    const response = await fetch(`https://api-skolmi.onrender.com/v1/user/users/${userInfo.userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Enviar el token de autenticación en los headers
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Para manejar cookies o sesiones si es necesario
    });

    if (!response.ok) {
      throw new Error('No se pudo obtener el código de referencia.');
    }

    const data = await response.json();

    // Asegúrate de acceder correctamente al primer elemento del arreglo
    const codigo = data[0]?.codigo; // Esto debería ser el código que necesitas

    if (!codigo) {
      throw new Error('No se encontró el código de referencia.');
    }

    // Crear un input temporal para copiar el código al portapapeles
    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = codigo;  // Asignamos el código al input
    tempInput.select();  // Seleccionamos el texto del input
    document.execCommand('copy');  // Copiamos el código al portapapeles

    // Eliminar el input temporal después de copiar
    document.body.removeChild(tempInput);

    // Mostrar mensaje de confirmación con el código generado
    Swal.fire({
      icon: 'success',
      title: 'Código copiado!',
      text: `¡El código de referencia ${codigo} ha sido copiado al portapapeles! Puedes compartirlo con tu amigo.`,
      confirmButtonText: 'Aceptar',
    });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message,
    });
  }
};

// Llama a la función getReferralCode cuando se haga clic en el botón referir
document.addEventListener('click', (e) => {
  if (e.target.id === 'referButton') {
    e.preventDefault();

    getReferralCode(); // Llama a la función para copiar el código
  }
});

function initApp() {
  const isAuthenticatedUser = isAuthenticated(); 

  const userInfo = getUserInfo();

  if (isAuthenticatedUser) {
    console.log('Usuario autenticado');

    if (userInfo?.rol === 0) {
      console.log('Rol de Administrador');
      navigate('dashboard');
    } else if (userInfo?.rol === 1) {
      console.log('Usuario matriculado');
      navigate('academicPlatform');
    } else {
      console.log('Usuario sin matrícula o con rol desconocido, redirigiendo a matrícula');
      navigate('matricula');
    }
  } else {
    console.log('Usuario no autenticado, redirigiendo a home');
    navigate('educacionVirtual');
  }

  // Configurar eventos de navegación y actualizar la barra de navegación
  setupNavigationEvents();
  updateNavbar();
}







// Exportar funciones necesarias
export { navigate, updateNavbar, initApp };
