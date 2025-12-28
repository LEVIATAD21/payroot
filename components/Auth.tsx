
import React, { useState } from 'react';
import { ShieldCheck, Mail, Phone, Lock, ArrowRight, MessageCircle, Smartphone, Eye, EyeOff, Loader2, ChevronLeft } from 'lucide-react';

interface AuthProps {
  onAuthenticated: () => void;
}

type AuthMode = 'login' | 'register' | 'verify';

const Auth: React.FC<AuthProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyMethod, setVerifyMethod] = useState<'whatsapp' | 'gmail' | null>(null);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleInitialAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simula processamento de rede descentralizada
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setMode('verify');
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    onAuthenticated();
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Auto-focus next
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  if (mode === 'verify') {
    return (
      <div className="min-h-screen bg-[#0F1115] flex flex-col items-center justify-center p-6 animate-in zoom-in duration-300">
        <div className="w-full max-w-md bg-[#161920] border border-white/5 rounded-[40px] p-10 space-y-8 shadow-2xl relative overflow-hidden">
          <button 
            onClick={() => setMode('login')}
            className="absolute top-8 left-8 p-2 text-white/40 hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="text-center pt-4">
            <h2 className="text-2xl font-extrabold tracking-tight mb-2">Verificação de Segurança</h2>
            <p className="text-sm text-white/40 font-medium">Escolha como deseja receber seu código de acesso.</p>
          </div>

          {!verifyMethod ? (
            <div className="space-y-4">
              <button 
                onClick={() => setVerifyMethod('whatsapp')}
                className="w-full p-6 bg-[#00F59B]/10 border border-[#00F59B]/20 rounded-3xl flex items-center gap-4 hover:bg-[#00F59B]/20 transition-all group"
              >
                <div className="w-12 h-12 bg-[#00F59B] rounded-2xl flex items-center justify-center text-black">
                  <MessageCircle size={24} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm">Receber via WhatsApp</p>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{phone || '(XX) XXXXX-XXXX'}</p>
                </div>
                <ArrowRight size={18} className="ml-auto text-[#00F59B] group-hover:translate-x-1 transition-transform" />
              </button>

              <button 
                onClick={() => setVerifyMethod('gmail')}
                className="w-full p-6 bg-purple-500/10 border border-purple-500/20 rounded-3xl flex items-center gap-4 hover:bg-purple-500/20 transition-all group"
              >
                <div className="w-12 h-12 bg-[#820AD1] rounded-2xl flex items-center justify-center text-white">
                  <Mail size={24} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm">Receber via E-mail</p>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{email || 'exemplo@gmail.com'}</p>
                </div>
                <ArrowRight size={18} className="ml-auto text-[#820AD1] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-8 animate-in slide-in-from-bottom-4">
              <div className="flex justify-center gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-12 h-14 bg-black/40 border border-white/10 rounded-xl text-center font-bold text-xl focus:border-[#00F59B] outline-none transition-colors"
                  />
                ))}
              </div>
              <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-widest">
                Enviamos um código para seu {verifyMethod === 'whatsapp' ? 'WhatsApp' : 'E-mail'}.
              </p>
              <button 
                type="submit"
                disabled={loading || otp.some(d => !d)}
                className="w-full py-5 fintech-gradient text-white font-extrabold rounded-2xl shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                {loading ? <Loader2 size={24} className="animate-spin" /> : 'Confirmar e Entrar'}
              </button>
              <button 
                type="button"
                onClick={() => setVerifyMethod(null)}
                className="w-full text-xs font-bold text-[#00F59B] uppercase tracking-widest opacity-60 hover:opacity-100"
              >
                Alterar método de envio
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1115] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00F59B] opacity-[0.03] blur-[100px] -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#820AD1] opacity-[0.03] blur-[100px] -ml-48 -mb-48"></div>

      <div className="w-full max-w-md z-10 animate-in slide-in-from-bottom-12 duration-700">
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 fintech-gradient rounded-2xl flex items-center justify-center shadow-lg">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter">Ghost<span className="text-[#00F59B]">Bank</span></h1>
        </div>

        <div className="bg-[#161920] border border-white/5 rounded-[40px] p-10 space-y-8 shadow-2xl">
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-tight">
              {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta Ghost'}
            </h2>
            <p className="text-sm text-white/40 font-medium mt-1">
              {mode === 'login' ? 'Acesse seu cofre digital anônimo' : 'Segurança de nível blockchain para você'}
            </p>
          </div>

          <form onSubmit={handleInitialAction} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest ml-1">E-mail</label>
              <div className="relative">
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:border-[#00F59B] outline-none transition-colors"
                />
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest ml-1">Celular</label>
              <div className="relative">
                <input 
                  type="tel" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:border-[#00F59B] outline-none transition-colors"
                />
                <Smartphone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-white/40 uppercase tracking-widest ml-1">Senha</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-white/10 p-4 pl-12 rounded-2xl focus:border-[#00F59B] outline-none transition-colors"
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 fintech-gradient text-white font-extrabold rounded-2xl shadow-xl mt-4 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : (
                <>
                  {mode === 'login' ? 'Entrar Agora' : 'Criar Conta Grátis'}
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 text-center">
            <button 
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="text-xs font-bold text-white/40 hover:text-white transition-colors uppercase tracking-widest"
            >
              {mode === 'login' ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça Login'}
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] leading-relaxed">
          Protegido por Protocolo de Prova de Privacidade<br/>
          GhostBank v4.2 Decentralized Node
        </p>
      </div>
    </div>
  );
};

export default Auth;
