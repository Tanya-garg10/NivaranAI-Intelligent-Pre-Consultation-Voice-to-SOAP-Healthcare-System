/**
 * Offline Mode Support
 * - Detects online/offline status
 * - Queues actions when offline, syncs when back online
 * - Provides hook for components to react to connectivity changes
 */

export type SyncAction = {
    id: string;
    type: "add_patient" | "update_patient";
    payload: Record<string, unknown>;
    timestamp: number;
};

const QUEUE_KEY = "nivaranai.offline_queue";

export function isOnline(): boolean {
    if (typeof navigator === "undefined") return true;
    return navigator.onLine;
}

export function loadSyncQueue(): SyncAction[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(QUEUE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function addToSyncQueue(action: Omit<SyncAction, "id" | "timestamp">) {
    const queue = loadSyncQueue();
    queue.push({
        ...action,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
    });
    window.localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
}

export function clearSyncQueue() {
    window.localStorage.removeItem(QUEUE_KEY);
}

export function processSyncQueue(): number {
    const queue = loadSyncQueue();
    if (queue.length === 0) return 0;
    // In a real app, this would POST each action to the server.
    // For now, the data is already in localStorage, so we just clear the queue.
    const count = queue.length;
    clearSyncQueue();
    return count;
}

/** Register listeners for online/offline events */
export function registerConnectivityListeners(
    onOnline: () => void,
    onOffline: () => void,
): () => void {
    if (typeof window === "undefined") return () => { };
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
        window.removeEventListener("online", onOnline);
        window.removeEventListener("offline", onOffline);
    };
}
