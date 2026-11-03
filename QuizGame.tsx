import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from './data.ts';
import { playCorrect, playWrong, speakSpanish } from './sound.ts';
import { Volume2, CheckCircle2, XCircle, Eye, EyeOff, RotateCcw, Filter, Sparkles, BookOpen } from 'lucide-react';

export const QuizGame: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<number | 'all'>('all');
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  
  // Track revealed Armenian translations per question
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});
  
  // Track revealed Armenian translations per option: key is `${questionId}_${optionKey}`
  const [revealedOptions, setRevealedOptions] = useState<Record<string, boolean>>({});
  
  // Master toggle to reveal all translations
  const [showAllTranslations, setShowAllTranslations] = useState<boolean>(false);

  // Filtered questions
  const filteredQuestions = selectedPart === 'all'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter(q => q.part === selectedPart);

  // Stats
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(([id, ans]) => {
    const q = QUIZ_QUESTIONS.find(item => item.id === Number(id));
    return q && q.answer === ans;
  }).length;

  // Handle Option Click
  const handleSelectAnswer = (question: QuizQuestion, optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (userAnswers[question.id]) return; // already answered

    const nextAnswers = { ...userAnswers, [question.id]: optionKey };
    setUserAnswers(nextAnswers);

    if (optionKey === question.answer) {
      playCorrect();
    } else {
      playWrong();
    }

    // Auto reveal question and correct option translation on answering
    setRevealedQuestions(prev => ({ ...prev, [question.id]: true }));
    setRevealedOptions(prev => ({
      ...prev,
      [`${question.id}_${optionKey}`]: true,
      [`${question.id}_${question.answer}`]: true
    }));
  };

  // Toggle Armenian translation for question
  const toggleQuestionTranslation = (questionId: number) => {
    setRevealedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // Toggle Armenian translation for specific option
  const toggleOptionTranslation = (questionId: number, optionKey: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const key = `${questionId}_${optionKey}`;
    setRevealedOptions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Reset quiz
  const handleReset = () => {
    setUserAnswers({});
    setRevealedQuestions({});
    setRevealedOptions({});
    setShowAllTranslations(false);
  };

  const partNames: Record<number, { es: string; hy: string; icon: string }> = {
    1: { es: "En el aeropuerto", hy: "Օդանավակայանում", icon: "✈️" },
    2: { es: "En el hotel", hy: "Հյուրանոցում", icon: "🏨" },
    3: { es: "Transportes", hy: "Տրանսպորտ", icon: "🚆" },
    4: { es: "De vacaciones", hy: "Արձակուրդում", icon: "🗺️" },
    5: { es: "Viajar con el equipo", hy: "Ճանապարհորդել թիմի հետ", icon: "⚽" },
    6: { es: "Situaciones durante un viaje", hy: "Իրավիճակներ", icon: "🌟" }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header & Stats Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">
            🌍 QUIZ DE VIAJES
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            30 Ճանապարհորդական Հարցեր
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Սեղմեք իսպաներեն տեքստի կամ տարբերակի վրա՝ հայերեն թարգմանությունը տեսնելու համար։
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-right">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 block">Արդյունք (Счёт)</span>
            <div className="text-lg font-bold text-emerald-400 tabular-nums">
              {correctCount} / {answeredCount}{' '}
              <span className="text-xs text-slate-400 font-normal">({answeredCount}/30)</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 transition-colors"
            title="Սկսել նորից (Сбросить)"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Part Filter Bar + Global Translation Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Parts Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedPart('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 ${
              selectedPart === 'all'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Բոլոր 30 հարցերը
          </button>
          {[1, 2, 3, 4, 5, 6].map(partNum => (
            <button
              key={partNum}
              onClick={() => setSelectedPart(partNum)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 flex items-center gap-1.5 ${
                selectedPart === partNum
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <span>{partNames[partNum].icon}</span>
              <span>{partNames[partNum].hy}</span>
            </button>
          ))}
        </div>

        {/* Master reveal toggle */}
        <button
          onClick={() => setShowAllTranslations(!showAllTranslations)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition-colors self-start sm:self-auto shrink-0"
        >
          {showAllTranslations ? <EyeOff className="w-4 h-4 text-emerald-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
          <span>{showAllTranslations ? 'Թաքցնել թարգմանությունները' : 'Բացել բոլոր թարգմանությունները'}</span>
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q) => {
          const userAnswer = userAnswers[q.id];
          const isAnswered = !!userAnswer;
          const isCorrect = isAnswered && userAnswer === q.answer;
          const isQuestionArmenianRevealed = showAllTranslations || revealedQuestions[q.id];

          return (
            <div
              key={q.id}
              className={`bg-slate-900 border rounded-2xl p-5 sm:p-6 transition-all shadow-lg ${
                isAnswered
                  ? isCorrect
                    ? 'border-emerald-500/40 bg-emerald-950/10'
                    : 'border-red-500/40 bg-red-950/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Header & Category */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-400">Հարց #{q.id}</span>
                  <span>·</span>
                  <span>{partNames[q.part].icon} {q.partTitleEs} ({q.partTitleHy})</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => speakSpanish(q.questionEs)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                    title="Լսել իսպաներեն արտասանությունը (Audio)"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleQuestionTranslation(q.id)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Սեղմեք հայերեն թարգմանությունը բացելու համար"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isQuestionArmenianRevealed ? 'Թաքցնել' : 'Թարգմանել'}</span>
                  </button>
                </div>
              </div>

              {/* Spanish Question (Interactive Click to Reveal Armenian) */}
              <div
                onClick={() => toggleQuestionTranslation(q.id)}
                className="cursor-pointer group p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 transition-all mb-4"
                title="Սեղմեք իսպաներեն հարցի վրա՝ հայերեն թարգմանությունը տեսնելու համար"
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-base sm:text-lg">🇪🇸</span>
                  <div className="flex-1">
                    <p className="text-base sm:text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                      {q.questionEs}
                    </p>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      (Սեղմեք տեքստի վրա՝ հայերենը բացելու համար)
                    </span>
                  </div>
                </div>

                {/* Armenian Translation Box */}
                {isQuestionArmenianRevealed && (
                  <div className="mt-3 pt-3 border-t border-slate-800 flex items-start gap-2.5 animate-in fade-in duration-200">
                    <span className="text-base sm:text-lg">🇦🇲</span>
                    <p className="text-sm sm:text-base font-medium text-emerald-300">
                      {q.questionHy}
                    </p>
                  </div>
                )}
              </div>

              {/* Options Grid (A, B, C, D) with separate translation toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {q.options.map(opt => {
                  const isOptionArmenianRevealed = showAllTranslations || revealedOptions[`${q.id}_${opt.key}`];
                  const isSelected = userAnswer === opt.key;
                  const isRightAnswer = q.answer === opt.key;

                  let optCardStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';
                  let badgeStyle = 'bg-slate-900 border-slate-700 text-slate-300';

                  if (isAnswered) {
                    if (isRightAnswer) {
                      optCardStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/30';
                      badgeStyle = 'bg-emerald-600 text-white border-emerald-500';
                    } else if (isSelected) {
                      optCardStyle = 'bg-red-950/40 border-red-500 text-red-200';
                      badgeStyle = 'bg-red-600 text-white border-red-500';
                    } else {
                      optCardStyle = 'bg-slate-950/40 border-slate-900 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <div
                      key={opt.key}
                      onClick={() => handleSelectAnswer(q, opt.key)}
                      className={`relative p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${optCardStyle}`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center border ${badgeStyle}`}>
                              {opt.key}
                            </span>
                            <span className="font-semibold text-sm text-white">
                              {opt.es}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakSpanish(opt.es);
                              }}
                              className="p-1 rounded text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                              title="Լսել արտասանությունը"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={(e) => toggleOptionTranslation(q.id, opt.key, e)}
                              className="p-1 rounded text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                              title="Բացել հայերեն թարգմանությունը"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Armenian translation of option */}
                        {isOptionArmenianRevealed && (
                          <div className="mt-2 pt-2 border-t border-slate-800/80 text-xs font-medium text-emerald-400 animate-in fade-in duration-150">
                            🇦🇲 {opt.hy}
                          </div>
                        )}
                      </div>

                      {/* Status indicator on answer */}
                      {isAnswered && (
                        <div className="mt-2 text-[11px] font-semibold flex items-center gap-1">
                          {isRightAnswer && (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Ճիշտ տարբերակ
                            </span>
                          )}
                          {!isRightAnswer && isSelected && (
                            <span className="text-red-400 flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> Ձեր պատասխանը
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Answer Explanation Bar if Answered */}
              {isAnswered && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-400">Ճիշտ պատասխան՝</span>
                    <span className="font-semibold text-emerald-400">
                      {q.answer}) {q.answerTextEs} — {q.answerTextHy}
                    </span>
                  </div>

                  <button
                    onClick={() => speakSpanish(q.answerTextEs)}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Լսել</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
