import React from "react";
import illustration from "./illustration.png";
import logo from "./logo.png";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen relative overflow-hidden">
      {/* LEFT SECTION */}
      <div
        className="hidden md:flex md:w-1/2 relative"
        style={{
          background: "linear-gradient(to right, #ffeb9c, #eba378, #ff6b35)",
        }}
      >
        {/* Logo in top-left */}
        <img
          src={logo}
          alt="Logo"
          className="absolute top-4 left-4 w-41 h-auto z-20"
        />

        {/* Illustration anchored to bottom-left */}
        <img
          src={illustration}
          alt="Intelliclaim illustration"
          className="absolute bottom-0 left-0 w-[80%] h-auto z-10 object-contain"
        />
      </div>

      {/* RIGHT SECTION (FORM) */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 relative z-10">
        {/* Glow behind form */}
        <div className="absolute w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(255,107,53,0.25)_0%,_transparent_70%)] blur-3xl rounded-full z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" />



      {/* Clouds with orange glow */}
      <div className="absolute top-20 left-1/4 opacity-20 animate-float cloud-glow">
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
          <path d="M10 40C10 29 19 20 30 20C41 20 50 29 50 40H90C101 40 110 31 110 20C110 9 101 0 90 0H30C13.4 0 0 13.4 0 30V40H10Z" fill="#CCCCCC" />
        </svg>
      </div>

      <div className="absolute top-40 right-1/4 opacity-30 animate-float animation-delay-1000 cloud-glow">
        <svg width="160" height="80" viewBox="0 0 160 80" fill="none">
          <path d="M20 60C20 45 32 35 48 35C64 35 75 45 75 60H120C135 60 148 48 148 35C148 20 135 10 120 10H48C25 10 10 25 10 45V60H20Z" fill="#DDDDDD" />
        </svg>
      </div>

      <div className="absolute left-20 right-1/4 opacity-30 animate-float animation-delay-1000 cloud-glow">
        <svg width="120" height="80" viewBox="0 0 160 80" fill="none">
          <path d="M20 60C20 45 32 35 48 35C64 35 75 45 75 60H120C135 60 148 48 148 35C148 20 135 10 120 10H48C25 10 10 25 10 45V60H20Z" fill="#DDDDDD" />
        </svg>
      </div>

        {/* Form Content */}
        <div className="w-full max-w-md z-10">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
