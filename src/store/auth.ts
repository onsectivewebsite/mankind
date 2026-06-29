"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = { id: string; name: string; email: string };

type StoredUser = User & { pass: string };

type AuthResult = { ok: boolean; error?: string };

type AuthState = {
  users: StoredUser[];
  currentUserId: string | null;
  _hydrated: boolean;
  register: (input: { name: string; email: string; password: string }) => AuthResult;
  login: (email: string, password: string) => AuthResult;
  logout: () => void;
  setHydrated: () => void;
};

/**
 * NOTE: This is a front-end demo. Credentials live in the browser's
 * localStorage with only a trivial obfuscation hash — it is NOT secure
 * and must be replaced with a real backend before production use.
 */
function hash(s: string): string {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (Math.imul(33, h) + s.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

let seq = 0;
const newId = () => `u-${Date.now().toString(36)}-${(seq += 1)}`;

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUserId: null,
      _hydrated: false,

      register: ({ name, email, password }) => {
        const e = email.trim().toLowerCase();
        if (!name.trim()) return { ok: false, error: "Please enter your name" };
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) return { ok: false, error: "Enter a valid email" };
        if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters" };
        if (get().users.some((u) => u.email === e)) return { ok: false, error: "An account with this email already exists" };
        const user: StoredUser = { id: newId(), name: name.trim(), email: e, pass: hash(password) };
        set((s) => ({ users: [...s.users, user], currentUserId: user.id }));
        return { ok: true };
      },

      login: (email, password) => {
        const e = email.trim().toLowerCase();
        const u = get().users.find((x) => x.email === e);
        if (!u || u.pass !== hash(password)) return { ok: false, error: "Incorrect email or password" };
        set({ currentUserId: u.id });
        return { ok: true };
      },

      logout: () => set({ currentUserId: null }),
      setHydrated: () => set({ _hydrated: true }),
    }),
    {
      name: "mankind-auth-v1",
      partialize: (s) => ({ users: s.users, currentUserId: s.currentUserId }),
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);

export function useCurrentUser(): User | null {
  const users = useAuth((s) => s.users);
  const id = useAuth((s) => s.currentUserId);
  const u = users.find((x) => x.id === id);
  return u ? { id: u.id, name: u.name, email: u.email } : null;
}
