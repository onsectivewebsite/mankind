"use client";

import { useEffect, useRef, useState } from "react";
import { X, Eye, EyeOff, Mail, Lock, User as UserIcon, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/store/auth";

type Mode = "login" | "register";

export function AuthModal({
  open,
  onClose,
  initialMode = "login",
}: {
  open: boolean;
  onClose: () => void;
  initialMode?: Mode;
}) {
  const register = useAuth((s) => s.register);
  const login = useAuth((s) => s.login);
  const [mode, setMode] = useState<Mode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);
  const firstRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setError("");
      setOk(false);
      window.setTimeout(() => firstRef.current?.focus(), 50);
    }
  }, [open, initialMode]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = mode === "register"
      ? register({ name, email, password })
      : login(email, password);
    if (!res.ok) {
      setError(res.error ?? "Something went wrong");
      return;
    }
    setOk(true);
    window.setTimeout(() => {
      onClose();
      setName(""); setEmail(""); setPassword("");
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
      <button aria-label="Close" onClick={onClose} className="animate-backdrop absolute inset-0 bg-ink/60 backdrop-blur-sm" />
      <div role="dialog" aria-modal="true" aria-labelledby="auth-title" className="animate-pop relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl bg-surface shadow-[var(--shadow-lift)]">
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-ink-3 hover:bg-muted">
          <X className="h-5 w-5" />
        </button>

        {/* header */}
        <div className="bg-gradient-to-br from-primary to-[#0d5a5e] px-7 pb-6 pt-8 text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <h2 id="auth-title" className="mt-3 font-display text-xl font-bold">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-1 text-sm text-white/85">
            {mode === "login" ? "Sign in to track orders and check out faster." : "Join Mankind Healthcare for faster checkout and order history."}
          </p>
        </div>

        {/* tabs */}
        <div className="flex gap-1 border-b border-line px-7 pt-3">
          {(["login", "register"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className={`relative px-3 py-2.5 text-sm font-semibold transition-colors ${mode === m ? "text-primary" : "text-ink-3 hover:text-ink-2"}`}
            >
              {m === "login" ? "Sign in" : "Create account"}
              {mode === m ? <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" /> : null}
            </button>
          ))}
        </div>

        {ok ? (
          <div className="flex flex-col items-center gap-2 px-7 py-10 text-center">
            <CheckCircle2 className="h-10 w-10 text-success" />
            <p className="font-display text-lg font-bold text-ink">
              {mode === "register" ? "Account created!" : "Signed in!"}
            </p>
            <p className="text-sm text-ink-3">Welcome to Mankind Healthcare.</p>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="space-y-4 px-7 py-6">
            {mode === "register" ? (
              <Field icon={UserIcon} label="Full name">
                <input ref={firstRef} className="field pl-10" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" autoComplete="name" />
              </Field>
            ) : null}
            <Field icon={Mail} label="Email">
              <input ref={mode === "login" ? firstRef : undefined} type="email" className="field pl-10" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@clinic.com" autoComplete="email" />
            </Field>
            <Field icon={Lock} label="Password">
              <input type={show ? "text" : "password"} className="field pl-10 pr-11" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={mode === "register" ? "At least 6 characters" : "Your password"} autoComplete={mode === "register" ? "new-password" : "current-password"} />
              <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-3 top-[2.05rem] text-ink-3 hover:text-ink-2">
                {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </Field>

            {error ? <p role="alert" className="rounded-lg bg-[#fdecea] px-3 py-2 text-sm font-medium text-[#b23b38]">{error}</p> : null}

            <button type="submit" className="btn btn-primary w-full">
              {mode === "login" ? "Sign in" : "Create account"}
            </button>

            <p className="text-center text-sm text-ink-3">
              {mode === "login" ? "New to Mankind? " : "Already have an account? "}
              <button type="button" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }} className="font-semibold text-primary hover:underline">
                {mode === "login" ? "Create an account" : "Sign in"}
              </button>
            </p>
            <p className="text-center text-[11px] text-ink-3">Demo only — accounts are stored locally in your browser.</p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <label className="relative block">
      <span className="mb-1.5 block text-sm font-medium text-ink-2">{label}</span>
      <Icon className="pointer-events-none absolute left-3 top-[2.05rem] h-5 w-5 text-ink-3" />
      {children}
    </label>
  );
}
