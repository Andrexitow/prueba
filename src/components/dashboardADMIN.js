// components/dashboardADMIN.js
import Chart from "chart.js/auto";

export function renderDashboard(container) {
    container.innerHTML = `
    <div class="container-fluid">
      <div class="row">


        <!-- Main content -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">

          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Bienvenido, Administrador</h1>
          </div>

          <!-- Charts -->
          <div class="mb-4">
            <h3>Estadísticas Generales</h3>
            <canvas id="Grafica" class="shadow rounded" style="background: #f9f9f9; padding: 15px; border-radius: 10px;"></canvas>
          </div>

          <!-- User List -->
          <div class="card shadow-sm mt-5">
            <div class="card-header bg-primary text-white">
              <h5 class="card-title">Listado de Usuarios</h5>
            </div>
            <div class="card-body">
              <table class="table table-striped table-hover">
                <thead class="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Fecha de Registro</th>
                  </tr>
                </thead>
                <tbody id="userList">
                  <tr>
                    <td colspan="4" class="text-center">Cargando...</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  `;

  async function fetchUsers() {
    try {
      const response = await fetch("https://api-skolmi.onrender.com/v1/user/users");
      if (!response.ok) throw new Error("Error al cargar los usuarios");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  // Renderizar la lista de usuarios
  async function renderUserList() {
    const users = await fetchUsers();
    const userList = document.getElementById("userList");

    if (users.length === 0) {
      userList.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-danger">No se encontraron usuarios.</td>
        </tr>
      `;
      return;
    }
console.log(users);

    userList.innerHTML = ""; // Limpiar la tabla
    users.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.id_usuario}</td>
        <td>${user.nombre}</td>
        <td>${user.correo}</td>        
        <td>${new Date(user.fecha_registro).toLocaleDateString()}</td>
      `;
      userList.appendChild(row);
    });
  }

  // Configurar la gráfica
  async function obtenerDatos() {
    const respuesta = await fetch(
       "https://api-skolmi.onrender.com/v1/reportes/reporte"
    );
  //   const respuesta = await fetch(
  //     "http://localhost:1235/v1/reportes/reporte"
  // );
    const datos = await respuesta.json();
    return datos;
}

async function generarGrafica() {
    const datos = await obtenerDatos();
    const etiquetas = datos.map((item) => item.id_usuario_referidor);
    const totalReferidos = datos.map((item) => item.totalReferidos);
    const conversiones = datos.map((item) => item.conversiones);
    const ctx = document.getElementById("Grafica").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: etiquetas,
            datasets: [
                {
                    label: "Total Referidos",
                    data: totalReferidos.map((val, index) => ({
                        x: index,
                        y: val,
                    })),
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
                {
                    label: "Conversiones",
                    data: conversiones.map((val, index) => ({
                        x: index,
                        y: val,
                    })),
                    backgroundColor: "rgba(153, 102, 255, 0.2)",
                    borderColor: "rgba(153, 102, 255, 1)",
                    borderWidth: 1,
                },
            ],
        },
        options: { scales: { x: { type: "linear", position: "bottom" } } },
    });
}

  // Inicializar la tabla y la gráfica
  renderUserList();
  generarGrafica()
}
