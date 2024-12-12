// components/dashboardADMIN.js
import Chart from 'chart.js/auto';

export function renderDashboard(container) {
  container.innerHTML = `
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <nav class="col-md-2 d-none d-md-block bg-dark text-light sidebar">
          <div class="position-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link text-light active" href="#">
                  <span data-feather="home"></span>
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-light" href="#">
                  <span data-feather="users"></span>
                  Usuarios
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Main content -->
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Bienvenido, Administrador</h1>
          </div>

          <!-- Charts -->
          <div class="row mb-4">
            <div class="col-md-6">
              <canvas id="chart1"></canvas>
            </div>
            <div class="col-md-6">
              <canvas id="chart2"></canvas>
            </div>
          </div>

          <!-- User List -->
          <div class="card shadow-sm">
            <div class="card-header">
              <h5 class="card-title">Listado de Usuarios</h5>
            </div>
            <div class="card-body">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
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

  // Cargar gráficos
  fetchChartData('https://api-skolmi.onrender.com/v1/chart-data')
    .then(data => initializeCharts(data))
    .catch(error => console.error('Error loading charts:', error));

  // Cargar listado de usuarios
  fetchUsers('https://api-skolmi.onrender.com/v1/')
    .then(users => renderUserList(users))
    .catch(error => console.error('Error loading user list:', error));
}

function fetchChartData(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => { throw error; });
}

function initializeCharts(data) {
  const ctx1 = document.getElementById('chart1').getContext('2d');
  const ctx2 = document.getElementById('chart2').getContext('2d');

  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Datos 1',
        data: data.values1,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: { responsive: true }
  });

  new Chart(ctx2, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Datos 2',
        data: data.values2,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: { responsive: true }
  });
}

function fetchUsers(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(error => { throw error; });
}

function renderUserList(users) {
  const userList = document.getElementById('userList');
  userList.innerHTML = '';

  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.rol === 0 ? 'Admin' : 'Usuario'}</td>
    `;
    userList.appendChild(row);
  });
}