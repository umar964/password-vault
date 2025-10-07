 

'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import VaultItemCard from "../../components/VaultItemCard";
import PasswordGenerator from "../../components/passwordGenerator";
import { encrypt } from "../../utils/crypto";
import Link from "next/link";

export default function VaultPage() {
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({ title:"", username:"", password:"", url:"", notes:"" });
  const [token, setToken] = useState<string | null>(null);
  const cryptoKey = "supersecretkey";

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const fetchItems = () => {
    if (!token)return;
    axios.get("https://password-vault-3.onrender.com/api/vault", { headers:{ Authorization:`Bearer ${token}` }})
      .then(res => setItems(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => { 
    if(token) fetchItems(); 
  }, [token]);

  const handleAdd = () => {
    if (!token) return;
    const encryptedPassword = encrypt(newItem.password, cryptoKey);
    axios.post("https://password-vault-3.onrender.com/api/vault", 
      { ...newItem, password: encryptedPassword }, 
      { headers:{ Authorization:`Bearer ${token}` }})
    .then(() => { 
      setNewItem({title:"",username:"",password:"",url:"",notes:""}); 
      fetchItems(); 
    })
    .catch(err => console.log(err));
  };

  const handleDelete = (id: string) => {
    if (!token) return;
    axios.delete(`https://password-vault-3.onrender.com/api/vault/${id}`, { headers:{ Authorization:`Bearer ${token}` }})
      .then(() => fetchItems())
      .catch(err => console.log(err));
  };

  const handleUpdate = (id: string, updatedItem: any) => {
    if (!token) return;
    axios.put(`https://password-vault-3.onrender.com/api/vault/${id}`, updatedItem, { headers:{ Authorization:`Bearer ${token}` }})
      .then(() => fetchItems())
      .catch(err => console.log(err));
  };

  return (
    <div className="min-h-screen text-white p-8">
       

      <h1 className="text-3xl font-bold mb-6">Your Vault</h1>

      <div className="mb-6 p-4 bg-gray-800 rounded space-y-2">
        <input
  placeholder="Title"
  value={newItem.title}
  onChange={e => setNewItem({ ...newItem, title: e.target.value })}
  className="p-2 rounded w-80 mr-4 bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
/>

<input
  placeholder="Username"
  value={newItem.username}
  onChange={e => setNewItem({ ...newItem, username: e.target.value })}
  className="p-2 rounded w-80 bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
/>

<PasswordGenerator setPassword={(p) => setNewItem({ ...newItem, password: p })} />

<input
  placeholder="URL"
  value={newItem.url}
  onChange={e => setNewItem({ ...newItem, url: e.target.value })}
  className="p-2 rounded w-80 mr-4 bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
/>

<input
  placeholder="Notes"
  value={newItem.notes}
  onChange={e => setNewItem({ ...newItem, notes: e.target.value })}
  className="p-2 rounded mr-4 w-80 bg-gray-700 text-white border border-gray-600 focus:border-green-500 focus:outline-none"
/>

        <button onClick={handleAdd} className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">Add Item</button>
      </div>

      <div className="space-y-4">
        {items.map(item => (
          <VaultItemCard 
            key={item._id} 
            item={item} 
            cryptoKey={cryptoKey} 
            onDelete={handleDelete} 
            onUpdate={handleUpdate} 
          />
        ))}
      </div>
    </div>
  );
}
