import React, { useRef, useState } from 'react';
import { Upload, Download, QrCode, Search, File as FileIcon, Trash2, Eye } from 'lucide-react';

function StatBar({ used = 4.47, total = 50 }) {
  const pct = Math.min(100, (used / total) * 100);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-neutral-600 dark:text-neutral-300">{used.toFixed(2)} / {total} GB</div>
        <div className="flex items-center gap-2 text-xs">
          <button className="px-2 py-1 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-1"><Download size={14}/> Download All</button>
          <button className="px-2 py-1 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-1"><QrCode size={14}/> QR</button>
        </div>
      </div>
      <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function FileShareHome() {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([
    { id: 1, name: 'Project-Proposal.pdf', size: '1.2 MB', modified: '2025-10-10' },
    { id: 2, name: 'Brand-Assets.zip', size: '240 MB', modified: '2025-10-09' },
  ]);
  const [progress, setProgress] = useState(0);
  const [query, setQuery] = useState('');

  const handleChoose = () => inputRef.current?.click();

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files || []);
    simulateUpload(dropped);
  };

  const handleSelect = (e) => {
    const selected = Array.from(e.target.files || []);
    simulateUpload(selected);
    e.target.value = '';
  };

  const simulateUpload = (selected) => {
    if (!selected.length) return;
    setProgress(1);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          const appended = selected.map((f, idx) => ({
            id: Date.now() + idx,
            name: f.name,
            size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
            modified: new Date().toISOString().slice(0, 10),
          }));
          setFiles((prev) => [...appended, ...prev]);
          return 0;
        }
        return p + 3;
      });
    }, 60);
  };

  const filtered = files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <StatBar />
        <div className="flex-1" />
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search files..."
            className="w-full pl-9 pr-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-8 text-center bg-neutral-50/60 dark:bg-neutral-900/40"
      >
        <input ref={inputRef} type="file" multiple onChange={handleSelect} className="hidden" />
        <div className="mx-auto w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-300 mb-3">
          <Upload />
        </div>
        <p className="font-medium">Drag & drop or tap Choose Files</p>
        <p className="text-sm text-neutral-500">Upload</p>
        <div className="mt-4">
          <button onClick={handleChoose} className="px-4 py-2 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm shadow">
            Choose Files
          </button>
        </div>
        {progress > 0 && (
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
              <span>0%</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto border border-neutral-200 dark:border-neutral-800 rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-300">
            <tr>
              <th className="text-left font-medium p-3">File</th>
              <th className="text-left font-medium p-3">Size</th>
              <th className="text-left font-medium p-3">Modified</th>
              <th className="text-left font-medium p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-neutral-500">No files found</td>
              </tr>
            )}
            {filtered.map((f) => (
              <tr key={f.id} className="border-t border-neutral-200 dark:border-neutral-800">
                <td className="p-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center"><FileIcon size={16} /></div>
                  <span className="font-medium text-neutral-800 dark:text-neutral-100 truncate max-w-[260px]">{f.name}</span>
                </td>
                <td className="p-3">{f.size}</td>
                <td className="p-3">{f.modified}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800" title="Preview"><Eye size={16} /></button>
                    <button className="px-2 py-1 rounded-md border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800" title="Delete" onClick={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
