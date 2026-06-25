'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';

export function ChatbotPage() {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // TODO (roadmap stage 5): forward the message to the AI coach endpoint
      // (/api/coach) which injects user context into the master prompt.
      setMessage('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full px-5 pt-6 pb-32"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mb-3">
          <MessageCircle className="w-8 h-8 text-slate-950" />
        </div>
        <h2 className="text-white font-bold text-lg">Alimac AI Coach</h2>
        <p className="text-emerald-400 text-xs">● En línea</p>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto">
        <div className="flex justify-start">
          <div className="max-w-[80%] px-4 py-3 rounded-2xl text-sm bg-slate-800/80 border border-white/10 text-slate-200 rounded-bl-md">
            ¡Hola Juan! Soy tu coach IA. ¿Listo para superar tus marcas hoy?
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4"
      >
        <div className="relative flex items-center gap-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-3 shadow-lg shadow-black/30">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe a tu coach..."
            className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 outline-none"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            className="w-9 h-9 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 flex-shrink-0"
          >
            <Send className="w-4 h-4 text-slate-950" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
