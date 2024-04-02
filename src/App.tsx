import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LetterContextProvider,
  useLetterContext,
} from "@/context/LetterContext";
import cn from "clsx";

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

interface LetterButtonProps {
  letter: string;
  className?: string;
}

function LetterButton({ letter, className }: LetterButtonProps) {
  const { handleSelectLetter } = useLetterContext();

  return (
    <Button
      onClick={() => {
        handleSelectLetter(letter);
      }}
      className={cn("m-2 min-h-10 min-w-10 rounded-full", className)}
    >
      {letter}
    </Button>
  );
}

const letterPositions = [
  { letter: "A", position: { column: 2, row: 1 } },
  { letter: "B", position: { column: 3, row: 1 } },
  { letter: "C", position: { column: 4, row: 1 } },
  { letter: "D", position: { column: 2, row: 5 } },
  { letter: "E", position: { column: 3, row: 5 } },
  { letter: "F", position: { column: 4, row: 5 } },
  { letter: "G", position: { column: 1, row: 2 } },
  { letter: "H", position: { column: 1, row: 3 } },
  { letter: "I", position: { column: 1, row: 4 } },
  { letter: "J", position: { column: 5, row: 2 } },
  { letter: "K", position: { column: 5, row: 3 } },
  { letter: "L", position: { column: 5, row: 4 } },
];

export function GameBoard() {
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden">
      <Card>
        <div className="grid grid-cols-5 grid-rows-5 gap-4">
          {letterPositions.map(({ letter, position }) => (
            <div
              key={letter}
              className="flex items-center justify-center"
              style={{ gridColumn: position.column, gridRow: position.row }}
            >
              <LetterButton letter={letter} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
