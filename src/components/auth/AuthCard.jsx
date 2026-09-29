import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCard() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-neutral-100 px-4 selection:bg-neutral-900 selection:text-white">
      <div className="relative w-full max-w-md">
        {/* Top Dotted Grid Line */}
        <div
          className="pointer-events-none absolute top-0 z-30"
          style={{
            left: "calc(80px / 2 * -1)",
            width: "calc(100% + 80px)",
            height: "1px",
            backgroundImage:
              "linear-gradient(to right, #a3a3a3, #a3a3a3 50%, transparent 0, transparent)",
            backgroundSize: "5px 1px",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 25px, black calc(100% - 25px), transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 25px, black calc(100% - 25px), transparent)",
          }}
        />

        {/* Bottom Dotted Grid Line */}
        <div
          className="pointer-events-none absolute bottom-0 z-30"
          style={{
            left: "calc(80px / 2 * -1)",
            width: "calc(100% + 80px)",
            height: "1px",
            backgroundImage:
              "linear-gradient(to right, #a3a3a3, #a3a3a3 50%, transparent 0, transparent)",
            backgroundSize: "5px 1px",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 25px, black calc(100% - 25px), transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 25px, black calc(100% - 25px), transparent)",
          }}
        />

        {/* Left Dotted Grid Line */}
        <div
          className="pointer-events-none absolute left-0 z-30"
          style={{
            top: "calc(80px / 2 * -1)",
            height: "calc(100% + 80px)",
            width: "1px",
            backgroundImage:
              "linear-gradient(to bottom, #a3a3a3, #a3a3a3 50%, transparent 0, transparent)",
            backgroundSize: "1px 5px",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 25px, black calc(100% - 25px), transparent)",
            maskImage:
              "linear-gradient(to bottom, transparent, black 25px, black calc(100% - 25px), transparent)",
          }}
        />

        {/* Right Dotted Grid Line */}
        <div
          className="pointer-events-none absolute right-0 z-30"
          style={{
            top: "calc(80px / 2 * -1)",
            height: "calc(100% + 80px)",
            width: "1px",
            backgroundImage:
              "linear-gradient(to bottom, #a3a3a3, #a3a3a3 50%, transparent 0, transparent)",
            backgroundSize: "1px 5px",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 25px, black calc(100% - 25px), transparent)",
            maskImage:
              "linear-gradient(to bottom, transparent, black 25px, black calc(100% - 25px), transparent)",
          }}
        />

        {/* Form Body */}
        <div className="w-full px-8 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col items-center gap-6">
            {/* Quantum Bank Brand */}
            <a href="#" className="flex items-center justify-center gap-2">
              <svg
                viewBox="0 0 48 48"
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 3L41.5 13.5V34.5L24 45L6.5 34.5V13.5L24 3Z"
                  fill="#14b8a6"
                />

                <path
                  d="M24 10L35.5 17V31L24 38L12.5 31V17L24 10Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />

                <circle cx="24" cy="24" r="4" fill="white" />
              </svg>

              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight text-neutral-900">
                  Quantum
                </span>

                <span className="text-2xl font-light tracking-tight text-neutral-500">
                  Bank
                </span>
              </div>
            </a>

            {/* Auth Form */}
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col gap-4"
            >
              {/* Name */}
              {isSignUp && (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Full Name
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    placeholder="Rohith Naidu"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border-0 bg-white px-4 py-2.5 text-neutral-900 shadow-sm ring-1 ring-black/10 transition-all duration-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                  />
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-neutral-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border-0 bg-white px-4 py-2.5 text-neutral-900 shadow-sm ring-1 ring-black/10 transition-all duration-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-neutral-700"
                  >
                    Password
                  </label>

                  {!isSignUp && (
                    <a
                      href="#"
                      className="text-xs text-neutral-400 transition-colors hover:text-neutral-700"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>

                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border-0 bg-white px-4 py-2.5 text-neutral-900 shadow-sm ring-1 ring-black/10 transition-all duration-200 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-2 w-full cursor-pointer rounded-xl bg-gradient-to-b from-neutral-700 to-neutral-950 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-black/40 active:scale-[0.99]"
                style={{
                  boxShadow:
                    "0 4px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                {isSignUp ? "Sign up" : "Sign in"}
              </button>
            </form>

            {/* Toggle */}
            <div className="text-center text-xs text-neutral-500">
              <span>
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </span>

              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-1 font-semibold text-neutral-900 hover:underline"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
