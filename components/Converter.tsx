
import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Zap, RefreshCw, Lock, Activity, Info, TrendingUp, ShieldCheck } from 'lucide-react';
import { CurrencyCode } from '../App';

interface ConverterProps {
  balances: Record<CurrencyCode, number>;
  onComplete: (from: CurrencyCode, to: CurrencyCode, amountFrom: number, amountTo: number) => void;
}

const Converter: React.FC<ConverterProps> = ({ balances, onComplete }) => {
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('BRL');
  const [toCurrency, setToCurrency] = useState<CurrencyCode>('USD');
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState(0.1812);
  const [isSwapping, setIsSwapping] = useState(false);

  useEffect(() => {
    const rates: any = {
      'BRL-USD': 0.1824, 'USD-BRL': 5.4820,
      'BRL-BTC': 0.0000028, 'BTC-BRL': 357142.85,
      'USD-BTC': 0.000015, 'BTC-USD': 66666.66,
      'XMR-USD': 164.20, 'USD-XMR': 0.0060,
      'BRL-XMR': 0.0031, 'XMR-BRL': 322.58
    };
    const key = `${fromCurrency}-${toCurrency}`;
    setRate(rates[key] || 1);
  }, [fromCurrency, toCurrency]);

  const handleExchange = async () => {
    if (!amount) return;
    setIsSwapping(true);
    await new Promise(r => setTimeout(r, 2000));
    const amtFrom = parseFloat(amount);
    const amtTo = amtFrom * rate;
    onComplete(fromCurrency, toCurrency, amtFrom, amtTo);
    setAmount('');
    setIsSwapping(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fintech">
      <div className="p-8 md:p-12 bg-[#161920] border border-white/5 rounded-[48px] shadow-2xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#00F59B] opacity-[0.03] blur-[80px]"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h3 className="text-3xl font-black tracking-tight">Câmbio <span className="text-[#00F59B]">Ghost</span></h3>
            <p className="text-white/40 text-sm font-medium">Conversão instantânea com liquidez descentralizada.</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-[#00F59B]/10 border border-[#00F59B]/20 rounded-2xl">
            <Zap size={16} className="text-[#00F59B]" />
            <span className="text-xs font-black text-[#00F59B] uppercase tracking-widest">Taxa Zero Aplicada</span>
          </div>
        </div>

        <div className="space-y-6">
          {/* De: Origem */}
          <div className="p-6 bg-black/20 border border-white/5 rounded-[32px] hover:border-white/10 transition-colors">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Você envia</span>
              <span className="text-[10px] font-bold text-white/40">Saldo: {balances[fromCurrency].toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-4">
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                className="flex-1 bg-transparent text-4xl font-black outline-none placeholder:text-white/5"
              />
              <select 
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value as CurrencyCode)}
                className="bg-[#1A1D26] p-4 rounded-2xl font-bold text-sm outline-none border border-white/10"
              >
                <option value="BRL">BRL</option>
                <option value="USD">USD</option>
                <option value="BTC">BTC</option>
                <option value="XMR">XMR</option>
              </select>
            </div>
          </div>

          {/* Botão de Troca Central */}
          <div className="flex justify-center -my-10 relative z-10">
            <button 
              onClick={() => {
                const temp = fromCurrency;
                setFromCurrency(toCurrency);
                setToCurrency(temp);
              }}
              className="w-14 h-14 bg-[#161920] border-4 border-[#0F1115] rounded-2xl flex items-center justify-center text-[#00F59B] hover:scale-110 transition-transform shadow-xl"
            >
              <ArrowRightLeft className="rotate-90" size={24} />
            </button>
          </div>

          {/* Para: Destino */}
          <div className="p-6 bg-black/20 border border-white/5 rounded-[32px] hover:border-white/10 transition-colors">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Você recebe (estimado)</span>
              <div className="flex items-center gap-2 text-[#00F59B]">
                <ShieldCheck size={12} />
                <span className="text-[10px] font-bold uppercase">Cotação Real-Time</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 text-4xl font-black text-white/40">
                {(parseFloat(amount || '0') * rate).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <select 
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value as CurrencyCode)}
                className="bg-[#1A1D26] p-4 rounded-2xl font-bold text-sm outline-none border border-white/10"
              >
                <option value="USD">USD</option>
                <option value="BRL">BRL</option>
                <option value="BTC">BTC</option>
                <option value="XMR">XMR</option>
              </select>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-5 bg-[#820AD1]/5 rounded-[24px] border border-[#820AD1]/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RefreshCw size={18} className="text-[#820AD1] animate-spin-slow" />
            <p className="text-xs font-bold text-white/60">1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}</p>
          </div>
          <div className="flex items-center gap-2">
            <Lock size={14} className="text-white/20" />
            <span className="text-[9px] font-black uppercase text-white/20 tracking-tighter">Conexão P2P Criptografada</span>
          </div>
        </div>

        <button 
          disabled={isSwapping || !amount}
          onClick={handleExchange}
          className={`w-full mt-8 py-6 rounded-3xl font-black text-lg uppercase tracking-tight transition-all shadow-2xl flex items-center justify-center gap-3 ${
            isSwapping || !amount 
            ? 'bg-white/5 text-white/20 cursor-not-allowed'
            : 'fintech-gradient text-white hover:scale-[1.01] active:scale-95'
          }`}
        >
          {isSwapping ? (
            <>
              <RefreshCw size={24} className="animate-spin" />
              Processando Troca...
            </>
          ) : (
            'Executar Conversão Agora'
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-[10px] font-bold text-white/20 uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-[#00F59B]" />
          Rede Blockchain Sincronizada
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-purple-500" />
          Protocolo Atomic Swap v2
        </div>
      </div>
    </div>
  );
};

export default Converter;
