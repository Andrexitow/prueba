// import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserInfo, navigate } from "../navegacion";

export const renderMatricula = (container) => {
    container.innerHTML = `
      <div class="container py-5 w-50">
        <div class="form-wrapper p-4 shadow-lg rounded bg-light">
          <h2 class="text-center neon-text mb-4">Formulario de Matrícula</h2>
          <form id="matriculaForm">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input type="text" class="form-control" id="direccion" placeholder="Ej. Calle 123" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="estadoPago" class="form-label">Estado de Pago</label>
                <select class="form-select" id="estadoPago" required>
                  <option value="" selected disabled>Seleccione...</option>
                  <option value="Pagado">Pagado</option>
                  <option value="Pendiente">Pendiente</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="sexo" class="form-label">Sexo</label>
                <select class="form-select" id="sexo" required>
                  <option value="" selected disabled>Seleccione...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label for="estadoCivil" class="form-label">Estado Civil</label>
                <select class="form-select" id="estadoCivil" required>
                  <option value="" selected disabled>Seleccione...</option>
                  <option value="Soltero">Soltero</option>
                  <option value="Casado">Casado</option>
                  <option value="Divorciado">Divorciado</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="documento" class="form-label">Documento</label>
                <input type="number" class="form-control" id="documento" placeholder="Ej. 12345678" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="nivelAcademico" class="form-label">Nivel Académico</label>
                <select class="form-select" id="nivelAcademico" required>
                  <option value="" selected disabled>Seleccione...</option>
                  <option value="Primaria">Primaria</option>
                  <option value="Secundaria">Secundaria</option>
                  <option value="Universitario">Universitario</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="anioAnterior" class="form-label">Año</label>
                <input type="number" class="form-control" id="anioAnterior" placeholder="Ej. 2004" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>
                <input type="date" class="form-control" id="fechaNacimiento" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="tipoSangre" class="form-label">Tipo de Sangre</label>
                <input type="text" class="form-control" id="tipoSangre" placeholder="Ej. O+" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="tutor" class="form-label">Tutor</label>
                <input type="text" class="form-control" id="tutor" placeholder="Nombre del Tutor" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="telTutor" class="form-label">Teléfono del Tutor</label>
                <input type="tel" class="form-control" id="telTutor" placeholder="Ej. 3001234567" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="relacionTutor" class="form-label">Relación con el Tutor</label>
                <input type="text" class="form-control" id="relacionTutor" placeholder="Ej. Padre" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="municipio" class="form-label">Municipio</label>
                <input type="text" class="form-control" id="municipio" placeholder="Ej. Medellín" required>
              </div>
              <div class="col-md-6 mb-3">
                <label for="departamento" class="form-label">Departamento</label>
                <input type="text" class="form-control" id="departamento" placeholder="Ej. Antioquia" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 mb-3">
                <label for="codigoReferido" class="form-label">Código de Referido</label>
                <input type="text" class="form-control" id="codigoReferido" placeholder="Ej. ABC123">
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary w-50 neon-button">Guardar Matrícula</button>
            </div>
          </form>
        </div>
      </div>
    `;
  
    const matriculaForm = document.getElementById('matriculaForm');
    matriculaForm.addEventListener('submit', async (e) => {
      e.preventDefault();
        
      const infoUser = getUserInfo()
      console.log(infoUser.userId);
      
      const data = {
        userId: infoUser.userId, 
        direccion: document.getElementById('direccion').value,
        estado_pago: document.getElementById('estadoPago').value,
        sexo: document.getElementById('sexo').value,
        estado_civil: document.getElementById('estadoCivil').value,
        documento: document.getElementById('documento').value,
        nivel_academico: document.getElementById('nivelAcademico').value,
        anio_anterior: document.getElementById('anioAnterior').value,
        fecha_nacimiento: document.getElementById('fechaNacimiento').value,
        tipo_sangre: document.getElementById('tipoSangre').value,
        tutor: document.getElementById('tutor').value,
        tel_tutor: document.getElementById('telTutor').value,
        relacion_tutor: document.getElementById('relacionTutor').value,
        municipio: document.getElementById('municipio').value,
        departamento: document.getElementById('departamento').value,
        codigo: document.getElementById('codigoReferido').value
      };
  
      try {
        const response = await fetch('https://api-skolmi.onrender.com/v1/dashboard/matriculas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
  
        if (response.ok) {
          alert('Matrícula guardada correctamente.');
        } else {
          const error = await response.json();
          alert(`Error: ${error.message}`);
        }
      } catch (error) {
        alert('Hubo un problema con el servidor. Intenta más tarde.');
      }
    });
  }