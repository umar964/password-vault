import { useState } from "react";

const chars = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number: "0123456789",
  symbol: "!@#$%^&*()_+-=[]{}|;:,.<>/?",
};

export default function PasswordGenerator({
  setPassword,
}: {
  setPassword: (p: string) => void;
}) {
  const [length, setLength] = useState(12);
  const [useNumber, setUseNumber] = useState(true);
  const [useSymbol, setUseSymbol] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");  

  const generate = () => {
    let charset = chars.lower + chars.upper;
    if (useNumber) charset += chars.number;
    if (useSymbol) charset += chars.symbol;

    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(password);
    setGeneratedPassword(password);  
  };

  return (
    <div className="generator flex flex-col gap-3 p-4 bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2 text-center">Password Generator</h2>

      <label className="flex justify-between">
        Length: <span>{length}</span>
      </label>
      <input
        type="range"
        min={8}
        max={24}
        value={length}
        onChange={(e) => setLength(+e.target.value)}
        className="w-full cursor-pointer"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={useNumber}
          onChange={() => setUseNumber(!useNumber)}
        />
        Include Numbers
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={useSymbol}
          onChange={() => setUseSymbol(!useSymbol)}
        />
        Include Symbols
      </label>

      {generatedPassword && (
        <div className="mt-4 p-2 bg-gray-700 rounded text-center text-lg font-mono select-all">
          {generatedPassword}
        </div>
      )}

      <button
        onClick={generate}
        className="mt-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
      >
        Generate Password
      </button>

      
       
    </div>
  );
}

