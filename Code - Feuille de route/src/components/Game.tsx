import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface RoomProps {
  letters: string[];
  setLetters: (letters: string[]) => void;
}

interface LetterValidation {
  value: string;
  isValid: boolean | null;
  disabled: boolean;
}

function Game() {
  const [letters, setLetters] = useState<string[]>([]);
  const [finalWord, setFinalWord] = useState('');
  const [hasWon, setHasWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const checkWin = (word: string) => {
    if (word.toLowerCase() === 'coulisses') {
      setHasWon(true);
      setShowConfetti(true);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} onConfettiComplete={() => setShowConfetti(false)} />}
      
      <div className="sticky top-0 z-50 bg-black/90 p-6 rounded-lg mb-8 backdrop-blur-sm border border-red-900/50">
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">Votre sac à lettres</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {letters.map((letter, index) => (
            <div key={index} className="w-10 h-10 flex items-center justify-center bg-red-700 rounded-lg text-white font-bold shadow-lg transform hover:scale-105 transition-transform">
              {letter}
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Mot final :</label>
          <input
            type="text"
            value={finalWord}
            onChange={(e) => {
              setFinalWord(e.target.value);
              checkWin(e.target.value);
            }}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            placeholder="Entrez le mot final..."
          />
        </div>

        {hasWon && (
          <div className="mt-4 p-4 bg-green-600 rounded-lg flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            <p className="font-bold">
              Vous avez gagné au jeu Mystère au Théâtre ! Montrez ce message à l'accueil et tournez la roue !
            </p>
          </div>
        )}
      </div>

      <div className="space-y-8">
        <Room1 letters={letters} setLetters={setLetters} />
        <Room2 letters={letters} setLetters={setLetters} />
        <Room3 letters={letters} setLetters={setLetters} />
        <Room4 letters={letters} setLetters={setLetters} />
        <Room5 letters={letters} setLetters={setLetters} />
      </div>
    </div>
  );
}

function Room1({ letters, setLetters }: RoomProps) {
  const [answer, setAnswer] = useState('');
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState(false);

  const checkAnswer = (value: string) => {
    if (value.toLowerCase() === 'l') {
      setLetters([...letters, 'L']);
      setSolved(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Couloir & Sanitaires</h3>
      <p className="mb-4">Une énigme est affichée dans les sanitaires. Réponse à écrire dans l'encadré pour obtenir la lettre.</p>
      
      {!solved ? (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setError(false);
              }}
              className={`flex-1 p-2 bg-gray-800 border rounded-md text-white ${
                error ? 'border-red-500' : 'border-gray-700'
              }`}
              maxLength={1}
            />
            <button
              onClick={() => checkAnswer(answer)}
              className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md"
            >
              Valider
            </button>
          </div>
          {error && (
            <div className="mt-2 text-red-500 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Mauvaise réponse, essayez encore !</span>
            </div>
          )}
        </>
      ) : (
        <div className="text-green-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Bonne réponse ! La lettre L s'est ajoutée dans votre sac à lettres.</span>
        </div>
      )}
    </div>
  );
}

