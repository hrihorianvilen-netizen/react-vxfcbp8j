'use client';

import { motion } from 'framer-motion';
import { Home, MessageCircle, User } from 'lucide-react';
import type { TabId } from '@/lib/types';

interface BottomNavProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const tabs: { id: TabId; icon: typeof Home; label: string }[] = [
  { id: 'dashboard', icon: Home, label: 'Inicio' },
  { id: 'chatbot', icon: MessageCircle, label: 'IA' },
  { id: 'profile', icon: User, label: 'Perfil' },
];

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: 50, x: '-50%' }}
      transition={{ delay: 0.2, type: 'spring' }}
      className="absolute bottom-10 left-1/2 z-50"
      style={{ width: 'calc(100% - 3rem)' }}
    >
      <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-800/80 rounded-full px-4 py-3 shadow-2xl shadow-black/50">
        <div className="relative flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const isCenter = tab.id === 'chatbot';
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  isCenter ? 'w-14 h-14' : 'w-11 h-11'
                } rounded-full`}
              >
                {isCenter && (
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 20px rgba(52,211,153,0.4)',
                        '0 0 35px rgba(52,211,153,0.6)',
                        '0 0 20px rgba(52,211,153,0.4)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full"
                  />
                )}
                {!isCenter && isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-slate-800/80 rounded-full border border-white/10"
                  />
                )}
                <tab.icon
                  className={`relative z-10 ${
                    isCenter
                      ? 'w-6 h-6 text-slate-950'
                      : isActive
                      ? 'w-5 h-5 text-emerald-400'
                      : 'w-5 h-5 text-slate-500'
                  }`}
                />
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
