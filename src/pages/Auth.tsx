import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Embers from "../components/Embers";
import { EASE } from "../lib/motion";
import { Logo, IconCheck, IconArrow } from "../lib/icons";

/* ---------------- flowing paths backdrop ---------------- */
function FloatingPaths({ position }: { position: number }) {
  const reduce = useReducedMotion();
  const paths = useMemo(
    () =>
      Array.from({ length: 52 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${
          189 + i * 6
        } -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${
          616 - i * 5 * position
        } ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${
          875 - i * 6
        }`,
        width: 0.22 + i * 0.009,
        dur: 60 + ((i * 7919) % 50),
        delay: -((i * 137) % 60),
      })),
    [position]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="h-full w-full text-amber-500" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        <title>Flowing light paths</title>
        {paths.map((p) => (
          <motion.path
            key={p.id}
            d={p.d}
            stroke="currentColor"
            strokeWidth={p.width}
            initial={reduce ? { pathLength: 1, opacity: 0.25 } : { pathLength: 0.3, opacity: 0.5 }}
            animate={
              reduce
                ? {}
                : {
                    pathLength: 1,
                    opacity: [0.2, 0.5, 0.2],
                    pathOffset: [0, 1, 0],
                  }
            }
            transition={
              reduce
                ? undefined
                : {
                    duration: p.dur,
                    delay: p.delay,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }
            }
          />
        ))}
      </svg>
    </div>
  );
}

const GoogleIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
    />
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09A7.2 7.2 0 0 1 5.47 12c0-.73.13-1.43.37-2.09L2.18 7.07A11.97 11.97 0 0 0 1 12c0 1.94.47 3.76 1.18 5.42l3.66-3.33Z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.86-3c-1.01.68-2.3 1.08-3.42 1.08-2.86 0-5.29-1.93-6.16-4.53l-3.66 3.33C3.99 20.53 7.7 23 12 23Z"
    />
  </svg>
);

const EyeIcon = ({ off }: { off?: boolean }) => (
  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {off ? (
      <>
        <path d="M3 3l18 18" />
        <path d="M10.6 5.1A9.8 9.8 0 0 1 12 5c5 0 8.6 3.6 10 7-.5 1.2-1.3 2.4-2.3 3.4M6.6 6.6C4.3 8 2.7 10 2 12c1.4 3.4 5 7 10 7 1.6 0 3-.3 4.3-.9" />
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
      </>
    ) : (
      <>
        <path d="M2 12c1.4-3.4 5-7 10-7s8.6 3.6 10 7c-1.4 3.4-5 7-10 7s-8.6-3.6-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    )}
  </svg>
);

const inputCls =
  "w-full rounded-xl border border-white/10 bg-char-950/[0.35] py-3.5 pl-4 pr-11 text-[0.95rem] text-zinc-100 placeholder:text-zinc-600 transition-all duration-300 hover:border-white/20 focus:border-amber-400/60 focus:bg-char-950/[0.5]";

const field = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.06 * i, ease: EASE as unknown as number[] },
  }),
};

const QUOTES = [
  "Zyntai paid for itself in a weekend. The AI answers before I even see the question.",
  "I stopped chasing follow-ups and started seeing the orders come back. That changed everything.",
  "The setup felt simple, but the lift in response time felt like hiring another person.",
  "Our team got the hours back to focus on customers instead of repeating the same answers.",
];

export default function Auth({ mode }: { mode: "login" | "signup" }) {
  const reduce = useReducedMotion();
  const signup = mode === "signup";
  const [showPw, setShowPw] = useState(false);
  const [done, setDone] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [form, setForm] = useState({ name: "", business: "", email: "", password: "" });

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => setQuoteIndex((index) => (index + 1) % QUOTES.length), 5200);
    return () => window.clearInterval(timer);
  }, [reduce]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.email.includes("@") || form.password.length < 6) {
      setError("Enter a valid email and a password of at least 6 characters.");
      return;
    }
    if (signup && (!form.name.trim() || !agree)) {
      setError("Please add your name and accept the terms to continue.");
      return;
    }
    setError("");
    setDone(true);
  };

  return (
    <main className="relative grid h-[100svh] min-h-[100svh] overflow-hidden lg:grid-cols-2">
      {/* ---------- left: paths + quote ---------- */}
      <div className="relative hidden overflow-hidden border-r border-white/[0.06] bg-char-900/40 lg:flex lg:flex-col lg:p-8 xl:p-10">
        <div className="absolute inset-0">
          <FloatingPaths position={1} />
          <FloatingPaths position={-1} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-char-950 via-transparent to-char-950/40" />

        <Link to="/" className="relative z-10 w-fit transition-opacity hover:opacity-80">
          <Logo />
        </Link>

        <div className="relative z-10 mt-auto">
          <motion.blockquote
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: EASE as unknown as number[] }}
            className="max-w-md"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={quoteIndex}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: EASE as unknown as number[] }}
                className="font-accent text-2xl italic leading-snug text-zinc-100 xl:text-3xl"
              >
                “{QUOTES[quoteIndex]}”
              </motion.p>
            </AnimatePresence>
            <footer className="mt-6 flex items-center gap-3.5">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-[0.78rem] font-bold text-(--zy-amber-ink) shadow-[0_0_26px_rgba(245,158,11,0.4)]">
                RH
              </span>
              <div>
                <p className="font-display text-[0.95rem] font-bold text-zinc-100">Redoyanul Haque</p>
                <p className="text-[0.78rem] text-zinc-500">Founder · Drift & Co.</p>
              </div>
            </footer>
          </motion.blockquote>

          <div className="mt-10 flex items-center gap-6 text-[0.78rem] font-medium text-zinc-500">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" /> 12,000+ businesses
            </span>
            <span>★ 4.9 average rating</span>
          </div>
        </div>
      </div>

      {/* ---------- right: form ---------- */}
      <div className="relative flex h-[100svh] min-h-0 flex-col justify-center p-4 sm:p-6 lg:p-8">
        <div className="absolute inset-0 grid-lines [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" />
        <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.14),transparent)] blur-2xl" />
        <div className="absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-orange-500/[0.07] blur-3xl" />
        <Embers />

        <Link
          to="/"
          className="group absolute left-4 top-4 z-10 flex w-fit items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[0.8rem] font-medium text-zinc-400 backdrop-blur-md transition-all hover:border-amber-400/40 hover:text-amber-300 sm:left-6 sm:top-6 lg:left-8 lg:top-7"
        >
          <IconArrow className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-0.5" />
          Back home
        </Link>

        <div className="relative z-10 mx-auto w-full max-w-md">
          <div className="mb-5 lg:hidden">
            <Logo />
          </div>

          {/* segmented mode switch */}
          <div className="glass relative mx-auto mb-5 grid w-fit grid-cols-2 rounded-full p-1.5">
            <motion.span
              aria-hidden="true"
              animate={{ x: signup ? "100%" : 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-gradient-to-b from-amber-300 to-amber-500"
            />
            <Link
              to="/login"
              className={`relative z-10 rounded-full px-7 py-2 text-[0.88rem] font-semibold transition-colors ${
                !signup ? "text-(--zy-amber-ink)" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={`relative z-10 rounded-full px-7 py-2 text-[0.88rem] font-semibold transition-colors ${
                signup ? "text-(--zy-amber-ink)" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Sign up
            </Link>
          </div>

          <div className="liquid-glass mx-auto w-[84%] max-w-[24rem] rounded-[1.35rem] p-5 sm:p-6">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE as unknown as number[] }}
                  className="flex flex-col items-center py-8 text-center"
                >
                  <motion.span
                    initial={{ scale: 0, rotate: -40 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.08 }}
                    className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-orange-500 text-(--zy-amber-ink) shadow-[0_0_44px_rgba(245,158,11,0.45)]"
                  >
                    <IconCheck className="h-8 w-8" />
                  </motion.span>
                  <h1 className="font-display mt-6 text-2xl font-bold text-zinc-50">
                    {signup ? "Welcome to Zyntai!" : "Welcome back!"}
                  </h1>
                  <p className="mt-2.5 max-w-xs text-[0.94rem] leading-relaxed text-zinc-400">
                    {signup
                      ? "Your workspace is being prepared. This is a design preview — authentication ships with the product."
                      : "You're signed in. This is a design preview — authentication ships with the product."}
                  </p>
                  <Link to="/" className="btn btn-primary group mt-7 px-6 py-3 text-[0.9rem]">
                    Back to home
                    <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key={mode}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE as unknown as number[] }}
                >
                  <h1 className="font-display text-[1.9rem] font-bold tracking-tight text-zinc-50 sm:text-[2.1rem]">
                    {signup ? (
                      <>Create your <em className="font-accent font-normal italic text-amber-300">account.</em></>
                    ) : (
                      <>Welcome <em className="font-accent font-normal italic text-amber-300">back.</em></>
                    )}
                  </h1>
                  <p className="mt-2 text-[0.95rem] text-zinc-400">
                    {signup
                      ? "Start your 14-day free trial. No credit card required."
                      : "Log in to your orders, automations and analytics."}
                  </p>

                  <motion.button
                    type="button"
                    onClick={() => setDone(true)}
                    whileHover={reduce ? undefined : { scale: 1.015 }}
                    whileTap={reduce ? undefined : { scale: 0.985 }}
                    className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.06] py-3 text-[0.95rem] font-semibold text-zinc-100 backdrop-blur-md transition-colors hover:border-amber-400/40 hover:bg-white/[0.1]"
                  >
                    <GoogleIcon className="h-4.5 w-4.5" />
                    Continue with Google
                  </motion.button>

                  <div className="my-4 flex items-center gap-3">
                    <span className="h-px flex-1 bg-white/[0.08]" />
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-zinc-600">or with email</span>
                    <span className="h-px flex-1 bg-white/[0.08]" />
                  </div>

                  <form onSubmit={submit} className="space-y-3" noValidate>
                    <AnimatePresence initial={false}>
                      {signup && (
                        <motion.div
                          initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: EASE as unknown as number[] }}
                          className="space-y-3 overflow-hidden"
                        >
                          <motion.input
                            custom={0}
                            variants={field}
                            initial="hidden"
                            animate="show"
                            className={inputCls}
                            placeholder="Full name"
                            value={form.name}
                            onChange={set("name")}
                          />
                          <motion.input
                            custom={1}
                            variants={field}
                            initial="hidden"
                            animate="show"
                            className={inputCls}
                            placeholder="Business name"
                            value={form.business}
                            onChange={set("business")}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <input
                      type="email"
                      className={inputCls}
                      placeholder="you@business.com"
                      value={form.email}
                      onChange={set("email")}
                    />
                    <div className="relative">
                      <input
                        type={showPw ? "text" : "password"}
                        className={inputCls}
                        placeholder="Password"
                        value={form.password}
                        onChange={set("password")}
                      />
                      <button
                        type="button"
                        aria-label={showPw ? "Hide password" : "Show password"}
                        onClick={() => setShowPw((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 transition-colors hover:text-amber-300"
                      >
                        <EyeIcon off={showPw} />
                      </button>
                    </div>

                    {signup && (
                      <label className="flex cursor-pointer items-start gap-3 pt-1 text-[0.85rem] leading-relaxed text-zinc-400">
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={agree}
                          onClick={() => setAgree((v) => !v)}
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-all duration-300 ${
                            agree
                              ? "border-amber-400 bg-gradient-to-b from-amber-300 to-amber-500 text-(--zy-amber-ink)"
                              : "border-white/15 bg-transparent"
                          }`}
                        >
                          {agree && <IconCheck className="h-3 w-3" />}
                        </button>
                        <span onClick={() => setAgree((v) => !v)}>
                          I agree to the{" "}
                          <Link to="/terms" className="font-semibold text-amber-300 underline-offset-4 hover:underline">Terms of Service</Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="font-semibold text-amber-300 underline-offset-4 hover:underline">Privacy Policy</Link>.
                        </span>
                      </label>
                    )}

                    {!signup && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => setError("Password reset ships with the product — email hello@zyntai.app for now.")}
                          className="link-underline text-[0.84rem] font-medium text-zinc-400 hover:text-amber-300"
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-orange-400/30 bg-orange-400/[0.07] px-4 py-2.5 text-[0.82rem] font-medium text-orange-300"
                      >
                        {error}
                      </motion.p>
                    )}

                    <button type="submit" className="btn btn-primary group w-full py-3 text-[0.98rem]">
                      {signup ? "Start free" : "Log in"}
                      <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </form>

                  <p className="mt-4 text-center text-[0.84rem] text-zinc-500">
                    {signup ? "Already have an account?" : "Don't have an account?"}{" "}
                    <Link
                      to={signup ? "/login" : "/signup"}
                      className="font-semibold text-amber-300 underline-offset-4 hover:underline"
                    >
                      {signup ? "Log in" : "Sign up"}
                    </Link>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-3 flex justify-center gap-1.5" aria-label="Customer quotes">
            {QUOTES.map((quote, index) => (
              <span
                key={quote}
                className={`h-1 rounded-full transition-all duration-500 ${index === quoteIndex ? "w-6 bg-amber-300" : "w-1.5 bg-white/20"}`}
              />
            ))}
          </div>

          <p className="mt-4 text-center text-[0.72rem] text-zinc-600">
            Protected by 256-bit encryption · SOC 2 in progress
          </p>
        </div>
      </div>
    </main>
  );
}
