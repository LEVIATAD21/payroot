
import React from 'react';
import { Transaction } from '../App';
import { Shield, EyeOff, Terminal, ArrowUpRight, ArrowDownLeft, RefreshCw, FileCheck, Search, Filter } from 'lucide-react';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="space-y-8 animate-fintech">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Extrato <span className="text-purple-500">Privado</span></h2>
          <p className="text-white/40 text-sm font-medium">Histórico de transações com deleção automática de logs.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              type="text" 
              placeholder="Buscar hash..." 
              className="bg-[#161920] border border-white/5 rounded-full py-2.5 pl-12 pr-6 text-xs outline-none focus:border-white/20 transition-all w-full md:w-64"
            />
          </div>
          <button className="p-2.5 bg-[#161920] border border-white/5 rounded-full text-white/40 hover:text-white transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-[#161920] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-black/20 border-b border-white/5">
              <tr>
                <th className="px-8 py-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Tipo</th>
                <th className="px-8 py-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Identificador (Hash)</th>
                <th className="px-8 py-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Valor</th>
                <th className="px-8 py-5 text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Segurança</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.length > 0 ? (
                transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                          tx.type === 'send' ? 'bg-red-500/10 text-red-500' : 
                          tx.type === 'convert' ? 'bg-[#00F59B]/10 text-[#00F59B]' : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {tx.type === 'send' ? <ArrowUpRight size={18} /> : tx.type === 'convert' ? <RefreshCw size={18} /> : <ArrowDownLeft size={18} />}
                        </div>
                        <span className="text-sm font-bold capitalize">{tx.type === 'send' ? 'Pagamento' : tx.type === 'convert' ? 'Conversão' : 'Recebimento'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="mono text-xs text-white/60 group-hover:text-[#00F59B] transition-colors uppercase">{tx.id.slice(0, 14)}...</span>
                        <span className="text-[9px] font-bold text-white/20 uppercase mt-1">Sincronizado via Tor Node</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-base font-black ${tx.type === 'send' ? 'text-red-400' : 'text-[#00F59B]'}`}>
                        {tx.type === 'send' ? '-' : '+'}{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} {tx.currency}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                         <div className="flex -space-x-2">
                            <Shield size={14} className="text-[#00F59B]" />
                            <Shield size={14} className="text-purple-500" />
                         </div>
                         <span className="text-[10px] font-black text-white/40 uppercase tracking-tighter">Ofuscado (100%)</span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-32 text-center">
                    <div className="flex flex-col items-center max-w-xs mx-auto space-y-4 opacity-30">
                      <div className="w-20 h-20 bg-white/5 rounded-[32px] flex items-center justify-center">
                        <EyeOff size={40} />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-widest">Nada para mostrar</p>
                        <p className="text-[10px] font-medium mt-1">Suas transações são protegidas por protocolos de deleção imediata.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 bg-white/5 rounded-[32px] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileCheck size={20} className="text-[#00F59B]" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Consenso por Proof-of-Privacy Ativo</p>
        </div>
        <div className="mono text-[10px] text-purple-500 font-bold">
          LAST_BLOCK_HASH: {Math.random().toString(16).slice(2,24).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
