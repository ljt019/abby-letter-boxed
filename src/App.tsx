import { GameBoard } from "@/components/game/GameBoard";
import { Button } from "@/components/ui/button";
import {
  LetterContextProvider,
  useLetterContext,
} from "@/context/LetterContext";

export default function App() {
  return (
    <LetterContextProvider>
      <AppContent />
    </LetterContextProvider>
  );
}

function AppContent() {
  const { selectedLetters, usedLettersInWord, words, resetGame } =
    useLetterContext();

  if (usedLettersInWord.length === 12) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div>Game Over!</div>
        <div className="mt-4">Used Words:</div>
        <div>{words.join(", ")}</div>
        <div className="my-2">
          It took you {words.length} {words.length > 1 ? "words" : "word"}!
        </div>
        <Button
          onClick={() => {
            resetGame();
          }}
        >
          Restart
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
      <div className="mb-4">
        <h1>Selected Letters:</h1>
        <div>
          {selectedLetters.map((letter, index) => (
            <span key={index} className="mr-2">
              {letter}
            </span>
          ))}
        </div>
      </div>
      <GameBoard />
    </div>
  );
}
