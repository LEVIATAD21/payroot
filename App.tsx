
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Wallet, History, LogOut, LayoutDashboard, Send, Share2, Globe, User, Fingerprint, Bell, Lock, ShieldAlert } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PixPayment from './components/PixPayment';
import Converter from './components/Converter';
import TransactionHistory from './components/TransactionHistory';
import Auth from './components/Auth';

export type CurrencyCode = 'BRL' | 'USD' | 'BTC' | 'XMR' | 'GHOST' | 'USDT';

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'convert';
  amount: number;
  currency: CurrencyCode;
  timestamp: number;
  status: 'obfuscated' | 'mixing' | 'confirmed';
  to?: string;
  signature?: string;
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'pix' | 'swap' | 'history'>('home');
  const [torNode, setTorNode] = useState('Amsterdam_NL_88');
  const [privacyScore, setPrivacyScore] = useState(99.9);
  
  const [balances, setBalances] = useState<Record<CurrencyCode, number>>({
    BRL: 28450.00,
    USD: 4120.50,
    BTC: 0.12,
    XMR: 124.0,
    GHOST: 50000.00,
    USDT: 1250.00
  });
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const nodes = ['Amsterdam_NL_88', 'Reykjavik_IS_12', 'Zurich_CH_44', 'Toronto_CA_09', 'Lagos_NG_22'];
    const interval = setInterval(() => {
      setTorNode(nodes[Math.floor(Math.random() * nodes.length)]);
      setPrivacyScore(prev => Math.min(100, prev + (Math.random() * 0.1 - 0.05)));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
    setBalances(prev => {
      const newBalances = { ...prev };
      if (tx.type === 'send') newBalances[tx.currency] -= tx.amount;
      else if (tx.type === 'receive') newBalances[tx.currency] += tx.amount;
      return newBalances;
    });
  };

  if (!isAuthenticated) {
    return <Auth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-[#060709] text-white overflow-hidden font-['Inter'] safe-top">
      {/* Top Mobile Bar - Tor Integrated */}
      <header className="h-16 flex items-center justify-between px-6 bg-[#060709] border-b border-white/5 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 fintech-gradient rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,245,155,0.3)]">
            <Lock size={18} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xs tracking-tighter leading-tight uppercase">Ghost<span className="text-[#00F59B]">Bank</span></span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-[#00F59B] animate-pulse"></div>
              <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Onion V3 Active</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end mr-1">
            <span className="text-[7px] font-black text-white/10 uppercase tracking-[0.2em]">Tor Circuit</span>
            <span className="text-[9px] font-bold text-[#00F59B] mono">{torNode}</span>
          </div>
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
            <ShieldAlert size={18} className="text-[#00F59B]" />
          </div>
        </div>
      </header>

      {/* App Content Area */}
      <main className="flex-1 overflow-y-auto pb-24 bg-[radial-gradient(circle_at_top,rgba(130,10,209,0.03),transparent_50%)]">
        <div className="p-4 max-w-md mx-auto">
          {activeTab === 'home' && <Dashboard balances={balances} transactions={transactions} />}
          {activeTab === 'pix' && <PixPayment balances={balances} onComplete={addTransaction} />}
          {activeTab === 'swap' && <Converter balances={balances} onComplete={(from, to, amtFrom, amtTo) => {
             setBalances(prev => ({...prev, [from]: prev[from] - amtFrom, [to]: prev[to] + amtTo}));
             addTransaction({
               id: `BRIDGE-${Math.random().toString(36).slice(2,12).toUpperCase()}`,
               type: 'convert',
               amount: amtFrom,
               currency: from,
               timestamp: Date.now(),
               status: 'confirmed'
             });
          }} />}
          {activeTab === 'history' && <TransactionHistory transactions={transactions} />}
        </div>
      </main>

      {/* Persistent Bottom Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-20 bg-[#060709]/95 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-4 pb-2 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
        <NavButton icon={<LayoutDashboard size={22}/>} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
        <NavButton icon={<Send size={22}/>} label="Send" active={activeTab === 'pix'} onClick={() => setActiveTab('pix')} />
        <NavButton icon={<Share2 size={22}/>} label="Swap" active={activeTab === 'swap'} onClick={() => setActiveTab('swap')} />
        <NavButton icon={<History size={22}/>} label="History" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />
      </nav>
    </div>
  );
};

const NavButton = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all duration-300 w-16 ripple ${active ? 'text-[#00F59B]' : 'text-white/20'}`}>
    <div className={`p-2.5 rounded-2xl transition-all ${active ? 'bg-[#00F59B]/10 shadow-[inset_0_0_10px_rgba(0,245,155,0.1)]' : ''}`}>
      {icon}
    </div>
    <span className={`text-[8px] font-black uppercase tracking-widest ${active ? 'opacity-100' : 'opacity-40'}`}>{label}</span>
  </button>
);

export default App;
