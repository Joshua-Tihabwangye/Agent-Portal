export type VehicleDocumentType =
  | "logbook"
  | "registration"
  | "insurance"
  | "roadworthiness"
  | "other";

export type VehicleDocumentStatus = "uploaded" | "verified" | "expired";

export interface VehicleDocumentRecord {
  id: string;
  vehicleId: string;
  driverId?: string;
  documentType: VehicleDocumentType;
  documentName: string;
  mimeType: string;
  size: number;
  expiryDate: string | null;
  status: VehicleDocumentStatus;
  uploadedAt: string;
  updatedAt: string;
  blob: Blob;
}

export interface VehicleDocumentSummary {
  requiredTypes: VehicleDocumentType[];
  missingTypes: VehicleDocumentType[];
  uploadedCount: number;
  isComplete: boolean;
}

export const REQUIRED_VEHICLE_DOCUMENT_TYPES: VehicleDocumentType[] = [
  "logbook",
  "registration",
  "insurance",
  "roadworthiness",
];

export const VEHICLE_DOCUMENT_LABELS: Record<VehicleDocumentType, string> = {
  logbook: "Vehicle logbook / ownership",
  registration: "Vehicle registration / road license",
  insurance: "Insurance",
  roadworthiness: "Roadworthiness",
  other: "Other document",
};

const DB_NAME = "evzone_vehicle_documents_db";
const DB_VERSION = 1;
const STORE_NAME = "vehicle_documents";

type StoredVehicleDocumentRecord = VehicleDocumentRecord;

let dbPromise: Promise<IDBDatabase> | null = null;

function nowIso(): string {
  return new Date().toISOString();
}

function makeId(vehicleId: string, documentType: VehicleDocumentType): string {
  return `${vehicleId}:${documentType}`;
}

function isExpired(expiryDate: string | null): boolean {
  if (!expiryDate) return false;
  const expiry = new Date(`${expiryDate}T23:59:59.999`);
  if (Number.isNaN(expiry.getTime())) return false;
  return expiry.getTime() < Date.now();
}

function getDatabase(): Promise<IDBDatabase> {
  if (typeof window === "undefined" || !window.indexedDB) {
    return Promise.reject(new Error("IndexedDB is not available in this environment."));
  }

  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
          store.createIndex("byVehicleId", "vehicleId", { unique: false });
          store.createIndex("byVehicleIdAndType", ["vehicleId", "documentType"], {
            unique: true,
          });
        }
      };

      request.onsuccess = () => {
        const db = request.result;
        db.onversionchange = () => db.close();
        resolve(db);
      };

      request.onerror = () => {
        reject(request.error ?? new Error("Unable to open vehicle document storage."));
      };
    });
  }

  return dbPromise;
}

function requestToPromise<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed."));
  });
}

function transactionComplete(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error("IndexedDB transaction failed."));
    tx.onabort = () => reject(tx.error ?? new Error("IndexedDB transaction aborted."));
  });
}

async function readRecords(vehicleId: string): Promise<StoredVehicleDocumentRecord[]> {
  const db = await getDatabase();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const index = store.index("byVehicleId");
  const request = index.getAll(vehicleId);
  const records = await requestToPromise(request);
  return records.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getVehicleDocuments(
  vehicleId: string
): Promise<VehicleDocumentRecord[]> {
  try {
    return await readRecords(vehicleId);
  } catch (error) {
    console.error("[vehicle-documents] failed to read documents", {
      vehicleId,
      error,
    });
    throw error;
  }
}

export async function getVehicleDocumentSummary(
  vehicleId: string
): Promise<VehicleDocumentSummary> {
  const records = await getVehicleDocuments(vehicleId);
  const uploadedTypes = new Set(records.map((record) => record.documentType));
  const missingTypes = REQUIRED_VEHICLE_DOCUMENT_TYPES.filter(
    (type) => !uploadedTypes.has(type)
  );

  return {
    requiredTypes: REQUIRED_VEHICLE_DOCUMENT_TYPES,
    missingTypes,
    uploadedCount: records.filter(
      (record) => REQUIRED_VEHICLE_DOCUMENT_TYPES.includes(record.documentType)
    ).length,
    isComplete: missingTypes.length === 0,
  };
}

export async function saveVehicleDocument(
  record: Omit<VehicleDocumentRecord, "id" | "status" | "uploadedAt" | "updatedAt">
): Promise<VehicleDocumentRecord> {
  const stored: VehicleDocumentRecord = {
    ...record,
    id: makeId(record.vehicleId, record.documentType),
    status: isExpired(record.expiryDate) ? "expired" : "uploaded",
    uploadedAt: nowIso(),
    updatedAt: nowIso(),
  };

  try {
    const db = await getDatabase();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await requestToPromise(store.put(stored));
    await transactionComplete(tx);
    return stored;
  } catch (error) {
    console.error("[vehicle-documents] failed to save document", {
      vehicleId: record.vehicleId,
      documentType: record.documentType,
      error,
    });
    throw error;
  }
}

export async function uploadVehicleDocument(input: {
  vehicleId: string;
  driverId?: string;
  documentType: VehicleDocumentType;
  file: File;
  expiryDate?: string | null;
}): Promise<VehicleDocumentRecord> {
  console.info("[vehicle-documents] upload started", {
    vehicleId: input.vehicleId,
    driverId: input.driverId,
    documentType: input.documentType,
    fileName: input.file.name,
    size: input.file.size,
    mimeType: input.file.type,
  });

  const record = await saveVehicleDocument({
    vehicleId: input.vehicleId,
    driverId: input.driverId,
    documentType: input.documentType,
    documentName: input.file.name,
    mimeType: input.file.type || "application/octet-stream",
    size: input.file.size,
    expiryDate: input.expiryDate ?? null,
    blob: input.file,
  });

  console.info("[vehicle-documents] upload saved", {
    vehicleId: input.vehicleId,
    documentType: input.documentType,
    recordId: record.id,
  });

  return record;
}

export async function deleteVehicleDocument(
  vehicleId: string,
  documentType: VehicleDocumentType
): Promise<void> {
  try {
    const db = await getDatabase();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await requestToPromise(store.delete(makeId(vehicleId, documentType)));
    await transactionComplete(tx);
  } catch (error) {
    console.error("[vehicle-documents] failed to delete document", {
      vehicleId,
      documentType,
      error,
    });
    throw error;
  }
}

export function getVehicleDocumentLabel(
  documentType: VehicleDocumentType
): string {
  return VEHICLE_DOCUMENT_LABELS[documentType] ?? "Document";
}
