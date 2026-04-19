/**
 * Family Health Profiles — one account, entire family's data.
 * localStorage-backed, designed to swap to Firestore later.
 */

export interface FamilyMember {
    id: string;
    name: string;
    relation: "self" | "spouse" | "child" | "parent" | "sibling" | "other";
    age?: number;
    gender?: string;
    phone?: string;
    preExisting?: string;
    bloodGroup?: string;
    allergies?: string;
}

export interface FamilyProfile {
    ownerId: string; // user email or id
    members: FamilyMember[];
}

const KEY = "nivaranai.family.v1";
const EVENT = "nivaranai:family";

export function loadFamily(ownerId: string): FamilyMember[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(KEY);
        if (!raw) return [];
        const all = JSON.parse(raw) as FamilyProfile[];
        return all.find((f) => f.ownerId === ownerId)?.members ?? [];
    } catch {
        return [];
    }
}

export function saveFamily(ownerId: string, members: FamilyMember[]) {
    if (typeof window === "undefined") return;
    let all: FamilyProfile[] = [];
    try {
        const raw = window.localStorage.getItem(KEY);
        if (raw) all = JSON.parse(raw);
    } catch { /* ignore */ }
    const idx = all.findIndex((f) => f.ownerId === ownerId);
    if (idx >= 0) all[idx].members = members;
    else all.push({ ownerId, members });
    window.localStorage.setItem(KEY, JSON.stringify(all));
    window.dispatchEvent(new CustomEvent(EVENT, { detail: members }));
}

export function addFamilyMember(ownerId: string, member: Omit<FamilyMember, "id">): FamilyMember {
    const members = loadFamily(ownerId);
    const newMember: FamilyMember = { ...member, id: crypto.randomUUID() };
    saveFamily(ownerId, [...members, newMember]);
    return newMember;
}

export function removeFamilyMember(ownerId: string, memberId: string) {
    const members = loadFamily(ownerId).filter((m) => m.id !== memberId);
    saveFamily(ownerId, members);
}
