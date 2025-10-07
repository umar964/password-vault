'use client';
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6"> Password Vault</h1>
      <div className="flex gap-4">
        <Link href="/signup" className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Signup</Link>
        <Link href="/login" className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">Login</Link>
      </div>
    </div>
  );
}
