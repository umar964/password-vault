'use client';
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://password-vault-3.onrender.com/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      router.push("/vault");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
  <h1 className="text-3xl font-bold mb-4">Login</h1>

  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={e => setEmail(e.target.value)}
    className="p-2 mb-2 rounded bg-gray-800 text-white border border-gray-600 focus:border-green-500 focus:outline-none w-full max-w-sm"
  />

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={e => setPassword(e.target.value)}
    className="p-2 mb-4 rounded bg-gray-800 text-white border border-gray-600 focus:border-green-500 focus:outline-none w-full max-w-sm"
  />

  <button
    onClick={handleLogin}
    className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
  >
    Login
  </button>
</div>

  );
}
