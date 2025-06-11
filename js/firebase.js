// js/firebase.js

// Importamos desde el CDN las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
import { get, child } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";
import { saveVote, getVotes } from './firebase.js';


// Configuración con variables de entorno de Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializar la app
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Función para guardar votos
export function saveVote(productID) {
  // a. Referencia a la colección "votes"
  const votesRef = ref(database, "votes");

  // b. Crear nueva referencia para el voto con push()
  const newVoteRef = push(votesRef);

  // c. Obtener fecha actual
  const now = new Date().toISOString();

  // d. Guardar datos con set()
  return set(newVoteRef, {
    productID: productID,
    timestamp: now
  })
    .then(() => {
      return { success: true, message: "Voto guardado correctamente." };
    })
    .catch((error) => {
      return { success: false, message: "Error al guardar el voto.", error };
    });
}

// Función para obtener los votos desde Firebase
export async function getVotes() {
  const votesRef = ref(database); // referencia raíz
  try {
    const snapshot = await get(child(votesRef, "votes")); // accede a "votes"
    if (snapshot.exists()) {
      return { success: true, data: snapshot.val() };
    } else {
      return { success: false, message: "No hay votos registrados." };
    }
  } catch (error) {
    return { success: false, message: "Error al obtener votos.", error };
  }
  function enableForm() {
  const form = document.getElementById('form_voting');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const input = document.getElementById('select_product');
    const productID = input?.value?.trim();

    if (!productID) {
      alert("Selecciona un producto válido.");
      return;
    }

    const result = await saveVote(productID);

    if (result.success) {
      alert("✅ Voto guardado.");
      form.reset();
      await displayVotes(); // Actualiza la tabla después de guardar
    } else {
      alert("❌ Error: " + result.message);
    }
  });
}

// Nueva función: Mostrar votos en una tabla
async function displayVotes() {
  const result = await getVotes();
  const container = document.getElementById('results');
  if (!container) return;

  // Limpiar el contenedor
  container.innerHTML = '';

  if (!result.success || !result.data) {
    container.textContent = 'No hay votos para mostrar.';
    return;
  }

  // Contar votos por producto
  const voteData = result.data;
  const counts = {};

  Object.values(voteData).forEach((vote) => {
    const product = vote.productID;
    if (product) {
      counts[product] = (counts[product] || 0) + 1;
    }
  });

  // Crear tabla
  const table = document.createElement('table');
  table.border = '1';
  table.innerHTML = `
    <thead>
      <tr>
        <th>Producto</th>
        <th>Total de Votos</th>
      </tr>
    </thead>
    <tbody>
      ${Object.entries(counts).map(([product, count]) => `
        <tr>
          <td>${product}</td>
          <td>${count}</td>
        </tr>
      `).join('')}
    </tbody>
  `;

  container.appendChild(table);
}

}
