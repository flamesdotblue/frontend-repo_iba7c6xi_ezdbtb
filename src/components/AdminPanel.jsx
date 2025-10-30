import React, { useMemo, useState } from 'react';
import { Shield, Users, Ban, AlertTriangle, HardDrive, Files, Server, Activity, Network, Mail, MessageCircle, LogOut, Eye, Trash2, Globe } from 'lucide-react';

function Card({ title, value, icon: Icon, accent = 'from-indigo-500 to-violet-500' }) {
  return (
    <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <div className={`w-10 h-10 rounded-md bg-gradient-to-tr ${accent} text-white flex items-center justify-center mb-3`}>
        <Icon size={18} />
      </div>
      <p className="text-xs text-neutral-500 uppercase tracking-wide">{title}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

export default function AdminPanel() {
  const [selected, setSelected] = useState([]);
  const [files] = useState([
    { id: 1, type: 'PDF', total: 120, used: '1.2 GB' },
    { id: 2, type: 'ZIP', total: 40, used: '9.0 GB' },
    { id: 3, type: 'IMG', total: 260, used: '3.8 GB' },
  ]);

  const [ips, setIps] = useState([
    { ip: '192.168.1.10', status: 'blocked' },
    { ip: '203.0.113.7', status: 'active' },
    { ip: '198.51.100.25', status: 'active' },
  ]);

  const [activeUsers, setActiveUsers] = useState([
    { ip: '203.0.113.7', location: 'New York, US', ua: 'Chrome on macOS', last: '2m ago', visits: 14 },
    { ip: '198.51.100.25', location: 'Berlin, DE', ua: 'Firefox on Linux', last: '5m ago', visits: 8 },
  ]);

  const [storage, setStorage] = useState({ free: 'Unlimited', used: '4 GB', home: '', room: '', set: '' });
  const [newIp, setNewIp] = useState('');

  const stats = useMemo(() => ([
    { title: 'Active Users', value: '5', icon: Users },
    { title: 'Blocked IPs', value: '1', icon: Ban },
    { title: 'Failed Logins', value: '24', icon: AlertTriangle },
    { title: 'Terminated Device', value: '54', icon: Shield },
    { title: 'Storage Used', value: '4 GB', icon: HardDrive },
    { title: 'Total Files', value: '44', icon: Files },
    { title: 'Total Rooms', value: '1', icon: Server },
    { title: 'Load Avg Server', value: '0.00', icon: Activity },
    { title: 'Storage Free', value: 'Unlimited', icon: HardDrive },
    { title: 'Network Down', value: '↓ 10.0 Mbps', icon: Network },
    { title: 'Network Up', value: '7.0 Mbps ↑', icon: Network },
  ]), []);

  const toggleSelect = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const deleteSelected = () => {
    alert(`Deleted ${selected.length} items`);
    setSelected([]);
  };

  const blockIp = () => {
    if (!newIp) return;
    setIps((prev) => [{ ip: newIp, status: 'blocked' }, ...prev]);
    setNewIp('');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900/60">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Files</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <button className="px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-700 flex items-center gap-2"><Eye size={16}/> VIEW LOG</button>
                <button className="px-3 py-1.5 rounded-md border border-neutral-200 dark:border-neutral-700">SELECT AND DELETE</button>
                <button onClick={deleteSelected} className="px-3 py-1.5 rounded-md bg-red-600 text-white flex items-center gap-2"><Trash2 size={16}/> DELETE</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-white dark:bg-neutral-900">
                  <tr>
                    <th className="p-3 text-left">No</th>
                    <th className="p-3 text-left">File Type</th>
                    <th className="p-3 text-left">Total Files</th>
                    <th className="p-3 text-left">Storage Used</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((f, idx) => (
                    <tr key={f.id} className="border-t border-neutral-200 dark:border-neutral-800">
                      <td className="p-3">
                        <input type="checkbox" checked={selected.includes(f.id)} onChange={() => toggleSelect(f.id)} />
                        <span className="ml-2">{idx + 1}</span>
                      </td>
                      <td className="p-3">{f.type}</td>
                      <td className="p-3">{f.total}</td>
                      <td className="p-3">{f.used}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
              <h3 className="font-semibold mb-3">IP Management</h3>
              <div className="flex items-center gap-2 mb-3">
                <input value={newIp} onChange={(e) => setNewIp(e.target.value)} placeholder="Enter IP address to block" className="flex-1 px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm" />
                <button onClick={blockIp} className="px-3 py-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm">Block IP</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr>
                      <th className="p-2 text-left">IP Address</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ips.map((x) => (
                      <tr key={x.ip} className="border-t border-neutral-200 dark:border-neutral-800">
                        <td className="p-2 font-mono text-xs">{x.ip}</td>
                        <td className="p-2 capitalize">{x.status}</td>
                        <td className="p-2">
                          <button onClick={() => setIps((prev) => prev.map((i) => i.ip === x.ip ? { ...i, status: i.status === 'blocked' ? 'active' : 'blocked' } : i))} className="px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 text-xs">Toggle</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
              <h3 className="font-semibold mb-3">Active Users</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr>
                      <th className="p-2 text-left">IP Address</th>
                      <th className="p-2 text-left">Location</th>
                      <th className="p-2 text-left">User Agent</th>
                      <th className="p-2 text-left">Last Seen</th>
                      <th className="p-2 text-left">Visit Count</th>
                      <th className="p-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeUsers.map((u) => (
                      <tr key={u.ip} className="border-t border-neutral-200 dark:border-neutral-800">
                        <td className="p-2 font-mono text-xs">{u.ip}</td>
                        <td className="p-2 flex items-center gap-1"><Globe size={14} /> {u.location}</td>
                        <td className="p-2">{u.ua}</td>
                        <td className="p-2">{u.last}</td>
                        <td className="p-2">{u.visits}</td>
                        <td className="p-2">
                          <button onClick={() => setActiveUsers((prev) => prev.filter((x) => x.ip !== u.ip))} className="px-2 py-1 rounded border border-neutral-200 dark:border-neutral-700 text-xs">Terminate</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <h3 className="font-semibold mb-3">Termination Log</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    <th className="p-2 text-left">IP Address</th>
                    <th className="p-2 text-left">Reason</th>
                    <th className="p-2 text-left">User Agent</th>
                    <th className="p-2 text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-neutral-200 dark:border-neutral-800">
                    <td className="p-2 font-mono text-xs">198.51.100.99</td>
                    <td className="p-2">Multiple failed logins</td>
                    <td className="p-2">Safari on iOS</td>
                    <td className="p-2">2025-10-10 12:45</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4">
            <h3 className="font-semibold mb-3">Welcome</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <button className="px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 flex items-center gap-2"><Users size={16}/> ADMIN PROFILE</button>
              <button className="px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700">SET STORAGE</button>
              <button className="px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700">BACK TO SITE</button>
              <button className="px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 flex items-center gap-2"><Shield size={16}/> SETTINGS</button>
              <button className="px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 flex items-center gap-2"><Mail size={16}/> EMAIL</button>
              <button className="px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 flex items-center gap-2"><MessageCircle size={16}/> CHAT</button>
              <button className="px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 flex items-center gap-2"><LogOut size={16}/> LOGOUT</button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {stats.map((s, idx) => (
              <Card key={idx} title={s.title} value={s.value} icon={s.icon} />
            ))}
          </div>

          <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-4 space-y-4">
            <h3 className="font-semibold">Storage</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-neutral-500 text-xs mb-1">FREE SPACE</p>
                <p className="font-medium">{storage.free}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-xs mb-1">USED</p>
                <p className="font-medium">{storage.used}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-neutral-500 mb-1">Enter storage size</label>
                <div className="flex items-center gap-2">
                  <input value={storage.set} onChange={(e) => setStorage({ ...storage, set: e.target.value })} className="flex-1 px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm" />
                  <button className="px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700">SET</button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1">Home storage assign</label>
                <div className="flex items-center gap-2">
                  <input value={storage.home} onChange={(e) => setStorage({ ...storage, home: e.target.value })} className="flex-1 px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm" />
                  <button className="px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700">SET</button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-neutral-500 mb-1">Room storage assign</label>
                <div className="flex items-center gap-2">
                  <input value={storage.room} onChange={(e) => setStorage({ ...storage, room: e.target.value })} className="flex-1 px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm" />
                  <button className="px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700">SET</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
