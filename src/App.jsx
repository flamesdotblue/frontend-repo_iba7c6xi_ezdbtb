import React, { useState } from 'react';
import Header from './components/Header';
import FileShareHome from './components/FileShareHome';
import Rooms from './components/Rooms';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [tab, setTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-50">
      <Header activeTab={tab} onChange={setTab} />

      {tab === 'home' && <FileShareHome />}
      {tab === 'rooms' && <Rooms />}
      {tab === 'admin' && <AdminPanel />}

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} SwiftShare — Secure file sharing with private rooms.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white">Privacy</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white">Terms</a>
            <a href="#" className="hover:text-neutral-900 dark:hover:text-white">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
