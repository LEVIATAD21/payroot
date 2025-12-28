
import React, { useState, useEffect } from 'react';
import { Send, QrCode, Shield, CheckCircle2, FileText, Clock, Trash2, Info, Copy, Check, Server, Lock, Globe, Fingerprint, Key, ShieldAlert } from 'lucide-react';
import { CurrencyCode, Transaction } from '../App';

interface PixPaymentProps {
  balances: Record<CurrencyCode, number>;
  onComplete: (tx: Transaction) => void;
}

const PixPayment: React.FC<PixPaymentProps> = ({ balances, onComplete }) => {
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send');
  const [pixKey, setPixKey] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<CurrencyCode>('BRL');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [processStep, setProcessStep] = useState('');
  const [lastTx, setLastTx] = useState<Transaction | null>(null);

  const startPayment = async () => {
    setIsProcessing(true);
    const steps = [
      'Estabelecendo túnel Tor...',
      'Saltando via Nó: Reykjavik...',
      'Saltando via Nó: Zurich...',
      'Assinando Ghost Signature...',
      'Deletando rastro local...',
      'Transmitindo para Blockchain...'
    ];

    for (const step of steps) {
      setProcessStep(step);
      await new Promise(r => setTimeout(r, 700));
    }

    const txId = `GHOST-TX-${Math.random().toString(36).slice(2,14).toUpperCase()}`;
    // Apenas o remetente gera essa assinatura de prova
    const signature = `SIG_0x${Math.random().toString(16).slice(2,32)}${Date.now().toString(16)}`;
    
    const tx: Transaction = {
      id: txId,
      type: 'send',
      amount: parseFloat(amount),
      currency: currency,
      timestamp: Date.now(),
      status: 'confirmed',
      to: 'Destinatário Oculto via Tor',
      signature: signature
    };

    setLastTx(tx);
    onComplete(tx);
    setIsProcessing(false);
    setIsFinished(true);
  };

  if (isFinished && lastTx) {
    return (
      <div className="animate-in zoom-in duration-300">
        <div className="p-8 bg-[#0F1115] rounded-[40px] border border-white/5 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 fintech-gradient"></div>
          
          <div className="w-20 h-20 bg-[#00F59B]/10 rounded-[28px] flex items-center justify-center mx-auto border border-[#00F59B]/20">
            <Fingerprint size={40} className="text-[#00F59B]" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black">Ghost Sucedido</h3>
            <p className="text-[9px] text-[#00F59B] font-black uppercase tracking-[0.3em]">Conexão Tor Encerrada</p>
          </div>

          <div className="p-6 bg-black/40 rounded-[32px] text-left space-y-4 border border-white/5">
             <div className="flex flex-col gap-1">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Nota de Confirmação Única</span>
                <p className="text-[10px] font-medium text-white/60 leading-relaxed italic">
                  Esta nota é gerada localmente no seu dispositivo. O GhostBank não possui cópia desta prova. Guarde este hash.
                </p>
             </div>
             
             <div className="pt-2 border-t border-white/5 space-y-3">
               <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-white/30 uppercase">Valor:</span>
                  <span className="text-sm font-black text-[#00F59B]">{lastTx.amount} {lastTx.currency}</span>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-white/30 uppercase">Sua Prova Digital:</span>
                  <div className="p-3 bg-black rounded-xl border border-white/5 mono text-[8px] text-[#00F59B] break-all">
                    {lastTx.signature}
                  </div>
               </div>
             </div>
          </div>

          <button 
            onClick={() => {
              const note = `GHOST CONFIRMATION\n-----------------\nTX: ${lastTx.id}\nAMT: ${lastTx.amount} ${lastTx.currency}\nPROOF: ${lastTx.signature}\nSTATUS: NON-TRACEABLE VIA TOR`;
              navigator.clipboard.writeText(note);
              alert("Nota de Confirmação copiada. Somente você pode provar este envio.");
            }}
            className="w-full py-5 fintech-gradient text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <FileText size={18} /> Copiar Nota de Prova
          </button>
          
          <button 
            onClick={() => { setIsFinished(false); setPixKey(''); setAmount(''); }}
            className="w-full py-3 text-white/20 font-black text-[9px] uppercase tracking-widest hover:text-white transition-all"
          >
            Iniciar Novo Túnel Oculto
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tab Switcher - Tor Style */}
      <div className="flex p-1.5 bg-[#0F1115] rounded-[24px] border border-white/5">
        <button 
          onClick={() => setActiveTab('send')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'send' ? 'bg-white/5 text-[#00F59B]' : 'text-white/20'}`}
        >
          <Send size={16} /> Enviar (Tor)
        </button>
        <button 
          onClick={() => setActiveTab('receive')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === 'receive' ? 'bg-white/5 text-purple-500' : 'text-white/20'}`}
        >
          <QrCode size={16} /> Receber
        </button>
      </div>

      <div className="p-7 bg-[#0F1115] rounded-[40px] border border-white/5 relative shadow-2xl overflow-hidden">
        {isProcessing ? (
          <div className="py-20 flex flex-col items-center justify-center text-center space-y-8">
            <div className="relative">
              <div className="w-16 h-16 border-2 border-[#00F59B]/10 border-t-[#00F59B] rounded-full animate-spin"></div>
              <Shield size={24} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#00F59B]" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-black tracking-tight animate-pulse">{processStep}</p>
              <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">Criptografia Multi-Layer Ativa</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {activeTab === 'send' ? (
              <>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-white/20 uppercase tracking-widest ml-2">Chave Pix do Destinatário</label>
                    <input 
                      type="text" 
                      value={pixKey}
                      onChange={(e) => setPixKey(e.target.value)}
                      placeholder="CPF, E-mail ou Telefone"
                      className="w-full bg-black/40 border border-white/5 p-5 rounded-2xl text-sm font-bold focus:border-[#00F59B] outline-none transition-all placeholder:text-white/5"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-white/20 uppercase tracking-widest ml-2">Quanto enviar?</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-black/40 border border-white/5 p-5 rounded-2xl font-black text-2xl outline-none focus:border-[#00F59B] transition-all"
                      />
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black text-[#00F59B]">BRL</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-[#00F59B]/5 rounded-3xl border border-[#00F59B]/10 flex gap-4 items-start">
                   <ShieldAlert size={18} className="text-[#00F59B] shrink-0" />
                   <p className="text-[9px] leading-relaxed font-bold text-white/40 uppercase tracking-wider">
                     O destinatário receberá de um nó anônimo da rede Ghost. Seu nome e CPF original nunca sairão do seu dispositivo.
                   </p>
                </div>

                <button 
                  disabled={!amount || !pixKey}
                  onClick={startPayment}
                  className={`w-full py-6 rounded-[24px] font-black text-sm uppercase tracking-[0.2em] transition-all shadow-xl ${
                    !amount || !pixKey 
                    ? 'bg-white/5 text-white/10 cursor-not-allowed' 
                    : 'bg-[#00F59B] text-black hover:scale-[1.01] active:scale-95 shadow-[0_0_20px_rgba(0,245,155,0.2)]'
                  }`}
                >
                  Confirmar Envio Tor
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center py-4 space-y-6">
                <div className="w-20 h-20 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500">
                  <QrCode size={40} />
                </div>
                <div className="text-center space-y-2">
                  <h4 className="text-xl font-black">Link de Recebimento</h4>
                  <p className="text-[10px] font-medium text-white/30 uppercase tracking-widest px-8">Gere um QR Code que mascara sua conta real através do protocolo Onion.</p>
                </div>
                <button className="w-full py-5 bg-purple-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl">
                  Criar Porta de Recebimento
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-center gap-6 text-[8px] font-black text-white/10 uppercase tracking-[0.3em]">
         <div className="flex items-center gap-2"><Globe size={10} /> Tor Hop Enabled</div>
         <div className="flex items-center gap-2"><Lock size={10} /> End-to-End Proof</div>
      </div>
    </div>
  );
};

export default PixPayment;
