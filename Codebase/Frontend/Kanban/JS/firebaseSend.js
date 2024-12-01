import { ref, set, push } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { db } from "./firebaseSetup.js";

export function saveEvent(eventData) {
    const eventRef = push(ref(db, 'eventDB/'));
    return set(eventRef, eventData)
        .then(() => {
            console.log("Event saved successfully.");
            return eventRef.key;
        })
        .catch((error) => {
            console.error("Error saving event:", error);
            throw error;
        });
}
