export default function renderEducacionVirtual() {
    document.getElementById("app").innerHTML = `
        <header class="bg-[#037470] text-white py-20">
            <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <!-- Columna de Texto -->
                <div class="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                <h1 class="text-4xl font-bold mb-4">¿Quiénes somos?</h1>
                <p class="text-xl">Somos una institución dedicada a la educación virtual con más de 21 años de experiencia, brindando excelencia académica.</p>
                </div>

                <!-- Columna de Imagen -->
                <div class="w-full md:w-1/2">
                <img src="https://via.placeholder.com/500" alt="Imagen de Quiénes Somos" class="w-full h-auto object-cover rounded-lg shadow-lg">
                </div>
            </div>
            </header>

            <section class="container mx-auto my-10 px-4">
            <h2 class="text-2xl font-semibold text-center mb-8">Nuestros Logros</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div class="card shadow-lg p-6 bg-white rounded-lg text-center">
                <h5 class="text-3xl font-bold text-[#037470]">21</h5>
                <p class="text-xl">Años de experiencia</p>
                </div>
                <div class="card shadow-lg p-6 bg-white rounded-lg text-center">
                <h5 class="text-3xl font-bold text-[#037470]">90+</h5>
                <p class="text-xl">Profesionales en educación</p>
                </div>
                <div class="card shadow-lg p-6 bg-white rounded-lg text-center">
                <h5 class="text-3xl font-bold text-[#037470]">2900+</h5>
                <p class="text-xl">Estudiantes graduados</p>
                </div>
            </div>
            </section>

            <section class="bg-[#f5f5f5] py-12">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-2xl font-semibold mb-8">Ventajas de la Educación Virtual</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h5 class="font-semibold text-xl">Tiempo libre</h5>
                    <p class="text-gray-700">Flexibilidad para adaptar horarios a tus necesidades.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h5 class="font-semibold text-xl">Metodología</h5>
                    <p class="text-gray-700">Clases diseñadas con herramientas dinámicas.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h5 class="font-semibold text-xl">Orientación vocacional</h5>
                    <p class="text-gray-700">Asesoría para definir tu camino profesional.</p>
                </div>
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h5 class="font-semibold text-xl">Flexibilidad</h5>
                    <p class="text-gray-700">Estudia desde cualquier lugar y momento.</p>
                </div>
                </div>
            </div>
            </section>

            <section class="container mx-auto py-12 px-4">
            <h2 class="text-2xl font-semibold text-center mb-8">Programas de Educación Virtual</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <div class="card shadow-lg bg-white rounded-lg">
                <img src="https://via.placeholder.com/150" class="card-img-top rounded-t-lg" alt="Program Image">
                <div class="card-body p-4 text-center">
                    <h5 class="text-xl font-semibold">Finanzas</h5>
                </div>
                </div>
                <div class="card shadow-lg bg-white rounded-lg">
                <img src="https://via.placeholder.com/150" class="card-img-top rounded-t-lg" alt="Program Image">
                <div class="card-body p-4 text-center">
                    <h5 class="text-xl font-semibold">Marketing</h5>
                </div>
                </div>
                <div class="card shadow-lg bg-white rounded-lg">
                <img src="https://via.placeholder.com/150" class="card-img-top rounded-t-lg" alt="Program Image">
                <div class="card-body p-4 text-center">
                    <h5 class="text-xl font-semibold">Desarrollo</h5>
                </div>
                </div>
                <div class="card shadow-lg bg-white rounded-lg">
                <img src="https://via.placeholder.com/150" class="card-img-top rounded-t-lg" alt="Program Image">
                <div class="card-body p-4 text-center">
                    <h5 class="text-xl font-semibold">Diseño</h5>
                </div>
                </div>
            </div>
            </section>


    `;
}
