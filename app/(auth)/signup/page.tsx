"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Droplets, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { useTelemetry } from "@/components/providers/TelemetryProvider";

export default function SignupPage() {
  const router = useRouter();
  const { setUserRole } = useTelemetry();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Get existing users
      const usersJson = localStorage.getItem("floodeye_users");
      const users = usersJson ? JSON.parse(usersJson) : [];

      // Check if email already exists
      if (users.some((u: any) => u.email === email)) {
        setError("An account with this email already exists.");
        return;
      }

      // Add new user
      const newUser = { name, email, password, role: "user" };
      users.push(newUser);
      localStorage.setItem("floodeye_users", JSON.stringify(users));

      setSuccess(true);
      
      // Auto login and redirect after a short delay
      setTimeout(() => {
        setUserRole("user");
        router.push("/dashboard");
      }, 1500);
      
    } catch (err) {
      setError("An error occurred during sign up.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
            <Droplets className="w-6 h-6" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Join FloodEye to start monitoring.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 border border-slate-200 sm:rounded-3xl sm:px-10">
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Account Created!</h3>
              <p className="text-slate-600">Logging you in automatically...</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-slate-50 transition-shadow"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-slate-50 transition-shadow"
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium leading-6 text-slate-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 bg-slate-50 transition-shadow"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Create Account
                </button>
              </div>
              
            </form>
          )}

          {!success && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-slate-500">Already have an account?</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/login"
                  className="flex w-full justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors"
                >
                  Sign in instead
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