function Room2({ letters, setLetters }: RoomProps) {
  const [answers, setAnswers] = useState<LetterValidation[]>([
    { value: '', isValid: null, disabled: false },
    { value: '', isValid: null, disabled: false }
  ]);
  const [error, setError] = useState(false);

  const correctLetters = ['U', 'I'];
  const validatedLetters = new Set(letters);

  const validateLetter = (letter: string): boolean => {
    return correctLetters.includes(letter.toUpperCase()) && !validatedLetters.has(letter.toUpperCase());
  };

  const checkAnswers = () => {
    const newAnswers = answers.map(answer => {
      const isValid = validateLetter(answer.value);
      return {
        ...answer,
        isValid,
        disabled: isValid
      };
    });

    setAnswers(newAnswers);
    
    const validLetters = newAnswers
      .filter(answer => answer.isValid)
      .map(answer => answer.value.toUpperCase());

    if (validLetters.length > 0) {
      setLetters([...letters, ...validLetters]);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Loges & Coulisses</h3>
      <p className="mb-4">Intéressez vous à une des maquilleuses. Posez lui la bonne question concernant le théâtre en général, elle vous donnera deux lettres.</p>
      
      <div className="flex gap-2">
        {answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            value={answer.value}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[index] = {
                ...answer,
                value: e.target.value,
                isValid: null
              };
              setAnswers(newAnswers);
              setError(false);
            }}
            disabled={answer.disabled}
            className={`w-12 p-2 bg-gray-800 border rounded-md text-white text-center ${
              answer.isValid === null
                ? 'border-gray-700'
                : answer.isValid
                ? 'border-green-500 bg-green-900/20'
                : 'border-red-500 bg-red-900/20'
            } ${answer.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            maxLength={1}
          />
        ))}
        <button
          onClick={checkAnswers}
          className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md"
        >
          Valider
        </button>
      </div>
      {error && (
        <div className="mt-2 text-red-500 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>Aucune lettre correcte trouvée, essayez encore !</span>
        </div>
      )}
    </div>
  );
}

function Room3({ letters, setLetters }: RoomProps) {
  const [musicAnswer, setMusicAnswer] = useState('');
  const [sceneAnswer, setSceneAnswer] = useState('');
  const [musicSolved, setMusicSolved] = useState(false);
  const [sceneSolved, setSceneSolved] = useState(false);
  const [musicError, setMusicError] = useState(false);
  const [sceneError, setSceneError] = useState(false);

  const composers = [
    'mozart', 'wolfgang amadeus mozart',
    'beethoven', 'ludwig van beethoven',
    'bach', 'johann sebastian bach',
    'tchaikovsky', 'pyotr ilyich tchaikovsky',
    'chopin', 'frederic chopin'
  ];

  const checkMusicAnswer = () => {
    if (composers.includes(musicAnswer.toLowerCase())) {
      setLetters([...letters, 'S']);
      setMusicSolved(true);
      setMusicError(false);
    } else {
      setMusicError(true);
    }
  };

  const checkSceneAnswer = () => {
    const answer = sceneAnswer.toLowerCase();
    if (answer === 'shakespeare' || answer === 'william shakespeare') {
      setLetters([...letters, 'S']);
      setSceneSolved(true);
      setSceneError(false);
    } else {
      setSceneError(true);
    }
  };

  return (
    <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Scène</h3>
      
      <div className="space-y-6">
        <div>
          <p className="mb-4">Trouvez l'auteur de la musique que vous entendez ici. Écrivez une bonne réponse pour obtenir une lettre.</p>
          {!musicSolved ? (
            <>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={musicAnswer}
                  onChange={(e) => {
                    setMusicAnswer(e.target.value);
                    setMusicError(false);
                  }}
                  className={`flex-1 p-2 bg-gray-800 border rounded-md text-white ${
                    musicError ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                <button
                  onClick={checkMusicAnswer}
                  className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md"
                >
                  Valider
                </button>
              </div>
              {musicError && (
                <div className="mt-2 text-red-500 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Mauvaise réponse, essayez encore !</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-green-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Bonne réponse ! La lettre S s'est ajoutée dans votre sac à lettres.</span>
            </div>
          )}
        </div>

        <div>
          <p className="mb-4">Trouvez la question affichée sur la scène. Écrivez la bonne réponse dans l'encadré pour obtenir une lettre.</p>
          {!sceneSolved ? (
            <>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={sceneAnswer}
                  onChange={(e) => {
                    setSceneAnswer(e.target.value);
                    setSceneError(false);
                  }}
                  className={`flex-1 p-2 bg-gray-800 border rounded-md text-white ${
                    sceneError ? 'border-red-500' : 'border-gray-700'
                  }`}
                />
                <button
                  onClick={checkSceneAnswer}
                  className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md"
                >
                  Valider
                </button>
              </div>
              {sceneError && (
                <div className="mt-2 text-red-500 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Mauvaise réponse, essayez encore !</span>
                </div>
              )}
            </>
          ) : (
            <div className="text-green-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Bonne réponse ! La lettre S s'est ajoutée dans votre sac à lettres.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Room4({ letters, setLetters }: RoomProps) {
  const [answers, setAnswers] = useState<LetterValidation[]>([
    { value: '', isValid: null, disabled: false },
    { value: '', isValid: null, disabled: false },
    { value: '', isValid: null, disabled: false }
  ]);
  const [error, setError] = useState(false);

  const correctLetters = ['S', 'O', 'E'];
  const validatedLetters = new Set(letters);

  const validateLetter = (letter: string): boolean => {
    return correctLetters.includes(letter.toUpperCase()) && !validatedLetters.has(letter.toUpperCase());
  };

  const checkAnswers = () => {
    const newAnswers = answers.map(answer => {
      const isValid = validateLetter(answer.value);
      return {
        ...answer,
        isValid,
        disabled: isValid
      };
    });

    setAnswers(newAnswers);
    
    const validLetters = newAnswers
      .filter(answer => answer.isValid)
      .map(answer => answer.value.toUpperCase());

    if (validLetters.length > 0) {
      setLetters([...letters, ...validLetters]);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Public</h3>
      <p className="mb-4">Trouvez les lettres parmi les sièges, au sol. Il y en a trois.</p>
      
      <div className="flex gap-2">
        {answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            value={answer.value}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[index] = {
                ...answer,
                value: e.target.value,
                isValid: null
              };
              setAnswers(newAnswers);
              setError(false);
            }}
            disabled={answer.disabled}
            className={`w-12 p-2 bg-gray-800 border rounded-md text-white text-center ${
              answer.isValid === null
                ? 'border-gray-700'
                : answer.isValid
                ? 'border-green-500 bg-green-900/20'
                : 'border-red-500 bg-red-900/20'
            } ${answer.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            maxLength={1}
          />
        ))}
        <button
          onClick={checkAnswers}
          className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md"
        >
          Valider
        </button>
      </div>
      {error && (
        <div className="mt-2 text-red-500 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>Aucune lettre correcte trouvée, essayez encore !</span>
        </div>
      )}
    </div>
  );
}

function Room5({ letters, setLetters }: RoomProps) {
  const [answer, setAnswer] = useState('');
  const [solved, setSolved] = useState(false);
  const [error, setError] = useState(false);

  const checkAnswer = () => {
    if (answer.toLowerCase() === 'c') {
      setLetters([...letters, 'C']);
      setSolved(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="bg-black/50 p-6 rounded-lg backdrop-blur-sm">
      <h3 className="text-xl font-bold mb-4 text-yellow-400">Régie & Bureau</h3>
      <p className="mb-4">5 images une pièce de théâtre. Retrouvez la première lettre du nom de cette pièce de théâtre.</p>
      
      {!solved ? (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
                setError(false);
              }}
              className={`flex-1 p-2 bg-gray-800 border rounded-md text-white ${
                error ? 'border-red-500' : 'border-gray-700'
              }`}
              maxLength={1}
            />
            <button
              onClick={checkAnswer}
              className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md"
            >
              Valider
            </button>
          </div>
          {error && (
            <div className="mt-2 text-red-500 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Mauvaise réponse, essayez encore !</span>
            </div>
          )}
        </>
      ) : (
        <div className="text-green-400 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Bonne réponse ! La lettre C s'est ajoutée dans votre sac à lettres.</span>
        </div>
      )}
    </div>
  );
}

export default Game;