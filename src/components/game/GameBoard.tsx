import { LetterButton } from "@/components/game/LetterButton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLetterContext } from "@/context/LetterContext";
import { generateLetterSets } from "@/logic/generateLetters";
import { SetStateAction, useEffect, useState } from "react";

type LetterPosition = {
  letter: string;
  side: number;
  position: {
    column: number;
    row: number;
  };
};

export function GameBoard() {
  const [letterPositions, setLetterPositions] = useState<LetterPosition[]>([]);

  const { words } = useLetterContext();

  useEffect(() => {
    const generatedSets = generateLetterSets();
    const positions: SetStateAction<LetterPosition[]> = [];

    // Assuming generateLetterSets() returns 4 arrays of 3 letters each
    // Map each letter to a specific position on the square

    // Side one (Top row)
    generatedSets[0].forEach((letter, index) => {
      positions.push({
        letter,
        side: 1,
        position: { column: index + 2, row: 1 },
      });
    });

    // Side two (Bottom row)
    generatedSets[1].forEach((letter, index) => {
      positions.push({
        letter,
        side: 2,
        position: { column: index + 2, row: 5 },
      });
    });

    // Side three (Left column)
    generatedSets[2].forEach((letter, index) => {
      positions.push({
        letter,
        side: 3,
        position: { column: 1, row: index + 2 },
      });
    });

    // Side four (Right column)
    generatedSets[3].forEach((letter, index) => {
      positions.push({
        letter,
        side: 4,
        position: { column: 5, row: index + 2 },
      });
    });

    setLetterPositions(positions);
  }, []);

  return (
    <div>
      <div className="flex h-screen items-center justify-center overflow-hidden">
        <Card>
          <div className="grid grid-cols-5 grid-rows-5 gap-4">
            {letterPositions.map(({ letter, position, side }, index) => (
              <div
                key={index} // Using index as key because letter can repeat
                className="flex items-center justify-center"
                style={{ gridColumn: position.column, gridRow: position.row }}
              >
                <LetterButton letter={letter} side={side} />
              </div>
            ))}
          </div>
        </Card>
      </div>
      <GameControlButtons />
      <span className="absolute left-0 top-0 text-foreground">
        {words.join(", ")}
      </span>
    </div>
  );
}

export function GameControlButtons() {
  const {
    verifyWordExists,
    selectedLetters,
    words,
    clearCurrentWord,
    resetGame,
  } = useLetterContext();

  return (
    <div className="absolute left-[41.5vw] top-[90vh] flex gap-x-4">
      <Button onClick={clearCurrentWord}>Clear</Button>
      <Button
        className=""
        onClick={() => {
          verifyWordExists(selectedLetters.join(""));
          console.log(words);
        }}
      >
        Submit
      </Button>
      <Button onClick={resetGame}>Reset</Button>
    </div>
  );
}
