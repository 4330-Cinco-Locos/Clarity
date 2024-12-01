import { ref, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { db } from "./firebaseSetup.js";

export function updateTask(taskId, updatedData) {
    const taskRef = ref(db, `eventDB/${taskId}`);
    return update(taskRef, updatedData)
        .then(() => {
            console.log("Task updated successfully in Firebase.");
        })
        .catch((error) => {
            console.error("Error updating task:", error);
            throw error;
        });
}
