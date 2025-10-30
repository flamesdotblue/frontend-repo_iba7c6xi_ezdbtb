import React from 'react';
import { Home, Lock, Settings } from 'lucide-react';

const tabs = [
  { key: 'home', label: 'File Sharing', icon: Home },
  { key: 'rooms', label: 'Rooms', icon: Lock },
  { key: 'admin', label: 'Admin', icon: Settings },
];

export default function Header({ activeTab, onChange }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold">FS</div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">SwiftShare</h1>
            <p className="text-xs text-neutral-500">Secure file rooms and admin control</p>
          </div>
        </div>
        <nav className="flex items-center gap-2">
          {tabs.map(({ key, label, icon: Icon }) => {
            const active = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => onChange(key)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all border ${
                  active
                    ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700 dark:hover:border-neutral-600'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
