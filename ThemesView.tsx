import React, { useState } from 'react';
import { FOOTBALL_THEMES, FootballTheme } from './data.ts';
import { speakSpanish } from './sound.ts';
import { Volume2, Eye, EyeOff, Search, Sparkles } from 'lucide-react';

export const ThemesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [revealedThemes, setRevealedThemes] = useState<Record<number, boolean>>({});
  const [revealedPhrases, setRevealedPhrases] = useState<Record<string, boolean>>({});
  const [showAllTranslations, setShowAllTranslations] = useState<boolean>(false);

  const toggleTheme = (id: number) => {
    setRevealedThemes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const togglePhrase = (themeId: number, phraseIdx: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const key = `${themeId}_${phraseIdx}`;
    setRevealedPhrases(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredThemes = FOOTBALL_THEMES.filter(t =>
    t.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.hy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">
            ⚽ 12 TEMAS DE FÚTBOL
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            12 Թեմա Ֆուտբոլի Մասին
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Սեղմեք իսպաներեն թեմայի կամ արտահայտության վրա՝ հայերեն թարգմանությունը բացելու համար։
          </p>
        </div>

        <button
          onClick={() => setShowAllTranslations(!showAllTranslations)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors"
        >
          {showAllTranslations ? <EyeOff className="w-4 h-4 text-emerald-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
          <span>{showAllTranslations ? 'Թաքցնել թարգմանությունները' : 'Բացել բոլոր թարգմանությունները'}</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Որոնել թեմաներով (օր.՝ մարզում, viaje, hotel)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Grid of 12 Themes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredThemes.map(theme => {
          const isThemeRevealed = showAllTranslations || revealedThemes[theme.id];

          return (
            <div
              key={theme.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Theme Header & Index */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-bold text-emerald-400">Թեմա #{theme.id}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => speakSpanish(theme.es)}
                      className="p-1 rounded text-slate-400 hover:text-emerald-400 transition-colors"
                      title="Լսել իսպաներեն վերնագիրը"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleTheme(theme.id)}
                      className="p-1 rounded text-slate-400 hover:text-emerald-400 transition-colors"
                      title="Բացել հայերեն թարգմանությունը"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Spanish Title (Interactive Click to Reveal) */}
                <div
                  onClick={() => toggleTheme(theme.id)}
                  className="cursor-pointer group p-3 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all mb-3"
                  title="Սեղմեք իսպաներենի վրա՝ հայերենը բացելու համար"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇪🇸</span>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {theme.es}
                    </h3>
                  </div>

                  {isThemeRevealed && (
                    <div className="mt-2 pt-2 border-t border-slate-800 flex items-center gap-2 animate-in fade-in duration-150">
                      <span className="text-base">🇦🇲</span>
                      <p className="text-sm font-semibold text-emerald-400">
                        {theme.hy}
                      </p>
                    </div>
                  )}
                </div>

                {/* Topic Phrases (Key football sentences) */}
                <div className="space-y-2 mt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Օրինակ նախադասություններ (Frases útiles)՝
                  </span>

                  {theme.phrases.map((phrase, pIdx) => {
                    const isPhraseRevealed = showAllTranslations || revealedPhrases[`${theme.id}_${pIdx}`];

                    return (
                      <div
                        key={pIdx}
                        onClick={() => togglePhrase(theme.id, pIdx)}
                        className="cursor-pointer p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-slate-700 text-xs transition-colors"
                        title="Սեղմեք նախադասության վրա՝ թարգմանությունը տեսնելու համար"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-slate-200 font-medium">{phrase.es}</span>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakSpanish(phrase.es);
                              }}
                              className="p-1 text-slate-400 hover:text-emerald-400 transition-colors"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => togglePhrase(theme.id, pIdx, e)}
                              className="p-1 text-slate-400 hover:text-emerald-400 transition-colors"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {isPhraseRevealed && (
                          <div className="mt-1.5 pt-1.5 border-t border-slate-800/60 text-emerald-400 font-medium animate-in fade-in duration-150">
                            🇦🇲 {phrase.hy}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
