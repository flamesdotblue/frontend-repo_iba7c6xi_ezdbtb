import React, { useState } from 'react';
import { Lock, User, PlusCircle, Search } from 'lucide-react';

export default function Rooms() {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Design Team', users: 12, files: 44, protected: true },
    { id: 2, name: 'Client A Handover', users: 5, files: 18, protected: true },
  ]);
  const [filter, setFilter] = useState('');
  const [form, setForm] = useState({ room: '', username: '', password: '' });

  const addRoom = () => {
    if (!form.room) return;
    setRooms((prev) => [{ id: Date.now(), name: form.room, users: 1, files: 0, protected: !!form.password }, ...prev]);
    setForm({ room: '', username: '', password: '' });
  };

  const joinRoom = (r) => {
    alert(`Joining room: ${r.name} as ${form.username || 'guest'}`);
  };

  const filtered = rooms.filter((r) => r.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Rooms</h2>
            <div className="relative w-64">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search rooms..."
                className="w-full pl-9 pr-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.length === 0 && (
              <div className="col-span-2 text-center text-neutral-500 py-8 border rounded-lg">No rooms found</div>
            )}
            {filtered.map((r) => (
              <div key={r.id} className="border rounded-lg p-4 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-md bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-300">
                      <Lock size={18} />
                    </div>
                    <div>
                      <p className="font-medium">{r.name}</p>
                      <p className="text-xs text-neutral-500">{r.files} files • {r.users} users</p>
                    </div>
                  </div>
                  <button onClick={() => joinRoom(r)} className="px-3 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800">Join</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 border rounded-lg p-4 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800">
          <h3 className="font-semibold">Create / Access Room</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-neutral-500 mb-1">Room name</label>
              <input
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                className="w-full px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
                placeholder="e.g., Marketing"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-neutral-500 mb-1">Username</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
                    placeholder="john"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={addRoom} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm">
                <PlusCircle size={16} /> Create Room
              </button>
              <button onClick={() => alert('Access requested')} className="px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 text-sm">Access Room</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
