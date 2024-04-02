import { GameBoard } from "@/components/game/GameBoard";
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
  const { selectedLetters } = useLetterContext();

  return (
    <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
      <div className="mb-4">
        <h1>Selected Letters</h1>
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
