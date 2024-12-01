import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAxXs88pJUfCoeotb0C8gfTGxvltpPBz8",
    authDomain: "clarity-295d8.firebaseapp.com",
    databaseURL: "https://clarity-295d8-default-rtdb.firebaseio.com",
    projectId: "clarity-295d8",
    storageBucket: "clarity-295d8.appspot.com",
    messagingSenderId: "117186684063",
    appId: "1:117186684063:web:a0a70113604e5c07ed2eaa"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase();

// Utility function to format date in 'YYYY-MM-DDTHH:mm:ss' format
export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
