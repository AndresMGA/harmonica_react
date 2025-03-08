// IndexedDB utility functions to handle data storage and retrieval

const DB_NAME = "audioFilesDB";
const STORE_NAME = "mp3Files";
const DB_VERSION = 1;

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "fileName" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Failed to open IndexedDB.");
  });
};

// Store file in IndexedDB
const storeFile = (fileName, fileData) => {
  return openDatabase().then((db) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    store.put({ fileName, fileData });

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject("Failed to store file.");
    });
  });
};

// Retrieve file from IndexedDB
const getFile = (fileName) => {
  return openDatabase().then((db) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(fileName);

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result ? request.result.fileData : null);
      request.onerror = () => reject("Failed to retrieve file.");
    });
  });
};

export { storeFile, getFile };
