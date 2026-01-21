
import React from 'react';
import { Send, Bot, User, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { getGeminiHealthAssistant } from '../services/geminiService';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

const AIHealthBot: React.FC = () => {
  const [messages, setMessages] = React.useState<Message[]>([
    { role: 'bot', text: 'Olá! Sou seu assistente virtual de saúde. Como posso te ajudar hoje? Posso explicar termos médicos, dar dicas de saúde ou te guiar pelo portal.' }
  ]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const botResponse = await getGeminiHealthAssistant(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: botResponse || 'Não consegui processar sua dúvida.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Desculpe, estou com dificuldades técnicas agora.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in zoom-in-95 duration-500">
      {/* Bot Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Assistente Inteligente</h3>
            <p className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Online agora
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold">
          <Sparkles size={14} />
          POWERED BY GEMINI
        </div>
      </div>

      {/* Warning */}
      <div className="px-4 py-2 bg-amber-50 border-b border-amber-100 flex items-center gap-2 text-[10px] md:text-xs text-amber-700 font-medium">
        <AlertCircle size={14} />
        <span>Atenção: Este assistente fornece informações gerais e não substitui uma consulta médica real.</span>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200 text-slate-600' : 'bg-blue-600 text-white'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`
                p-4 rounded-2xl text-sm leading-relaxed
                ${msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-700 rounded-tl-none'}
              `}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-500 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Digitando...
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-100">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte algo sobre sua saúde ou exames..."
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-100"
          >
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIHealthBot;
