// ─── IndexedDB Image Storage ─────────────────────────────────────────────────
// Stores image blobs in IndexedDB (no size limit) so admin-uploaded images
// survive page refreshes and browser restarts indefinitely.

const DB_NAME = 'morya_images';
const STORE_NAME = 'images';
const DB_VERSION = 1;
const IMG_KEY_PREFIX = 'idb://';

let db: IDBDatabase | null = null;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (db) { resolve(db); return; }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME);
    };
    req.onsuccess = () => { db = req.result; resolve(db); };
    req.onerror = () => reject(req.error);
  });
}

/** Save a File/Blob to IndexedDB, returns an `idb://<key>` reference string */
export async function saveImageToIDB(file: File): Promise<string> {
  const key = `img_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(file, key);
    tx.oncomplete = () => resolve(`${IMG_KEY_PREFIX}${key}`);
    tx.onerror = () => reject(tx.error);
  });
}

/** Resolve an `idb://<key>` reference to a blob: URL, or return the URL as-is */
export async function resolveImageUrl(urlOrKey: string): Promise<string> {
  if (!urlOrKey.startsWith(IMG_KEY_PREFIX)) return urlOrKey;
  const key = urlOrKey.slice(IMG_KEY_PREFIX.length);
  try {
    const database = await openDB();
    return new Promise((resolve) => {
      const tx = database.transaction(STORE_NAME, 'readonly');
      const req = tx.objectStore(STORE_NAME).get(key);
      req.onsuccess = () => {
        if (req.result) {
          resolve(URL.createObjectURL(req.result));
        } else {
          resolve('/ganesh-hero.png'); // fallback if blob missing
        }
      };
      req.onerror = () => resolve('/ganesh-hero.png');
    });
  } catch {
    return '/ganesh-hero.png';
  }
}

/** Delete an image from IndexedDB */
export async function deleteImageFromIDB(urlOrKey: string): Promise<void> {
  if (!urlOrKey.startsWith(IMG_KEY_PREFIX)) return;
  const key = urlOrKey.slice(IMG_KEY_PREFIX.length);
  try {
    const database = await openDB();
    const tx = database.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
  } catch { /* ignore */ }
}

/** Check if a string is an IndexedDB key reference */
export function isIDBKey(url: string): boolean {
  return url.startsWith(IMG_KEY_PREFIX);
}
