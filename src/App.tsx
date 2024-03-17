import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useLetterContext,
  LetterContextProvider,
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
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
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
}

function LetterButton({ letter }: LetterButtonProps) {
  const { handleSelectLetter } = useLetterContext();

  return (
    <Button
      onClick={() => {
        handleSelectLetter(letter);
      }}
      className={"m-2 rounded-full min-h-10 min-w-10"}
    >
      {letter}
    </Button>
  );
}

export function GameBoard() {
  return (
    <div className="flex h-screen items-center justify-center overflow-hidden">
      <Card>
        <div className={"grid grid-cols-5 grid-rows-5 gap-4"}>
          {/* Top of Square */}
          <div
            className={"flex items-center justify-center"}
            style={{ gridColumn: "2 / span 1", gridRow: "1" }}
          >
            <LetterButton letter="A" />
          </div>
          <div
            className={"flex items-center justify-center"}
            style={{ gridColumn: "3 / span 1", gridRow: "1" }}
          >
            <LetterButton letter="B" />
          </div>
          <div
            className={"flex items-center justify-center"}
            style={{ gridColumn: "4 / span 1", gridRow: "1" }}
          >
            <LetterButton letter="C" />
          </div>

          {/* Bottom of Square */}
          <div
            className={"flex items-center justify-center"}
            style={{ gridColumn: "2 / span 1", gridRow: "5" }}
          >
            <LetterButton letter="D" />
          </div>
          <div
            className={"flex items-center justify-center"}
            style={{ gridColumn: "3 / span 1", gridRow: "5" }}
          >
            <LetterButton letter="E" />
          </div>
          <div
            className={"flex items-center justify-center"}
            style={{ gridColumn: "4 / span 1", gridRow: "5" }}
          >
            <LetterButton letter="F" />
          </div>

          {/* Right of Square */}
          <div
            className={"flex items-center justify-center"}
            style={{ gridColumn: "1", gridRow: "2 / span 1" }}
          >
            <LetterButton letter="G" />
          </div>
          <div
            className={"flex items-center justify-center"}
            style={{ gridColumn: "1", gridRow: "3 / span 1" }}
          >
            <LetterButton letter="H" />
          </div>
          <div
            className={"flex items-center justify-center"}
            style={{ gridColumn: "1", gridRow: "4 / span 1" }}
          >
            <LetterButton letter="I" />
          </div>

          {/* Left of Square */}
          <div
            className={"flex items-center justify-center"}
            style={{ gridColumn: "5", gridRow: "2 / span 1" }}
          >
            <LetterButton letter="J" />
          </div>
          <div
            className={"flex items-center justify-center"}
            style={{ gridColumn: "5", gridRow: "3 / span 1" }}
          >
            <LetterButton letter="K" />
          </div>
          <div
            className={"flex items-center justify-center"}
            style={{ gridColumn: "5", gridRow: "4 / span 1" }}
          >
            <LetterButton letter="L" />
          </div>
        </div>
      </Card>
    </div>
  );
}
