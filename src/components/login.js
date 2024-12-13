import { getUserInfo, navigate, validate } from "../navegacion";

export function renderLogin(container) {
  container.innerHTML = `
    <div class="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div class="card shadow-lg p-4" style="max-width: 400px; width: 100%; border-radius: 10px;">
        <form id="loginForm">
          <div class="text-center mb-4">
            <img src="../sources/descarga.png" alt="Login Icon" class="img-fluid rounded-circle mb-3" style="width: 100px; height: 100px; object-fit: cover; margin-left: auto; margin-right: auto;">
            <h3 class="mb-3 text-[#037470]">Login</h3> <!-- Título con color principal -->
          </div>

          <!-- Email -->
          <div class="mb-3">
            <label for="loginEmail" class="form-label text-[#037470]">Correo Electrónico</label> <!-- Color principal en el label -->
            <input type="email" id="loginEmail" class="form-control border-[#037470] focus:ring-[#037470]" placeholder="Ingresa tu correo">
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="loginPassword" class="form-label text-[#037470]">Contraseña</label> <!-- Color principal en el label -->
            <input type="password" id="loginPassword" class="form-control border-[#037470] focus:ring-[#037470]" placeholder="Ingresa tu contraseña">
          </div>

          <!-- Submit Button -->
          <div class="d-grid gap-2">
            <button type="submit" class="btn" style="background-color: #ff8c00; color: white;">Ingresar</button> <!-- Color secundario en el botón -->
          </div>

          <!-- Register Link -->
          <p class="mt-3 text-center">
            <a href="#" id="showRegister" class="text-[#037470] text-decoration-none">¿No tienes cuenta? Regístrate</a> <!-- Color principal en el enlace -->
          </p>
        </form>
      </div>
    </div>

  `;

  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const correo = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    let isValid = true;

    clearErrors();

    if (!correo.trim()) {
      isValid = false;
      showError('loginEmail', 'El correo electrónico es obligatorio');
    } else if (!validateEmail(correo)) {
      isValid = false;
      showError('loginEmail', 'Por favor ingresa un correo electrónico válido');
    }

    if (!password.trim()) {
      isValid = false;
      showError('loginPassword', 'La contraseña es obligatoria');
    } else if (password.length < 2) {
      isValid = false;
      showError('loginPassword', 'La contraseña debe tener al menos 6 caracteres');
    }

    if (!isValid) {
      return; // No enviar el formulario si hay errores
    }

    try {
      const response = await fetch('https://api-skolmi.onrender.com/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password }),
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();        
        // Guardar el token en localStorage
        localStorage.setItem('token', data.token);                
        const userInfo = getUserInfo()

        if (data.token) {
          // Redirigir según el rol
          if (userInfo.rol === 0) {
            navigate('dashboard'); // Admin Dashboard
          } else {
            try {
              const isEnrolled = await validate(userInfo.userId); // Usa await aquí
              console.log(isEnrolled);
              
              if (isEnrolled) {
                console.log('academic');
                navigate('academicPlataform'); // Redirige a la plataforma si está matriculado.
              } else {
                navigate('matricula'); // Redirige a la matrícula si no está matriculado.
                console.log('matricula');                
              }
            } catch (error) {
              console.error('Error al validar el login:', error);
              alert('Hubo un problema al validar tu acceso. Intenta más tarde.');
            }
          }
        } else {
          throw new Error('Error al decodificar el token.');
        }
        
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.log(error);
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

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}