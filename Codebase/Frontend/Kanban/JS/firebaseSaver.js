import { saveEvent } from "./firebaseSend.js";
import { addEventToPool } from "./uiHelper.js";

export function saveNewTask(taskData) {
    saveEvent(taskData)
        .then((taskId) => {
            addEventToPool(taskData, taskId);
        })
        .catch((error) => {
            console.error("Error saving new task:", error);
        });
}
