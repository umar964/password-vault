'use client';

import { useState } from "react";
import PasswordGenerator from "./passwordGenerator";
import { encrypt, decrypt } from "../utils/crypto";

export default function VaultItemCard({ item, cryptoKey, onDelete, onUpdate }: any) {
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editItem, setEditItem] = useState({
    title: item.title,
    username: item.username,
    password: decrypt(item.password, cryptoKey),
    url: item.url,
    notes: item.notes
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 15000);
  };

  const handleSave = () => {
    onUpdate(item._id, { ...editItem, password: encrypt(editItem.password, cryptoKey) });
    setEditing(false);
  };

  if (editing) {
    return (
       <div className="p-4 bg-gray-700 rounded space-y-2">
  <PasswordGenerator setPassword={p => setEditItem({ ...editItem, password: p })} />

  <input
    className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:border-green-500 focus:outline-none w-80 mr-4"
    value={editItem.title}
    onChange={e => setEditItem({ ...editItem, title: e.target.value })}
    placeholder="Title"
  />

  <input
    className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:border-green-500 focus:outline-none w-80 mr-4"
    value={editItem.username}
    onChange={e => setEditItem({ ...editItem, username: e.target.value })}
    placeholder="Username"
  />

  <input
    className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:border-green-500 focus:outline-none w-80 mr-4"
    value={editItem.url}
    onChange={e => setEditItem({ ...editItem, url: e.target.value })}
    placeholder="URL"
  />

  <input
    className="p-2 rounded bg-gray-800 text-white border border-gray-600 focus:border-green-500 focus:outline-none w-80 mr-4"
    value={editItem.notes}
    onChange={e => setEditItem({ ...editItem, notes: e.target.value })}
    placeholder="Notes"
  />

  <div className="flex gap-2">
    <button onClick={handleSave} className="px-2 py-1 bg-green-600 rounded hover:bg-green-700">Save</button>
    <button onClick={() => setEditing(false)} className="px-2 py-1 bg-gray-600 rounded hover:bg-gray-700">Cancel</button>
  </div>
</div>

    );
  }

  return (
    <div className="p-4 bg-gray-800 rounded space-y-1">
      <h2 className="font-bold">{item.title}</h2>
      <p>Username: {item.username}</p>
      <p>Password: {decrypt(item.password, cryptoKey)}</p>
      <p>URL: {item.url}</p>
      <p>Notes: {item.notes}</p>
      <div className="flex gap-2">
        <button onClick={() => handleCopy(decrypt(item.password, cryptoKey))} className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700">
          {copied ? "Copied!" : "Copy Password"}
        </button>
        <button onClick={() => onDelete(item._id)} className="px-2 py-1 bg-red-600 rounded hover:bg-red-700">Delete</button>
        <button onClick={() => setEditing(true)} className="px-2 py-1 bg-yellow-500 rounded hover:bg-yellow-600">Edit</button>
      </div>
    </div>
  );
}

