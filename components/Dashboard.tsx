
import React, { useState, useEffect } from 'react';
// Added Send, Terminal, and QrCode to the main import list to fix the undefined Send error
import { 
  ShieldCheck, 
  ArrowUpRight, 
  TrendingUp, 
  Eye, 
  EyeOff, 
  Server, 
  Trash2, 
  Zap, 
  Globe, 
  Radar, 
  ChevronRight, 
  Lock, 
  Bell, 
  ShieldAlert, 
  Cpu as NodeIcon,
  Send,
  Terminal,
  QrCode
} from 'lucide-react';
import { CurrencyCode, Transaction } from '../App';

interface DashboardProps {
  balances: Record<CurrencyCode, number>;
  transactions: Transaction[];
}

const Dashboard: React.FC<DashboardProps> = ({ balances, transactions }) => {
  const [showValues, setShowValues] = useState(true);
  const [circuit, setCircuit] = useState<string[]>(['SÃO PAULO', 'REYKJAVIK', 'GHOST_EXIT']);

  useEffect(() => {
    const locations = ['SÃO PAULO', 'ZURICH', 'AMSTERDAM', 'TORONTO', 'SINGAPORE', 'REYKJAVIK'];
    const interval = setInterval(() => {
      setCircuit([
        'LOCAL_BRIDGE',
        locations[Math.floor(Math.random() * locations.length)],
        'GHOST_EXIT_P2P'
      ]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 animate-fintech">
      {/* Privacy Monitor Widget */}
      <div className="p-5 bg-gradient-to-br from-[#0F1115] to-[#060709] rounded-[32px] border border-white/5 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse shadow-[0_0_8px_#00F59B]"></div>
            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Anonimato Nível Tor</span>
          </div>
          <span className="text-[10px] font-black text-[#00F59B]">99.9% PROTEGIDO</span>
        </div>
        
        <div className="flex items-center justify-between gap-2 py-2">
          {circuit.map((hop, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${i === 2 ? 'bg-[#00F59B]/10 text-[#00F59B]' : 'bg-white/5 text-white/20'}`}>
                  {i === 0 ? <Globe size={14} /> : i === 1 ? <Server size={14} /> : <Lock size={14} />}
                </div>
                <span className="text-[7px] font-bold text-white/10 uppercase tracking-tighter whitespace-nowrap">{hop}</span>
              </div>
              {i < 2 && <div className="h-[1px] flex-1 bg-gradient-to-r from-white/5 via-[#00F59B]/20 to-white/5"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Balance Card */}
      <div className="p-8 bg-[#0F1115] rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-32 h-32 bg-[#00F59B] opacity-[0.03] blur-[40px]"></div>
         <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Shadow Assets (BRL)</span>
            <button onClick={() => setShowValues(!showValues)} className="p-2 bg-white/5 rounded-xl text-white/30">
              {showValues ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
         </div>
         <div className="flex items-baseline gap-2 mb-8">
            <span className="text-xl font-bold text-[#00F59B]">R$</span>
            <span className="text-5xl font-black tracking-tighter">
              {showValues ? balances.BRL.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '••••••'}
            </span>
         </div>

         <div className="grid grid-cols-2 gap-3">
            <button className="bg-[#00F59B] p-4 rounded-2xl flex items-center justify-center gap-2 text-black font-black text-[10px] uppercase tracking-widest shadow-lg ripple">
               <Send size={14} /> Enviar
            </button>
            <button className="bg-white/5 p-4 rounded-2xl flex items-center justify-center gap-2 text-white font-black text-[10px] uppercase tracking-widest border border-white/5 ripple">
               <QrCode size={14} /> Receber
            </button>
         </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 gap-3">
         <AssetItem icon={<NodeIcon size={18} className="text-[#00F59B]" />} label="Ghost Network (G)" value={balances.GHOST} show={showValues} />
         <AssetItem icon={<Zap size={18} className="text-purple-500" />} label="Monero (XMR)" value={balances.XMR} show={showValues} />
      </div>

      {/* Terminal Pulse */}
      <div className="p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <Terminal size={14} className="text-white/20" />
            <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] animate-pulse">Aguardando novo bloco de mixagem...</span>
         </div>
         <span className="text-[8px] font-bold text-[#00F59B] mono">ID: 0x88F2</span>
      </div>
    </div>
  );
};

const AssetItem = ({ icon, label, value, show }: any) => (
  <div className="p-5 bg-[#0F1115] rounded-3xl border border-white/5 flex items-center justify-between">
     <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">{icon}</div>
        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">{label}</span>
     </div>
     <span className="text-sm font-black tracking-tight">{show ? value.toLocaleString() : '••••'}</span>
  </div>
);

export default Dashboard;
