/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Database, 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  LogIn, 
  Terminal, 
  Info, 
  Code2, 
  CheckCircle2, 
  XCircle,
  ArrowRightLeft,
  AlertTriangle,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- MOCK DATABASE ---
const MOCK_USERS = [
  { id: 1, username: 'alice', password: 'password123', role: 'user', email: 'alice@example.com' },
  { id: 2, username: 'bob', password: 'secure_password', role: 'user', email: 'bob@example.com' },
  { id: 3, username: 'admin', password: 'ultra_secret_db_password_99', role: 'admin', email: 'admin@internal.corp' },
  { id: 4, username: 'charlie', password: 'charlie_brown', role: 'user', email: 'charlie@example.com' },
];

const MOCK_PRODUCTS = [
  { id: 101, name: 'Laptop Pro', price: '$1200', category: 'Electronics' },
  { id: 102, name: 'Wired Mouse', price: '$25', category: 'Accessories' },
  { id: 103, name: 'Mechanical Keyboard', price: '$150', category: 'Accessories' },
];

const MOCK_PRIVATE_NOTES = [
  { id: 1, note: 'CEO private phone: +1-555-0199', author_id: 3 },
  { id: 2, note: 'Next month lay-offs list stored in /shares/confidential', author_id: 3 },
];

enum Tab {
  ERROR_BASED = 'error_based',
  UNION_BASED = 'union_based',
  BLIND = 'blind',
  REMEDIATION = 'remediation'
}

