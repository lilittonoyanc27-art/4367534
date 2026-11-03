/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PoleChudesGame } from './PoleChudesGame.tsx';
import { isSoundEnabled, setSoundEnabled } from './sound.ts';
import { Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [soundOn, setSoundOn] = useState<boolean>(true);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Bar following Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
            <span className="text-xl">⚽</span>
            <span className="text-lg font-bold tracking-tight text-white font-display">
              Fútbol y Viajes
            </span>
          </div>

          {/* Zone 2: Navigation / Info */}
          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-400 font-medium">
            <span>Դաշտ Հրաշքների</span>
            <span>·</span>
            <span>30 Հարցերի Միասնական Խաղ</span>
            <span>·</span>
            <span className="text-emerald-400">Գլխավոր Բառ (10 տառ)</span>
          </div>

          {/* Zone 3: 1 Primary Action (Sound Toggle) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-colors ${
                soundOn
                  ? 'bg-slate-900 border-slate-800 text-emerald-400 hover:bg-slate-800'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:bg-slate-800'
              }`}
              title={soundOn ? 'Անջատել ձայնը (Mute)' : 'Միացնել ձայնը (Unmute)'}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Unified Game Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <PoleChudesGame />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Fútbol y Viajes · Դաշտ Հրաշքների և 30 ճանապարհորդական հարցերի միասնական խաղ
          </p>
          <p className="text-slate-400">
            Սեղմեք իսպաներեն հարցի կամ տարբերակների վրա՝ հայերեն թարգմանությունը տեսնելու համար
          </p>
        </div>
      </footer>
    </div>
  );
}
