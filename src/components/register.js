import '../styles/register.css';
import { navigate } from '../navegacion';

export function renderRegister(container) {
  container.innerHTML = `
    <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div class="card shadow-lg p-4" style="max-width: 400px; width: 100%; border-radius: 10px;">
        <form id="registerForm">
          <div class="text-center mb-4">
            <img src="../sources/descarga.png" alt="Register Icon" class="img-fluid rounded-circle mb-3" style="width: 100px; height: 100px; object-fit: cover; margin-left: auto; margin-right: auto;">
            <h3 class="mb-3 text-[#037470]">Registrarse</h3> <!-- Título con color principal -->
          </div>

          <!-- Nombre -->
          <div class="mb-3">
            <label for="registerName" class="form-label text-[#037470]">Nombre</label>
            <input type="text" id="registerName" class="form-control border-[#037470] focus:ring-[#037470]" placeholder="Ingresa tu nombre">
          </div>

          <!-- Correo Electrónico -->
          <div class="mb-3">
            <label for="registerEmail" class="form-label text-[#037470]">Correo Electrónico</label>
            <input type="email" id="registerEmail" class="form-control border-[#037470] focus:ring-[#037470]" placeholder="Ingresa tu correo">
          </div>

          <!-- Contraseña -->
          <div class="mb-3">
            <label for="registerPassword" class="form-label text-[#037470]">Contraseña</label>
            <input type="password" id="registerPassword" class="form-control border-[#037470] focus:ring-[#037470]" placeholder="Crea una contraseña">
          </div>

          <!-- Botón de Registro -->
          <div class="d-grid gap-2">
            <button type="submit" class="btn" style="background-color: #ff8c00; color: white;">Registrarse</button>
          </div>

          <!-- Enlace para Iniciar sesión -->
          <p class="mt-3 text-center">
            <a href="#" id="navbarLogin" class="text-[#037470] text-decoration-none">¿Ya tienes cuenta? Inicia sesión</a>
          </p>
        </form>
        <div id="successMessage" class="alert alert-success text-center" style="display: none;"></div> <!-- Contenedor para el mensaje de éxito -->
      </div>
    </div>
  `;

  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('registerName').value;
    const correo = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const roleId = 2;

    let isValid = true;
    clearErrors();

    if (!nombre.trim()) {
      isValid = false;
      showError('registerName', 'El nombre es obligatorio');
    }

    if (!correo.trim()) {
      isValid = false;
      showError('registerEmail', 'El correo electrónico es obligatorio');
    } else if (!validateEmail(correo)) {
      isValid = false;
      showError('registerEmail', 'Por favor ingresa un correo electrónico válido');
    }

    if (!password.trim()) {
      isValid = false;
      showError('registerPassword', 'La contraseña es obligatoria');
    } else if (password.length < 6) {
      isValid = false;
      showError('registerPassword', 'La contraseña debe tener al menos 6 caracteres');
    }

    if (!isValid) {
      return;
    }

    try {
      const response = await fetch('https://api-skolmi.onrender.com/v1/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, password, roleId }),
      });

      if (response.ok) {
        const data = await response.json();
        showSuccessMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setTimeout(() => {
          navigate('login');
        }, 2000);
      } else {
        const error = await response.json();
        if (error.message && error.message.includes('already registered')) {
          showError('registerEmail', 'Este correo electrónico ya está registrado');
        } else {
          alert(`Error: ${error.message}`);
        }
      }
    } catch (error) {
      alert('Hubo un problema con el servidor. Intenta más tarde.');
    }
  });
}

// Función para mostrar los errores en los campos
function showError(inputId, message) {
  const inputField = document.getElementById(inputId);
  const errorElement = document.createElement('div');
  errorElement.classList.add('text-danger', 'small');
  errorElement.innerText = message;

  inputField.classList.add('is-invalid'); // Agrega la clase 'is-invalid' para marcar el campo
  inputField.parentElement.appendChild(errorElement);
}

function clearErrors() {
  const inputs = document.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.classList.remove('is-invalid');
    const error = input.parentElement.querySelector('.text-danger');
    if (error) {
      error.remove();
    }
  });
}

function showSuccessMessage(message) {
  const successMessage = document.getElementById('successMessage');
  successMessage.innerText = message;
  successMessage.style.display = 'block';
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}