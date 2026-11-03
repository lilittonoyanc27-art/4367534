import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  POLE_CHUDES_WORD,
  POLE_CHUDES_WORD_TRANSLATION_HY,
  POLE_CHUDES_WORD_MEANING_ES,
  POLE_CHUDES_WORD_MEANING_HY,
  QUIZ_QUESTIONS,
  QuizQuestion,
  WheelSector,
  FOOTBALL_PRIZES,
  FOOTBALL_THEMES
} from './data.ts';
import {
  playCorrect,
  playWrong,
  playBankrupt,
  playFanfare,
  playPrizeSound,
  speakSpanish
} from './sound.ts';
import { WheelCanvas } from './WheelCanvas.tsx';
import {
  Volume2,
  Trophy,
  Gift,
  RotateCcw,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  X,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react';

const SPANISH_ALPHABET = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

type GamePhase =
  | 'SPIN_WHEEL'
  | 'ANSWER_QUESTION'
  | 'PICK_LETTER'
  | 'PLUS_TILE_PICK'
  | 'PRIZE_SELECT'
  | 'VICTORY';

export const PoleChudesGame: React.FC = () => {
  const secretLetters = POLE_CHUDES_WORD.split('');

  // Main Pole Chudes word state
  const [revealedLetters, setRevealedLetters] = useState<Set<string>>(new Set());
  const [guessedWrongLetters, setGuessedWrongLetters] = useState<Set<string>>(new Set());
  const [revealedTileIndices, setRevealedTileIndices] = useState<Set<number>>(new Set());
  const [score, setScore] = useState<number>(0);

  // Wheel & Phase state
  const [activeSector, setActiveSector] = useState<WheelSector | null>(null);
  const [gamePhase, setGamePhase] = useState<GamePhase>('SPIN_WHEEL');
  const [statusMessage, setStatusMessage] = useState<string>(
    'Պտտեք թմբուկը՝ ռաունդը սկսելու համար։'
  );
  const [multiplier, setMultiplier] = useState<number>(1);
  const [wonPrizes, setWonPrizes] = useState<Array<{ nameEs: string; nameHy: string }>>([]);

  // Integrated 30 Questions state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});
  const [revealedOptions, setRevealedOptions] = useState<Record<string, boolean>>({});
  const [showAllTranslations, setShowAllTranslations] = useState<boolean>(false);

  // Word guessing modal
  const [showWordModal, setShowWordModal] = useState<boolean>(false);
  const [wordInput, setWordInput] = useState<string>('');

  // 12 Themes Dictionary Drawer
  const [showThemesDrawer, setShowThemesDrawer] = useState<boolean>(false);
  const [revealedThemesMap, setRevealedThemesMap] = useState<Record<number, boolean>>({});
  const [revealedPhrasesMap, setRevealedPhrasesMap] = useState<Record<string, boolean>>({});

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const answeredQuestionsCount = Object.keys(userAnswers).length;

  // Check if all letters are revealed
  const isWordFullyRevealed = secretLetters.every(
    (letter, idx) => revealedLetters.has(letter) || revealedTileIndices.has(idx)
  );

  // Trigger Victory
  const triggerVictory = () => {
    setGamePhase('VICTORY');
    setStatusMessage('Շնորհավորում ենք! Դուք գուշակեցիք գլխավոր բառը!');
    playFanfare();
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.55 }
    });
  };

  // 1. Wheel Sector Landed
  const handleSectorSelected = (sector: WheelSector) => {
    setActiveSector(sector);

    if (sector.type === 'bankrupt') {
      playBankrupt();
      setScore(0);
      setMultiplier(1);
      setStatusMessage('ՍՆԱՆԿ (Банкрот)! Միավորները զրոյացան։ Անցնում ենք հաջորդ հարցին։');
      // Advance question
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
      setGamePhase('SPIN_WHEEL');
    } else if (sector.type === 'x2') {
      setMultiplier(2);
      setStatusMessage('Սեկտոր «x2»! Ճիշտ պատասխանեք հարցին՝ կրկնակի միավորներ և տառ բացելու համար:');
      setGamePhase('ANSWER_QUESTION');
    } else if (sector.type === 'plus') {
      setStatusMessage('Սեկտոր «+»! Ճիշտ պատասխանեք հարցին՝ գլխավոր բառի ցանկացած տառ բացելու համար:');
      setGamePhase('ANSWER_QUESTION');
    } else if (sector.type === 'prize') {
      playPrizeSound();
      setStatusMessage('Սեկտոր «ՄՐՑԱՆԱԿ» (Приз)! Ճիշտ պատասխանեք հարցին՝ սև արկղը բացելու համար:');
      setGamePhase('ANSWER_QUESTION');
    } else {
      setStatusMessage(`Սեկտոր «${sector.label}» (${sector.value} միավոր)։ Պատասխանեք հարցին տառ բացելու համար:`);
      setGamePhase('ANSWER_QUESTION');
    }
  };

  // 2. Answering the Question
  const handleAnswerQuestion = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (gamePhase !== 'ANSWER_QUESTION') return;

    const isCorrect = optionKey === currentQuestion.answer;
    setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: optionKey }));

    // Auto reveal translations for clarity
    setRevealedQuestions(prev => ({ ...prev, [currentQuestion.id]: true }));
    setRevealedOptions(prev => ({
      ...prev,
      [`${currentQuestion.id}_${optionKey}`]: true,
      [`${currentQuestion.id}_${currentQuestion.answer}`]: true
    }));

    if (isCorrect) {
      playCorrect();
      const sectorVal = activeSector?.value || 300;
      const earned = sectorVal * multiplier;
      setScore(prev => prev + earned);

      if (activeSector?.type === 'plus') {
        setStatusMessage('Ճիշտ պատասխան! Սեկտոր «+»՝ ընտրեք ցանկացած փակ տառ գլխավոր բառի տախտակից։');
        setGamePhase('PLUS_TILE_PICK');
      } else if (activeSector?.type === 'prize') {
        setStatusMessage('Ճիշտ պատասխան! Ընտրեք՝ վերցնե՞լ սև արկղի ֆուտբոլային մրցանակը, թե՞ 1000 միավոր։');
        setGamePhase('PRIZE_SELECT');
      } else {
        setStatusMessage(`Ճիշտ պատասխան (+${earned} միավոր)! Այժմ ընտրեք տառ այբուբենից գլխավոր բառի համար:`);
        setGamePhase('PICK_LETTER');
      }
    } else {
      playWrong();
      setStatusMessage(`Սխալ պատասխան (ճիշտը՝ ${currentQuestion.answer})։ Պտտեք թմբուկը հաջորդ հարցի համար։`);
      setMultiplier(1);
      // Auto advance to next question
      if (currentQuestionIndex < totalQuestions - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(prev => prev + 1);
          setGamePhase('SPIN_WHEEL');
        }, 1800);
      } else {
        setGamePhase('SPIN_WHEEL');
      }
    }
  };

  // 3. Picking a letter for the main word AFICIONADO
  const handleLetterClick = (letter: string) => {
    if (gamePhase !== 'PICK_LETTER') return;
    if (revealedLetters.has(letter) || guessedWrongLetters.has(letter)) return;

    if (secretLetters.includes(letter)) {
      const count = secretLetters.filter(l => l === letter).length;
      const bonusPts = 200 * count;
      setScore(prev => prev + bonusPts);
      setMultiplier(1);

      const nextRevealed = new Set(revealedLetters);
      nextRevealed.add(letter);
      setRevealedLetters(nextRevealed);
      playCorrect();

      const allFound = secretLetters.every(
        (l, idx) => nextRevealed.has(l) || revealedTileIndices.has(idx)
      );

      if (allFound) {
        triggerVictory();
      } else {
        setStatusMessage(`Բացվեց «${letter}» տառը (${count} հատ, +${bonusPts} միավոր)։ Պտտեք թմբուկը հաջորդ ռաունդի համար։`);
        // Next question
        if (currentQuestionIndex < totalQuestions - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        }
        setGamePhase('SPIN_WHEEL');
      }
    } else {
      playWrong();
      setMultiplier(1);
      const nextWrong = new Set(guessedWrongLetters);
      nextWrong.add(letter);
      setGuessedWrongLetters(nextWrong);
      setStatusMessage(`«${letter}» տառը չկա գլխավոր բառում։ Պտտեք թմբուկը հաջորդ հարցի համար։`);
      // Next question
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
      setGamePhase('SPIN_WHEEL');
    }
  };

  // 4. Sector '+' Tile Click: Pick any tile directly
  const handlePlusTileClick = (index: number) => {
    if (gamePhase !== 'PLUS_TILE_PICK') return;
    const letter = secretLetters[index];
    if (revealedLetters.has(letter) || revealedTileIndices.has(index)) return;

    const nextIndices = new Set(revealedTileIndices);
    nextIndices.add(index);
    setRevealedTileIndices(nextIndices);

    const nextRevealed = new Set(revealedLetters);
    nextRevealed.add(letter);
    setRevealedLetters(nextRevealed);

    playCorrect();

    const allFound = secretLetters.every(
      (l, idx) => nextRevealed.has(l) || nextIndices.has(idx)
    );

    if (allFound) {
      triggerVictory();
    } else {
      setStatusMessage(`Սեկտոր «+»-ով բացվեց «${letter}» տառը! Պտտեք թմբուկը հաջորդ ռաունդի համար։`);
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
      setGamePhase('SPIN_WHEEL');
    }
  };

  // 5. Prize choice
  const handlePrizeDecision = (takeBox: boolean) => {
    if (takeBox) {
      const prize = FOOTBALL_PRIZES[Math.floor(Math.random() * FOOTBALL_PRIZES.length)];
      setWonPrizes(prev => [...prev, prize]);
      setStatusMessage(`Շահեցիք մրցանակ՝ «${prize.nameHy}» (${prize.nameEs})!`);
      playPrizeSound();
    } else {
      setScore(prev => prev + 1000);
      setStatusMessage('Վերցրիք 1000 միավոր! Շարունակեք խաղը։');
      playCorrect();
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
    setGamePhase('SPIN_WHEEL');
  };

  // 6. Direct guess of the whole word
  const handleGuessWholeWord = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = wordInput.trim().toUpperCase();
    if (!clean) return;

    if (clean === POLE_CHUDES_WORD) {
      const allSet = new Set(secretLetters);
      setRevealedLetters(allSet);
      setScore(prev => prev + 3000);
      setShowWordModal(false);
      setWordInput('');
      triggerVictory();
    } else {
      playWrong();
      setStatusMessage(`«${clean}» սխալ է! Խաղը շարունակվում է։`);
      setShowWordModal(false);
      setWordInput('');
    }
  };

  // Restart
  const handleRestart = () => {
    setRevealedLetters(new Set());
    setGuessedWrongLetters(new Set());
    setRevealedTileIndices(new Set());
    setScore(0);
    setMultiplier(1);
    setActiveSector(null);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setRevealedQuestions({});
    setRevealedOptions({});
    setShowAllTranslations(false);
    setGamePhase('SPIN_WHEEL');
    setStatusMessage('Պտտեք թմբուկը՝ ռաունդը սկսելու համար։');
    setShowWordModal(false);
    setWordInput('');
  };

  // Navigation helpers for 30 questions
  const handleJumpToQuestion = (idx: number) => {
    setCurrentQuestionIndex(idx);
    if (gamePhase !== 'SPIN_WHEEL' && gamePhase !== 'VICTORY') {
      setStatusMessage(`Տեղափոխվեցիք Հարց #${idx + 1}: Պտտեք թմբուկը նոր ռաունդի համար։`);
      setGamePhase('SPIN_WHEEL');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Studio Top Banner: Scoreboard, Question Tracker, Dictionary Trigger */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl text-emerald-400">
            ⚽
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Դաշտ Հրաշքների</span>
              <span className="text-xs text-slate-400 font-normal">· Поле Чудес & 30 հարց</span>
            </h1>
            <p className="text-xs text-slate-400">
              Պտտեք թմբուկը, պատասխանեք հարցերին և բացեք գլխավոր բառի տառերը
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* 12 Themes Dictionary Button */}
          <button
            onClick={() => setShowThemesDrawer(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-200 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>12 Թեմաներ (Справочник)</span>
          </button>

          {/* Score Counter */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Միավորներ (Очки)</span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums">{score}</span>
          </div>

          {/* Reset */}
          <button
            onClick={handleRestart}
            className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-300 transition-colors"
            title="Վերսկսել խաղը (Начать заново)"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Studio Word Board: 10 closed tiles for AFICIONADO without hints */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-7 text-center shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5 tracking-wider uppercase">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>ԳԼԽԱՎՈՐ ԲԱՌ (10 ՏԱՌ) · ГЛАВНОЕ СЛОВО</span>
          </div>

          <button
            onClick={() => setShowWordModal(true)}
            disabled={gamePhase === 'VICTORY'}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors"
          >
            Ասել ամբողջ բառը (Назвать слово)
          </button>
        </div>

        {/* Tiles */}
        <div className="my-5 flex flex-wrap justify-center items-center gap-2 sm:gap-3">
          {secretLetters.map((letter, index) => {
            const isRevealed = revealedLetters.has(letter) || revealedTileIndices.has(index) || gamePhase === 'VICTORY';
            const isSelectableForPlus = gamePhase === 'PLUS_TILE_PICK' && !isRevealed;

            return (
              <div
                key={index}
                onClick={() => isSelectableForPlus && handlePlusTileClick(index)}
                className={`w-10 h-14 sm:w-14 sm:h-20 rounded-xl flex items-center justify-center font-display text-2xl sm:text-4xl font-black uppercase transition-all duration-300 shadow-lg ${
                  isRevealed
                    ? 'bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border-2 border-emerald-300 scale-100 shadow-emerald-900/50'
                    : isSelectableForPlus
                    ? 'bg-amber-500/20 text-amber-300 border-2 border-dashed border-amber-400 cursor-pointer animate-pulse hover:scale-105'
                    : 'bg-slate-800 text-transparent border-2 border-slate-700 shadow-inner'
                }`}
                title={isSelectableForPlus ? 'Սեղմեք այս տառը բացելու համար' : undefined}
              >
                {isRevealed ? letter : '?'}
              </div>
            );
          })}
        </div>

        {/* Live Studio Status Banner */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
          <span>{statusMessage}</span>
        </div>
      </div>

      {/* VICTORY Celebration Card */}
      {gamePhase === 'VICTORY' && (
        <div className="bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-3xl mb-3">
            🏆
          </div>
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block mb-1">
            ՀԱՂԹԱՆԱԿ · VICTORIA · ПОБЕДА
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-wide mb-2">
            {POLE_CHUDES_WORD}
          </h2>

          <div className="flex items-center justify-center gap-2 mb-4">
            <button
              onClick={() => speakSpanish(POLE_CHUDES_WORD)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Լսել արտասանությունը (Pronunciación)</span>
            </button>
          </div>

          <div className="max-w-lg mx-auto bg-slate-900/90 border border-slate-800 rounded-xl p-4 text-left space-y-2 mb-6">
            <div className="text-sm font-bold text-emerald-400">
              Հայերեն թարգմանություն՝ <span className="text-white">{POLE_CHUDES_WORD_TRANSLATION_HY}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-slate-400">Իմաստը (ES):</span> {POLE_CHUDES_WORD_MEANING_ES}
            </p>
            <p className="text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-slate-400">Իմաստը (HY):</span> {POLE_CHUDES_WORD_MEANING_HY}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition-transform active:scale-95"
          >
            Խաղալ կրկին (Jugar de nuevo)
          </button>
        </div>
      )}

      {/* Sector Prize Selection Card */}
      {gamePhase === 'PRIZE_SELECT' && (
        <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-6 text-center shadow-xl animate-in fade-in duration-200">
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
            <Gift className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-amber-300 mb-1">
            ՍԵԿՏՈՐ «ՄՐՑԱՆԱԿ» (ПРИЗ В СТУДИЮ!)
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto mb-5">
            Դուք կարող եք ընտրել՝ բացել ֆուտբոլային սև արկղի անակնկալ մրցանակը, թե՞ ավելացնել 1000 միավոր ձեր հաշվին։
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handlePrizeDecision(true)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-950/50 transition-transform active:scale-95"
            >
              🎁 Բացել սև արկղը (Մրցանակ)
            </button>
            <button
              onClick={() => handlePrizeDecision(false)}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors"
            >
              💰 Վերցնել 1000 միավոր
            </button>
          </div>
        </div>
      )}

      {/* Won Prizes Bar */}
      {wonPrizes.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 sm:p-4 flex items-center gap-3">
          <span className="text-xs uppercase font-bold text-amber-400 whitespace-nowrap">
            🎁 Շահած մրցանակներ՝
          </span>
          <div className="flex flex-wrap gap-2">
            {wonPrizes.map((p, i) => (
              <span key={i} className="text-xs bg-slate-950 border border-amber-500/30 rounded-lg px-2.5 py-1 text-slate-200">
                {p.nameHy} <span className="text-slate-400">({p.nameEs})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Unified Stage Grid: Wheel Drum (Left) + Current Question & Alphabet (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Drum Wheel */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-3 border-b border-slate-800 pb-2">
            <span className="font-semibold text-slate-300 uppercase tracking-wider">Խաղային թմբուկ</span>
            <span className="text-emerald-400 font-medium">
              {gamePhase === 'SPIN_WHEEL' ? 'Հերթը ձերն է՝ պտտեք!' : 'Թմբուկը կանգնած է'}
            </span>
          </div>

          <WheelCanvas
            onSectorSelected={handleSectorSelected}
            disabled={gamePhase !== 'SPIN_WHEEL'}
          />

          {/* Question Stepper / Progress inside wheel card */}
          <div className="w-full mt-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Հարցերի ընթացքը</span>
              <span className="text-emerald-400 font-bold tabular-nums">
                {currentQuestionIndex + 1} / {totalQuestions}
              </span>
            </div>

            {/* Stepper Dots (1-30) */}
            <div className="flex flex-wrap gap-1">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isCurrent = idx === currentQuestionIndex;
                let dotStyle = 'bg-slate-800 text-slate-500 hover:bg-slate-700';

                if (ans) {
                  dotStyle = ans === q.answer ? 'bg-emerald-600 text-white' : 'bg-red-600/70 text-white';
                }
                if (isCurrent) {
                  dotStyle += ' ring-2 ring-emerald-400 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`w-6 h-6 rounded text-[10px] flex items-center justify-center transition-all ${dotStyle}`}
                    title={`Հարց ${q.id}: ${q.partTitleHy}`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Question of the Round (with Click-to-Reveal Translations) + Spanish Alphabet */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Question Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            {/* Question Header & Category */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                  Հարց {currentQuestion.id} / 30
                </span>
                <span>·</span>
                <span className="text-slate-300 font-medium">{currentQuestion.partTitleEs}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakSpanish(currentQuestion.questionEs)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800 transition-colors"
                  title="Լսել իսպաներեն արտասանությունը (Audio)"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setRevealedQuestions(prev => ({ ...prev, [currentQuestion.id]: !prev[currentQuestion.id] }))
                  }
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Սեղմեք հայերեն թարգմանությունը բացելու համար"
                >
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    {showAllTranslations || revealedQuestions[currentQuestion.id] ? 'Թաքցնել' : 'Թարգմանել'}
                  </span>
                </button>
              </div>
            </div>

            {/* Spanish Question: Click to Reveal Armenian Translation */}
            <div
              onClick={() =>
                setRevealedQuestions(prev => ({ ...prev, [currentQuestion.id]: !prev[currentQuestion.id] }))
              }
              className="cursor-pointer group p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all mb-4"
              title="Սեղմեք իսպաներեն հարցի վրա՝ հայերեն թարգմանությունը տեսնելու համար"
            >
              <div className="flex items-start gap-2.5">
                <span className="text-base">🇪🇸</span>
                <div className="flex-1">
                  <p className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {currentQuestion.questionEs}
                  </p>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    (Սեղմեք տեքստի վրա՝ հայերենը բացելու համար)
                  </span>
                </div>
              </div>

              {/* Armenian Question Translation */}
              {(showAllTranslations || revealedQuestions[currentQuestion.id]) && (
                <div className="mt-2.5 pt-2.5 border-t border-slate-800 flex items-start gap-2.5 animate-in fade-in duration-150">
                  <span className="text-base">🇦🇲</span>
                  <p className="text-sm font-medium text-emerald-300">
                    {currentQuestion.questionHy}
                  </p>
                </div>
              )}
            </div>

            {/* 4 Options Grid (A, B, C, D) with separate translation toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
              {currentQuestion.options.map(opt => {
                const optKey = `${currentQuestion.id}_${opt.key}`;
                const isOptionArmenianRevealed = showAllTranslations || revealedOptions[optKey];
                const answered = userAnswers[currentQuestion.id];
                const isSelected = answered === opt.key;
                const isRight = currentQuestion.answer === opt.key;

                let cardBg = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200';
                let badgeBg = 'bg-slate-900 border-slate-700 text-slate-300';

                if (answered) {
                  if (isRight) {
                    cardBg = 'bg-emerald-950/40 border-emerald-500 text-emerald-200';
                    badgeBg = 'bg-emerald-600 text-white border-emerald-500';
                  } else if (isSelected) {
                    cardBg = 'bg-red-950/40 border-red-500 text-red-200';
                    badgeBg = 'bg-red-600 text-white border-red-500';
                  } else {
                    cardBg = 'bg-slate-950/50 border-slate-900 text-slate-400 opacity-60';
                  }
                }

                return (
                  <div
                    key={opt.key}
                    onClick={() => handleAnswerQuestion(opt.key)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${cardBg}`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded text-xs font-bold flex items-center justify-center border ${badgeBg}`}>
                            {opt.key}
                          </span>
                          <span className="font-semibold text-xs sm:text-sm text-white">
                            {opt.es}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              speakSpanish(opt.es);
                            }}
                            className="p-1 text-slate-400 hover:text-emerald-400 transition-colors"
                            title="Լսել արտասանությունը"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setRevealedOptions(prev => ({ ...prev, [optKey]: !prev[optKey] }));
                            }}
                            className="p-1 text-slate-400 hover:text-emerald-400 transition-colors"
                            title="Բացել հայերեն թարգմանությունը"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Armenian translation of option */}
                      {isOptionArmenianRevealed && (
                        <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 text-[11px] font-medium text-emerald-400 animate-in fade-in duration-150">
                          🇦🇲 {opt.hy}
                        </div>
                      )}
                    </div>

                    {answered && (
                      <div className="mt-1.5 text-[11px] font-semibold flex items-center gap-1">
                        {isRight && (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Ճիշտ է
                          </span>
                        )}
                        {!isRight && isSelected && (
                          <span className="text-red-400 flex items-center gap-1">
                            <XCircle className="w-3 h-3" /> Ձեր ընտրությունը
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next / Previous Question buttons */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <button
                onClick={() => handleJumpToQuestion(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Նախորդը</span>
              </button>

              <button
                onClick={() => setShowAllTranslations(!showAllTranslations)}
                className="text-[11px] text-slate-400 hover:text-white transition-colors"
              >
                {showAllTranslations ? 'Թաքցնել բոլոր թարգմանությունները' : 'Բացել բոլոր թարգմանությունները'}
              </button>

              <button
                onClick={() => handleJumpToQuestion(Math.min(totalQuestions - 1, currentQuestionIndex + 1))}
                disabled={currentQuestionIndex === totalQuestions - 1}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-800 disabled:opacity-40 transition-colors"
              >
                <span>Հաջորդը</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Spanish Alphabet Keyboard: Pick Letter when gamePhase is PICK_LETTER */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 border-b border-slate-800 pb-2">
              <span className="font-semibold text-slate-300 uppercase tracking-wider">
                Իսպաներեն այբուբեն (Տառերի ընտրություն)
              </span>
              <span>
                {gamePhase === 'PICK_LETTER' ? (
                  <span className="text-amber-400 font-bold animate-pulse">Ընտրեք տառ գլխավոր բառի համար!</span>
                ) : (
                  'Ակտիվանում է հարցի ճիշտ պատասխանից հետո'
                )}
              </span>
            </div>

            <div className="grid grid-cols-7 sm:grid-cols-9 gap-1.5">
              {SPANISH_ALPHABET.map((char) => {
                const isGuessedRight = revealedLetters.has(char);
                const isGuessedWrong = guessedWrongLetters.has(char);
                const isActionable = gamePhase === 'PICK_LETTER' && !isGuessedRight && !isGuessedWrong;

                let btnStyle = 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 cursor-not-allowed';
                if (isGuessedRight) {
                  btnStyle = 'bg-emerald-600/20 border-emerald-500 text-emerald-400 font-bold';
                } else if (isGuessedWrong) {
                  btnStyle = 'bg-slate-950 border-red-500/30 text-red-400/40 line-through';
                } else if (isActionable) {
                  btnStyle = 'bg-slate-800 hover:bg-emerald-600 text-white hover:text-white border-slate-700 font-bold cursor-pointer active:scale-95 shadow';
                }

                return (
                  <button
                    key={char}
                    onClick={() => handleLetterClick(char)}
                    disabled={!isActionable}
                    className={`h-9 sm:h-10 rounded-lg border text-sm font-display transition-all duration-150 flex items-center justify-center ${btnStyle}`}
                  >
                    {char}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Naming the Entire Word */}
      {showWordModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowWordModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-5">
              <span className="text-2xl mb-1 block">🏆</span>
              <h3 className="text-lg font-bold text-white">Ասել ամբողջ բառը (10 տառ)</h3>
              <p className="text-xs text-slate-400 mt-1">
                Եթե գուշակեք, կստանաք +3000 միավոր և ակնթարթային հաղթանակ!
              </p>
            </div>

            <form onSubmit={handleGuessWholeWord} className="space-y-4">
              <input
                type="text"
                maxLength={10}
                value={wordInput}
                onChange={e => setWordInput(e.target.value.toUpperCase())}
                placeholder="A F I C I O N A D O..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono tracking-widest text-center text-lg uppercase focus:outline-none focus:border-amber-400"
                autoFocus
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowWordModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Չեղարկել
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
                >
                  Հաստատել
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 12 Themes Dictionary Drawer Modal */}
      {showThemesDrawer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl relative">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-0.5">
                  ⚽ 12 TEMAS DE FÚTBOL
                </span>
                <h3 className="text-lg font-bold text-white">
                  Ֆուտբոլային Թեմաներ և Բառապաշար
                </h3>
              </div>
              <button
                onClick={() => setShowThemesDrawer(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable list */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              <p className="text-xs text-slate-400">
                Սեղմեք իսպաներեն թեմայի կամ արտահայտության վրա՝ հայերեն թարգմանությունը բացելու համար:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {FOOTBALL_THEMES.map(theme => {
                  const isThemeRevealed = revealedThemesMap[theme.id];

                  return (
                    <div
                      key={theme.id}
                      className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                          <span className="font-bold text-emerald-400">#{theme.id}</span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => speakSpanish(theme.es)}
                              className="p-1 hover:text-emerald-400 transition-colors"
                              title="Լսել"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() =>
                                setRevealedThemesMap(prev => ({ ...prev, [theme.id]: !prev[theme.id] }))
                              }
                              className="p-1 hover:text-emerald-400 transition-colors"
                              title="Թարգմանել"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div
                          onClick={() =>
                            setRevealedThemesMap(prev => ({ ...prev, [theme.id]: !prev[theme.id] }))
                          }
                          className="cursor-pointer group"
                        >
                          <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                            🇪🇸 {theme.es}
                          </div>
                          {isThemeRevealed && (
                            <div className="mt-1 text-xs font-semibold text-emerald-400 animate-in fade-in duration-150">
                              🇦🇲 {theme.hy}
                            </div>
                          )}
                        </div>

                        {/* Sample phrases */}
                        <div className="mt-3 space-y-1.5 border-t border-slate-800/80 pt-2">
                          {theme.phrases.map((phrase, pIdx) => {
                            const pKey = `${theme.id}_${pIdx}`;
                            const isPRevealed = revealedPhrasesMap[pKey];

                            return (
                              <div
                                key={pIdx}
                                onClick={() =>
                                  setRevealedPhrasesMap(prev => ({ ...prev, [pKey]: !prev[pKey] }))
                                }
                                className="cursor-pointer text-xs p-1.5 rounded bg-slate-900 border border-slate-800/60"
                              >
                                <div className="text-slate-200">{phrase.es}</div>
                                {isPRevealed && (
                                  <div className="text-emerald-400 font-medium text-[11px] mt-0.5">
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

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowThemesDrawer(false)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
              >
                Վերադառնալ խաղին
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
