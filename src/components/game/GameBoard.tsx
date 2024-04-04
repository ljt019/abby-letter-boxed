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
  return (
    <div>
      <div className="m-auto flex flex-col gap-y-8">
        <SelectedWordDisplay />
        <LetterButtonCard />
        <GameControlButtons />
      </div>
    </div>
  );
}

export function SelectedWordDisplay() {
  const { words } = useLetterContext();

  return <span className="m-auto text-foreground">{words.join(", ")}</span>;
}

export function LetterButtonCard() {
  const [letterPositions, setLetterPositions] = useState<LetterPosition[]>([]);

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
    <div className="m-auto flex gap-x-4">
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
