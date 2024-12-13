// Importa Chart.js
import Chart from "chart.js/auto";

// Renderiza el Dashboard
export function renderDashboard(container) {
  container.innerHTML = `
    <div class="container mt-5">
      <div class="row">
        <!-- Cards de datos random -->
        <div class="col-lg-3">
          <div id="dataCards" class="mb-4"></div>
        </div>

        <!-- Gráfica -->
        <div class="col-lg-9">
          <h3 class="mb-4">Estadísticas Generales</h3>
          <div class="card shadow-sm rounded-lg">
            <div class="card-body">
              <canvas id="Grafica" class="rounded" style="background: #f8f9fa; padding: 20px;"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla de usuarios -->
      <div class="card shadow-sm mt-5">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 class="card-title m-0">Listado de Usuarios</h5>
          <input type="text" id="searchInput" class="form-control form-control-sm w-25" placeholder="Buscar usuario...">
        </div>
        <div class="card-body">
          <table class="table table-hover">
            <thead class="table-light">
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
          <nav>
            <ul id="pagination" class="pagination justify-content-center"></ul>
          </nav>
        </div>
      </div>
    </div>
  `;

  // Función para obtener datos de la API de reportes
  async function obtenerDatos() {
    const respuesta = await fetch("https://api-skolmi.onrender.com/v1/reportes/reporte");
    const datos = await respuesta.json();
    return datos;
  }

  // Generar Cards dinámicamente
  function generarCards(datos) {
    const totalReferidos = datos.reduce((acc, item) => acc + item.totalReferidos, 0);
    const totalConversiones = datos.reduce((acc, item) => acc + item.conversiones, 0);
    const promedioConversiones = (totalConversiones / datos.length).toFixed(2);

    const cardHTML = `
      <div class="card mb-3 shadow-sm">
        <div class="card-body text-center">
          <h5 class="card-title">Total Referidos</h5>
          <p class="h4 text-primary">${totalReferidos}</p>
        </div>
      </div>
      <div class="card mb-3 shadow-sm">
        <div class="card-body text-center">
          <h5 class="card-title">Total Conversiones</h5>
          <p class="h4 text-success">${totalConversiones}</p>
        </div>
      </div>
      <div class="card mb-3 shadow-sm">
        <div class="card-body text-center">
          <h5 class="card-title">Promedio Conversiones</h5>
          <p class="h4 text-info">${promedioConversiones}</p>
        </div>
      </div>
    `;
    document.getElementById("dataCards").innerHTML = cardHTML;
  }

  // Generar Gráfica
  async function generarGrafica() {
    const datos = await obtenerDatos();
    generarCards(datos);

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
            data: totalReferidos,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
            fill: true,
          },
          {
            label: "Conversiones",
            data: conversiones,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 8,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { type: "category" },
          y: { beginAtZero: true },
        },
        plugins: {
          tooltip: {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            titleFont: { weight: "bold" },
            bodyFont: { size: 14 },
          },
        },
        interaction: { mode: "nearest", intersect: false },
      },
    });
  }

  // Fetch y renderizar usuarios con búsqueda y paginación
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

  async function renderUserList(page = 1, searchQuery = "") {
    const users = await fetchUsers();
    const userList = document.getElementById("userList");
    const pagination = document.getElementById("pagination");

    const filteredUsers = users.filter((user) =>
      user.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const usersPerPage = 20;
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (page - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    const currentPageUsers = filteredUsers.slice(startIndex, endIndex);

    userList.innerHTML = currentPageUsers
      .map(
        (user) => `
        <tr>
          <td>${user.id_usuario}</td>
          <td>${user.nombre}</td>
          <td>${user.correo}</td>
          <td>${new Date(user.fecha_registro).toLocaleDateString()}</td>
        </tr>`
      )
      .join("") ||
      `<tr><td colspan="4" class="text-center text-danger">No se encontraron usuarios.</td></tr>`;

    pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => i + 1)
      .map(
        (pageNum) => `
        <li class="page-item ${page === pageNum ? "active" : ""}">
          <a class="page-link" href="#">${pageNum}</a>
        </li>`
      )
      .join("");

    pagination.querySelectorAll(".page-link").forEach((link, index) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        renderUserList(index + 1, searchQuery);
      });
    });
  }

  document.getElementById("searchInput").addEventListener("input", (e) => {
    const searchQuery = e.target.value;
    renderUserList(1, searchQuery);
  });

  renderUserList();
  generarGrafica();
}