// --- APP COMPONENT ---
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ERROR_BASED);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      {/* HEADER */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 sticky top-0 z-10 shadow-sm transition-colors duration-300">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
                <Database className="text-white w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">SQLi Lab</h1>
                  <span className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">GROUP 10</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Educational Simulator</p>
              </div>
            </div>

            {/* Mobile Theme Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all hover:ring-2 hover:ring-indigo-500"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <nav className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto no-scrollbar">
              {[
                { id: Tab.ERROR_BASED, label: 'Error-Based', icon: ShieldAlert },
                { id: Tab.UNION_BASED, label: 'UNION-Based', icon: ArrowRightLeft },
                { id: Tab.BLIND, label: 'Blind SQLi', icon: Terminal },
                { id: Tab.REMEDIATION, label: 'Remediation', icon: ShieldCheck },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id 
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Desktop Theme Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="hidden md:flex p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all hover:bg-slate-200 dark:hover:bg-slate-700 hover:scale-105 active:scale-95"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-500" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === Tab.ERROR_BASED && <ErrorBasedView />}
            {activeTab === Tab.UNION_BASED && <UnionBasedView />}
            {activeTab === Tab.BLIND && <BlindView />}
            {activeTab === Tab.REMEDIATION && <RemediationView />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-slate-200 dark:border-slate-800 mt-12 text-center transition-colors">
        <p className="text-sm text-slate-400 dark:text-slate-500">
          For educational purposes only. Always use parameterized queries in production.
        </p>
      </footer>
    </div>
  );
}

// --- VIEW COMPONENTS ---

function UnionBasedView() {
  const [productSearch, setProductSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showSecure, setShowSecure] = useState(false);

  const handleSearch = () => {
    setError(null);
    const input = productSearch.toLowerCase();
    
    // Simulate selection between vulnerable and secure logic
    if (showSecure) {
        // SECURE: Logic would treat input as a literal search string
        const products = MOCK_PRODUCTS.filter(p => 
            p.name.toLowerCase().includes(input) || 
            p.id.toString() === input
        );
        setResults(products);
        return;
    }

    try {
      // 1. Detect UNION attempt
      if (input.includes('union') && input.includes('select')) {
        // Simple logic for the demo: count columns in 'union select 1,2,3,4'
        const selectPart = input.split('select')[1] || '';
        const columns = selectPart.split(',').filter(c => c.trim().length > 0);
        
        // Product table has 4 columns (id, name, price, category)
        if (columns.length !== 4) {
          throw new Error("The used SELECT statements have a different number of columns. SQL Standard Error: 1222");
        }

        // Logic to "leak" user table if the payload looks like it's targeting users
        if (input.includes('users')) {
          const leakedUsers = MOCK_USERS.map(u => ({
            id: u.id,
            name: u.username,
            price: u.password, // Mismatched mapping - simulating how data fills the grid
            category: u.role
          }));
          setResults(leakedUsers);
          return;
        }

        if (input.includes('private_notes')) {
            const leakedNotes = MOCK_PRIVATE_NOTES.map(n => ({
                id: n.id,
                name: n.note,
                price: 'CONFIDENTIAL',
                category: 'SYSTEM_ADMIN'
            }));
            setResults(leakedNotes);
            return;
        }

        throw new Error("Table not found or insufficient privileges for UNION JOIN.");
      }

      // 2. Normal logical flow
      const products = MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(input) || 
        p.id.toString() === input
      );
      setResults(products);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <SectionDescription 
        title="UNION-Based SQL Injection"
        description="The UNION operator is used to combine the results of two or more SELECT statements. An attacker can use this to append results from secret tables (like passwords or logs) to the results of a legitimate query."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-800/50">
            <Search className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-slate-700 dark:text-slate-200">Product Search Catalog</h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/50 rounded-lg text-xs text-purple-700 dark:text-purple-300 leading-relaxed">
              <strong>Objective:</strong> Exfiltrate data from the <code>users</code> table. 
              <br/>Hint: The product query selects 4 columns: <code>id, name, price, category</code>.
            </div>
            
            <div className="flex gap-2">
              <input 
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Ex: Laptop, Mouse..."
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 outline-none font-mono text-sm focus:ring-2 focus:ring-purple-500 transition-all"
              />
              <button 
                onClick={handleSearch}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/20"
              >
                Run Query
              </button>
            </div>

            <div className="mt-4">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-2 font-mono">Payload Toolbox (Click to copy):</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "' UNION SELECT 1,2,3,4 --",
                  "' UNION SELECT id, username, password, role FROM users --",
                  "' UNION SELECT id, note, 'SECRET', 'LOG' FROM private_notes --"
                ].map((p) => (
                  <button 
                    key={p}
                    onClick={() => setProductSearch(p)}
                    className="text-[10px] bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 font-mono text-slate-600 dark:text-slate-400 transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase font-mono">Query Architecture</label>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <button 
                        onClick={() => setShowSecure(false)}
                        className={`text-[10px] px-2 py-1 rounded transition-all font-bold ${!showSecure ? 'bg-red-500 text-white shadow-sm' : 'text-slate-500'}`}
                    >
                        Vulnerable
                    </button>
                    <button 
                        onClick={() => setShowSecure(true)}
                        className={`text-[10px] px-2 py-1 rounded transition-all font-bold ${showSecure ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500'}`}
                    >
                        Secure
                    </button>
                </div>
              </div>

              {!showSecure ? (
                <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto whitespace-pre border-l-4 border-l-red-500 shadow-inner group relative">
                    <div className="absolute top-2 right-2 text-[10px] text-red-500/50 font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">String Concat</div>
                    <span className="text-purple-400">SELECT</span> id, name, price, category{'\n'}
                    <span className="text-purple-400">FROM</span> products{'\n'}
                    <span className="text-purple-400">WHERE</span> name <span className="text-purple-400">LIKE</span> <span className="text-green-400">'%{productSearch || ''}%'</span>;
                </div>
              ) : (
                <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto whitespace-pre border-l-4 border-l-emerald-500 shadow-inner group relative">
                    <div className="absolute top-2 right-2 text-[10px] text-emerald-500/50 font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Parameterized</div>
                    <span className="text-purple-400">SELECT</span> id, name, price, category{'\n'}
                    <span className="text-purple-400">FROM</span> products{'\n'}
                    <span className="text-purple-400">WHERE</span> name <span className="text-purple-400">LIKE</span> <span className="text-amber-400">?</span>;{'\n'}
                    <span className="text-slate-500 text-xs italic mt-2 block">Params: ["%{productSearch}%"]</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-colors">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-800/50">
            <Database className="w-5 h-5 text-slate-400" />
            <h3 className="font-semibold text-slate-700 dark:text-slate-200">Database Output Grid</h3>
          </div>
          <div className="p-6 flex-1 min-h-[300px] bg-slate-50 dark:bg-slate-950 overflow-auto">
            {error ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-4 rounded-lg text-red-600 dark:text-red-400 font-mono text-xs">
                <div className="font-bold flex items-center gap-2 mb-1 uppercase">
                    <XCircle className="w-4 h-4" /> SQL Context Error
                </div>
                {error}
              </div>
            ) : results.length > 0 ? (
              <div className="overflow-x-auto border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 uppercase font-black text-slate-500 dark:text-slate-400">
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Name / User</th>
                      <th className="px-4 py-3">Price / Pwd</th>
                      <th className="px-4 py-3">Category</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {results.map((r, i) => (
                      <tr key={i} className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors ${r.price && r.price.length > 10 ? 'bg-amber-50 dark:bg-amber-900/10' : ''}`}>
                        <td className="px-4 py-3 font-mono text-slate-400 dark:text-slate-500">{r.id}</td>
                        <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">{r.name}</td>
                        <td className={`px-4 py-3 font-mono ${r.price && r.price.length > 10 ? 'text-red-500 dark:text-red-400 font-black' : 'text-slate-500 dark:text-slate-400'}`}>{r.price}</td>
                        <td className="px-4 py-3">
                            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-500 dark:text-slate-400 font-medium">
                                {r.category}
                            </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-600 space-y-2 opacity-50">
                <Search className="w-12 h-12" />
                <p className="italic">Waiting for query results...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800/50 rounded-xl p-6 flex gap-4 transition-colors">
            <Info className="w-6 h-6 text-purple-500 shrink-0" />
            <div className="space-y-1">
                <h4 className="font-semibold text-purple-900 dark:text-purple-200">Rule 1: Column Count</h4>
                <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
                    The two queries must have the exact same number of columns. Try changing the number of columns in the <code>UNION SELECT</code> to see the error.
                </p>
            </div>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/50 rounded-xl p-6 flex gap-4 transition-colors">
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
            <div className="space-y-1">
                <h4 className="font-semibold text-amber-900 dark:text-amber-200">Rule 2: Data Types</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                    The data types in the corresponding columns should be compatible. Attackers often use <code>NULL</code> as placeholders to test which columns can hold strings vs integers.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}

function ErrorBasedView() {
  const [userIdInput, setUserIdInput] = useState('');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showSecure, setShowSecure] = useState(false);

  // Simulation Logic
  const handleSearch = () => {
    setError(null);
    setResponse(null);

    if (showSecure) {
        // SECURE LOGIC: Strict type checking and parameterized handling
        const idNum = parseInt(userIdInput);
        if (isNaN(idNum)) {
            setResponse([]);
            return;
        }
        const found = MOCK_USERS.find(u => u.id === idNum);
        setResponse(found ? [found] : []);
        return;
    }

    // VULNERABLE LOGIC: Simulate how a backend usually constructs the query
    const rawSql = `SELECT * FROM users WHERE id = '${userIdInput}';`;
    
    try {
      // 1. Simulate syntax error if input has unclosed quotes or strange tokens
      if (userIdInput.includes("'") && !userIdInput.includes("'--") && !userIdInput.includes("' #")) {
        // Simple heuristic for common SQL errors
        const quoteCount = (userIdInput.match(/'/g) || []).length;
        if (quoteCount % 2 !== 0) {
          throw new Error("Unclosed quotation mark after the character string '''. Status 500: Database Error.");
        }
      }

      // 2. Simulate "1 OR 1=1" payload
      const normalizedInput = userIdInput.toLowerCase();
      if (normalizedInput.includes('or 1=1') || normalizedInput.includes('or \'1\'=\'1\'')) {
        setResponse(MOCK_USERS);
        return;
      }

      // 3. Normal lookup
      const found = MOCK_USERS.find(u => u.id.toString() === userIdInput);
      if (found) {
        setResponse([found]);
      } else {
        setResponse([]);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-8">
      <SectionDescription 
        title="Error-Based SQL Injection"
        description="This type of attack relies on the database's error messages to gather information about the database's structure and contents. Here, information provided by the user is directly inserted into the query string."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* INTERACTIVE CARD */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-800/50">
            <Search className="w-5 h-5 text-indigo-500" />
            <h3 className="font-semibold text-slate-700 dark:text-slate-200">Search User by ID</h3>
          </div>
          <div className="p-8 space-y-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">Try entering '1', then try entering a single quote <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-red-600 dark:text-red-400">'</code> or the payload <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-red-600 dark:text-red-400">1 OR 1=1</code>.</p>
            
            <div className="flex gap-2">
              <input 
                type="text"
                value={userIdInput}
                onChange={(e) => setUserIdInput(e.target.value)}
                placeholder="Enter User ID (e.g., 1)"
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
              <button 
                onClick={handleSearch}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20"
              >
                Search
              </button>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase font-mono">Database Query Viewer</label>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    <button 
                        onClick={() => setShowSecure(false)}
                        className={`text-[10px] px-2 py-1 rounded transition-all font-bold ${!showSecure ? 'bg-red-500 text-white shadow-sm' : 'text-slate-500'}`}
                    >
                        Vulnerable
                    </button>
                    <button 
                        onClick={() => setShowSecure(true)}
                        className={`text-[10px] px-2 py-1 rounded transition-all font-bold ${showSecure ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500'}`}
                    >
                        Secure
                    </button>
                </div>
              </div>
              
              {!showSecure ? (
                <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto whitespace-pre border-l-4 border-l-red-500 shadow-inner group relative">
                    <div className="absolute top-2 right-2 text-[10px] text-red-500/50 font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Unsafe Concat</div>
                    <span className="text-purple-400">SELECT</span> <span className="text-slate-300">*</span> <span className="text-purple-400">FROM</span> <span className="text-blue-400">users</span> <span className="text-purple-400">WHERE</span> <span className="text-blue-400">id</span> = <span className="text-green-400">'{userIdInput || ' '}'</span>;
                </div>
              ) : (
                <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto whitespace-pre border-l-4 border-l-emerald-500 shadow-inner group relative">
                    <div className="absolute top-2 right-2 text-[10px] text-emerald-500/50 font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Parameterized</div>
                    <span className="text-purple-400">SELECT</span> <span className="text-slate-300">*</span> <span className="text-purple-400">FROM</span> <span className="text-blue-400">users</span> <span className="text-purple-400">WHERE</span> <span className="text-blue-400">id</span> = <span className="text-amber-400">?</span>;{'\n'}
                    <span className="text-slate-500 text-xs italic mt-2 block">Params: ["{userIdInput}"]</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SERVER RESPONSE */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-colors">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-emerald-500" />
                <h3 className="font-semibold text-slate-700 dark:text-slate-200">Server Response</h3>
            </div>
            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${error ? 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400'}`}>
                {error ? 'Status 500' : 'Status 200'}
            </span>
          </div>
          <div className="p-6 flex-1 min-h-[300px] bg-slate-50 dark:bg-slate-950 font-mono text-xs overflow-auto">
            {error && (
              <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-100 dark:border-red-800/50 animate-pulse">
                <div className="flex items-center gap-2 mb-2 font-bold uppercase">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  Database Exception
                </div>
                {error}
              </div>
            )}
            {!error && response && response.length > 0 && (
              <div className="space-y-4">
                {response.map((user: any) => (
                  <div key={user.id} className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
                    <pre className="text-slate-700 dark:text-slate-300">{JSON.stringify(user, null, 2)}</pre>
                  </div>
                ))}
              </div>
            )}
            {!error && response && response.length === 0 && (
              <div className="text-slate-400 dark:text-slate-600 italic flex items-center justify-center min-h-[200px]">
                No records found.
              </div>
            )}
            {!error && !response && (
              <div className="text-slate-400 dark:text-slate-600 italic flex items-center justify-center min-h-[200px]">
                Enter an ID and search...
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/50 rounded-xl p-6 flex gap-4 transition-colors">
        <Info className="w-6 h-6 text-indigo-500 shrink-0" />
        <div className="space-y-1">
            <h4 className="font-semibold text-indigo-900 dark:text-indigo-200">Why does this work?</h4>
            <p className="text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed">
                When you input <code className="bg-white dark:bg-slate-800 px-1 rounded">1 OR 1=1</code>, the query becomes <code className="bg-white dark:bg-slate-800 px-1 rounded italic">WHERE id = '1' OR 1=1</code>. Since <code className="bg-white dark:bg-slate-800 px-1 rounded">1=1</code> is always true, the database returns all records in the table, bypassing the original intent of searching for a single record.
            </p>
        </div>
      </div>
    </div>
  );
}

function BlindView() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setLoginState] = useState<'idle' | 'success' | 'fail'>('idle');
  const [showSecure, setShowSecure] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginState('idle');

    if (showSecure) {
        // SECURE: Strict parameter matching, no SQL bypass possible
        const userMatch = MOCK_USERS.find(u => u.username === username && u.password === password);
        setTimeout(() => {
            setLoginState(userMatch ? 'success' : 'fail');
        }, 400);
        return;
    }

    // Simulate "Blind" behavior: No errors returned, only Boolean (true/false) results
    const normalizedUser = username.toLowerCase();
    
    // Attack payloads that bypass logic
    const isBypass = normalizedUser.includes("' or '1'='1") || 
                     normalizedUser.includes("' or 1=1") ||
                     normalizedUser.includes("admin' --") ||
                     normalizedUser.includes("admin' #");

    // Normal Login Simulation
    const userMatch = MOCK_USERS.find(u => u.username === username && u.password === password);

    setTimeout(() => {
        if (isBypass || userMatch) {
            setLoginState('success');
        } else {
            setLoginState('fail');
        }
    }, 400); // Small latency to simulate server processing
  };

  return (
    <div className="space-y-8">
      <SectionDescription 
        title="Inferential (Blind) SQL Injection"
        description="In Blind SQLi, the attacker cannot see any data or error messages directly. Instead, they infer information by observing how the application responds to different logical statements. A 'Login Successful' response confirms a True condition."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LOGIN FORM */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-800/50">
            <LogIn className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-slate-700 dark:text-slate-200">Administrator Login</h3>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Username</label>
                <input 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono"
                />
              </div>
              <div className="space-y-1 text-slate-500 dark:text-slate-400 italic text-[10px]">
                Tip: Try entering <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-red-500 italic">admin' --</code> in the username field.
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Password</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 dark:bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              Sign In
            </button>
          </form>
        </div>

        {/* ANALYSIS VIEW */}
        <div className="space-y-6">
            {/* QUERY DISPLAY */}
            <div className="bg-slate-950 rounded-2xl shadow-sm border border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Code2 className="w-4 h-4" />
                        Query Architecture
                    </span>
                    <div className="flex items-center gap-2 bg-slate-800/50 p-1 rounded-lg">
                        <button 
                            onClick={() => setShowSecure(false)}
                            className={`text-[10px] px-2 py-1 rounded transition-all font-bold ${!showSecure ? 'bg-red-500 text-white' : 'text-slate-500'}`}
                        >
                            Vulnerable
                        </button>
                        <button 
                            onClick={() => setShowSecure(true)}
                            className={`text-[10px] px-2 py-1 rounded transition-all font-bold ${showSecure ? 'bg-emerald-500 text-white' : 'text-slate-500'}`}
                        >
                            Secure
                        </button>
                    </div>
                </div>
                {!showSecure ? (
                    <div className="p-6 font-mono text-sm overflow-x-auto border-l-4 border-l-red-500">
                        <div className="text-slate-500 mb-2">// Vulnerable string concatenation</div>
                        <div className="whitespace-pre">
                            <span className="text-purple-400">SELECT</span> <span className="text-slate-300">*</span> <span className="text-purple-400">FROM</span> <span className="text-blue-400">users</span>{'\n'}
                            <span className="text-purple-400">WHERE</span> <span className="text-blue-400">username</span> = <span className="text-green-400">'{username || ' '}'</span>{'\n'}
                            <span className="text-purple-400">AND</span> <span className="text-blue-400">password</span> = <span className="text-green-400">'{password || ' '}'</span>;
                        </div>
                    </div>
                ) : (
                    <div className="p-6 font-mono text-sm overflow-x-auto border-l-4 border-l-emerald-500">
                        <div className="text-slate-500 mb-2">// Secure parameterized query</div>
                        <div className="whitespace-pre">
                            <span className="text-purple-400">SELECT</span> <span className="text-slate-300">*</span> <span className="text-purple-400">FROM</span> <span className="text-blue-400">users</span>{'\n'}
                            <span className="text-purple-400">WHERE</span> <span className="text-blue-400">username</span> = <span className="text-amber-400">?</span>{'\n'}
                            <span className="text-purple-400">AND</span> <span className="text-blue-400">password</span> = <span className="text-amber-400">?</span>;{'\n'}
                            <span className="text-slate-500 text-xs italic mt-2 block">Params: ["{username}", "{password}"]</span>
                        </div>
                    </div>
                )}
            </div>

            {/* STATUS BOX */}
            <div className={`rounded-2xl border-2 p-8 transition-all duration-500 flex flex-col items-center justify-center text-center space-y-4 min-h-[200px] ${
                loginState === 'idle' ? 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 border-dashed' :
                loginState === 'success' ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-500' : 'bg-red-50 dark:bg-red-900/10 border-red-500'
            }`}>
                {loginState === 'idle' && (
                    <>
                        <div className="p-4 bg-slate-200 dark:bg-slate-800 rounded-full">
                            <Terminal className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                        </div>
                        <h4 className="text-slate-500 dark:text-slate-400 font-semibold italic">Waiting for authentication attempt...</h4>
                    </>
                )}
                {loginState === 'success' && (
                    <>
                        <CheckCircle2 className="w-16 h-16 text-emerald-500 drop-shadow-sm" />
                        <div>
                            <h4 className="text-2xl font-black text-emerald-800 dark:text-emerald-400 uppercase tracking-tight">Login Successful</h4>
                            <p className="text-emerald-600 dark:text-emerald-500 font-medium font-mono text-sm uppercase tracking-tighter">Access Granted: Admin Active</p>
                        </div>
                    </>
                )}
                {loginState === 'fail' && (
                    <>
                        <XCircle className="w-16 h-16 text-red-500 drop-shadow-sm" />
                        <div>
                            <h4 className="text-2xl font-black text-red-800 dark:text-red-400 uppercase tracking-tight">Access Denied</h4>
                            <p className="text-red-600 dark:text-red-500 font-medium italic underline underline-offset-4 decoration-2">Invalid Credentials Provided</p>
                        </div>
                    </>
                )}
            </div>
        </div>
      </div>

       <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-xl p-6 flex gap-4 transition-colors">
        <Info className="w-6 h-6 text-blue-500 shrink-0" />
        <div className="space-y-1">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200">The Power of Inference</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                By using <code className="bg-white dark:bg-slate-800 px-1 rounded font-mono">admin' --</code>, the attacker effectively comments out the rest of the query. 
                The SQL becomes <code className="bg-white dark:bg-slate-800 px-1 rounded font-mono italic whitespace-nowrap">WHERE username = 'admin' --' AND password = '...'</code>. 
                The database only looks for the user 'admin' and ignores the password requirement entirely.
            </p>
        </div>
      </div>
    </div>
  );
}

function RemediationView() {
  const [payload, setPayload] = useState("1 OR 1=1");
  const [testResult, setTestResult] = useState<'vulnerable' | 'secure' | null>(null);

  const simulateTest = (mode: 'vulnerable' | 'secure') => {
    setTestResult(mode);
  };

  const isPayloadMalicious = useMemo(() => {
    const low = payload.toLowerCase();
    return low.includes('or ') || low.includes("'") || low.includes('--') || low.includes('1=1');
  }, [payload]);

  return (
    <div className="space-y-8">
      <SectionDescription 
        title="Remediation Laboratory"
        description="The ultimate defense against SQL injection is the use of Prepared Statements (Parameterized Queries). This technique separates the query logic from the data, ensuring that user input is never interpreted as code."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* VULNERABLE CODE */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden border-t-4 border-t-red-500 transition-colors">
           <div className="p-6 bg-red-50/50 dark:bg-red-900/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-red-500" />
                    <h3 className="font-bold text-red-900 dark:text-red-400 uppercase text-sm tracking-widest">Vulnerable Code</h3>
                </div>
                <div className="text-[10px] bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-2 py-0.5 rounded font-black tracking-tighter">UNSAFE (String Concat)</div>
           </div>
           <div className="p-0 bg-slate-950 font-mono text-sm leading-relaxed overflow-x-auto min-h-[280px]">
             <div className="p-6 whitespace-pre">
                <span className="text-cyan-400">// DANGEROUS: Concatenating input directly</span> {'\n'}
                <span className="text-purple-400">const</span> <span className="text-blue-300">query</span> = <span className="text-green-400">`SELECT * FROM users WHERE id = '</span> + <span className="text-red-400">userInput</span> + <span className="text-green-400">'`</span>;{'\n'}
                <span className="text-purple-400">const</span> <span className="text-blue-300">results</span> = <span className="text-purple-400">await</span> <span className="text-yellow-300">db.execute</span>(<span className="text-blue-300">query</span>);
             </div>
             <div className={`p-6 border-t border-slate-800 transition-colors ${testResult === 'vulnerable' ? (isPayloadMalicious ? 'bg-red-900/20' : 'bg-green-900/10') : ''}`}>
                 <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Query result interpretation:</div>
                 {testResult === 'vulnerable' ? (
                   <div className="text-slate-300 dark:text-slate-400 text-xs">
                     Executed: 
                     <span className={isPayloadMalicious ? 'text-red-400 font-bold' : 'text-green-400'}>
                        {` SELECT * FROM users WHERE id = '${payload}'`}
                     </span>
                     {isPayloadMalicious && <div className="mt-2 text-red-400 dark:text-red-500 font-bold">⚠️ VULNERABLE: Database is executing user sub-queries!</div>}
                   </div>
                 ) : (
                   <span className="text-slate-600 dark:text-slate-500 italic">Run test to see result...</span>
                 )}
             </div>
           </div>
        </div>

        {/* SECURE CODE */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden border-t-4 border-t-emerald-500 transition-colors">
          <div className="p-6 bg-emerald-50/50 dark:bg-emerald-900/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-bold text-emerald-900 dark:text-emerald-400 uppercase text-sm tracking-widest">Secure Code</h3>
                </div>
                <div className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-black tracking-tighter">SAFE (Prepared Statement)</div>
           </div>
           <div className="p-0 bg-slate-950 font-mono text-sm leading-relaxed overflow-x-auto min-h-[280px]">
             <div className="p-6 whitespace-pre">
                <span className="text-cyan-400">// SAFE: Using placeholders (?)</span> {'\n'}
                <span className="text-purple-400">const</span> <span className="text-blue-300">sql</span> = <span className="text-green-400">"SELECT * FROM users WHERE id = ?"</span>;{'\n'}
                <span className="text-purple-400">const</span> <span className="text-blue-300">results</span> = <span className="text-purple-400">await</span> <span className="text-yellow-300">db.execute</span>(<span className="text-blue-300">sql</span>, [<span className="text-blue-400">userInput</span>]);
             </div>
             <div className={`p-6 border-t border-slate-800 transition-colors ${testResult === 'secure' ? 'bg-emerald-900/20' : ''}`}>
                 <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Query result interpretation:</div>
                 {testResult === 'secure' ? (
                   <div className="text-slate-300 dark:text-slate-400 text-xs">
                     The database treats the whole string <code className="text-amber-400">"{payload}"</code> as a single ID value. No logic is executed.
                     <div className="mt-2 text-emerald-400 dark:text-emerald-500 font-bold">✅ SECURE: Attacker payload neutralized and treated as 100% literal data.</div>
                   </div>
                 ) : (
                   <span className="text-slate-600 dark:text-slate-500 italic">Run test to see result...</span>
                 )}
             </div>
           </div>
        </div>
      </div>

      {/* PAYLOAD TESTER */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-md border border-indigo-100 dark:border-indigo-900/50 relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 p-4 opacity-5">
            <Terminal className="w-32 h-32 text-indigo-900 dark:text-indigo-400 rotate-12" />
        </div>
        <div className="relative z-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300">Attack Payload Tester</h3>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400">Enter a payload and witness how different backend implementations interpret it.</p>
                </div>
                <div className="bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 px-3 py-1 rounded-full flex items-center gap-2">
                    <ArrowRightLeft className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase">Interactive Switch</span>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <input 
                    type="text"
                    value={payload}
                    onChange={(e) => setPayload(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-indigo-100 dark:border-indigo-900/50 focus:border-indigo-500 outline-none font-mono text-indigo-900 dark:text-indigo-100 bg-indigo-50/10 dark:bg-indigo-950/20 transition-all"
                    placeholder="Enter payload..."
                />
                <div className="flex gap-2 shrink-0">
                    <button 
                        onClick={() => simulateTest('vulnerable')}
                        className="flex-1 sm:flex-none px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-md active:scale-95"
                    >
                        Test Vulnerable
                    </button>
                    <button 
                        onClick={() => simulateTest('secure')}
                        className="flex-1 sm:flex-none px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md active:scale-95"
                    >
                        Test Secure
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

// --- SHARED UI ---

function SectionDescription({ title, description }: { title: string, description: string }) {
  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">{title}</h2>
      <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed max-w-3xl">
        {description}
      </p>
    </div>
  );
}
