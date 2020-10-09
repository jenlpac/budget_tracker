// Create variable to hold database connection
let db;

// Establish a connection to IndexedDB database called 'budget_tracker' and set it to version 1
const request = indexedDB.open('budget_tracker', 1);

// If the database version changes:
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_entry', { autoIncrement: true });
};

// If database request successful:
request.onsuccess = function(event) {
    db = event.target.result;
    // Check if app is online
    if (navigator.online) {
        //uploadTransaction();
    }
};

// If error:
request.onerror = function(event) {
    console.log(event.target.errorCode);
};

// If new transaction submittal attempted w/out internet connectevity:
function saveRecord(record) {
    const transaction = db.transaction(['new_entry'], 'readwrite');
    const entryObjectStore = transaction.objectStore('new_entry');
    entryObjectStore.add(record);
};