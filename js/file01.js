'use strict';

import { fetchFakerData } from './functions.js';

// Función para renderizar tarjetas en el contenedor
const renderCards = (data) => {
  const container = document.getElementById("skeleton-container");
  container.innerHTML = ""; // Limpiar skeletons

  data.slice(0, 3).forEach(({ title, author = "Anónimo", genre = "N/A", content }) => {
    const cardHTML = `
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-md w-full mx-auto">
        <h2 class="text-xl font-bold text-indigo-700 dark:text-indigo-400 mb-2">${title}</h2>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-1">Autor: <strong>${author}</strong></p>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Género: ${genre}</p>
        <p class="text-gray-800 dark:text-gray-200">${content}</p>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
};

// Función para cargar los datos desde FakerAPI
const loadData = async () => {
  const url = 'https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120';

  try {
    const result = await fetchFakerData(url);

    if (result.success && result.body?.data) {
      console.log('✅ Datos cargados:', result.body.data);
      renderCards(result.body.data);
    } else {
      console.error('❌ Error en la respuesta del API:', result.error || result);
    }

  } catch (error) {
    console.error('❗ Error inesperado al cargar datos:', error);
  }
};

// Ejecutar carga de datos al cargar la página
(() => {
  console.log('🔄 Cargando datos...');
  loadData();
})();
