// firebaseGet.js
import { ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { db } from "./firebaseSetup.js";

export function loadEvents(addEventToPool) {
    const dbRef = ref(db, "eventDB/");
    onValue(dbRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();
            addEventToPool(childData, childSnapshot.key);
        });
    });
}
