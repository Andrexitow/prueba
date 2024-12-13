import { getUserInfo } from "../navegacion";
import Swal from "sweetalert2";

export const renderFormularioIncentivos = (container) => {
  container.innerHTML = `
    <div class="container py-5 w-50">
      <div class="form-wrapper p-4 shadow-lg rounded bg-light">
        <h2 class="text-center mb-4">Formulario de Incentivos</h2>
        <form id="incentivoForm">
          <div class="row">
            <!-- Campo: ID Usuario Referidor -->            
          </div>

          <div class="row">
            <!-- Campo: Tipo de Incentivo -->
            <div class="col-md-12 mb-3">
              <label for="tipoIncentivo" class="form-label">Tipo de Incentivo</label>
              <input 
                type="text" 
                class="form-control" 
                id="tipoIncentivo" 
                placeholder="Ej. Bonificación" 
                maxlength="50" 
                required>
            </div>
          </div>

          <div class="row">
            <!-- Campo: Valor del Incentivo -->
            <div class="col-md-12 mb-3">
              <label for="valorIncentivo" class="form-label">Valor del Incentivo</label>
              <input 
                type="number" 
                class="form-control" 
                id="valorIncentivo" 
                placeholder="Ej. 150.00" 
                step="0.01" 
                required>
            </div>
          </div>

          <div class="row">
            <!-- Campo: Fecha de Entrega -->
            <div class="col-md-12 mb-3">
              <label for="fechaEntrega" class="form-label">Fecha de Entrega</label>
              <input 
                type="datetime-local" 
                class="form-control" 
                id="fechaEntrega" 
                required>
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary w-50">Guardar Incentivo</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const incentivoForm = document.getElementById("incentivoForm");

  incentivoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      id_usuario_referidor: parseInt(document.getElementById("idUsuarioReferidor").value),
      tipo_incentivo: document.getElementById("tipoIncentivo").value,
      valor_incentivo: parseFloat(document.getElementById("valorIncentivo").value),
      fecha_entrega: document.getElementById("fechaEntrega").value,
    };

    try {
      const response = await fetch("https://api-skolmi.onrender.com/v1/dashboard/incentivos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Incentivo guardado!",
          text: "El incentivo se ha registrado exitosamente.",
          confirmButtonText: "Aceptar",
        });
      } else {
        const error = await response.json();
        Swal.fire({
          icon: "error",
          title: "Error al guardar",
          text: `Error: ${error.message}`,
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error del servidor",
        text: "Hubo un problema con el servidor. Intenta más tarde.",
        confirmButtonText: "Aceptar",
      });
    }
  });
};
