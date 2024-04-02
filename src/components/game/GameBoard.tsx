import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { LetterButton } from "@/components/game/LetterButton";
import { generateLetterSets } from "@/logic/generateLetters";
import { Button } from "@/components/ui/button";
import { useLetterContext } from "@/context/LetterContext";

type LetterPosition = {
  letter: string;
  position: {
    column: number;
    row: number;
  };
};


export function GameBoard() {
  const [letterPositions, setLetterPositions] = useState<LetterPosition[]>([]);

  const { verifyWordExists, selectedLetters, words } = useLetterContext();

  useEffect(() => {
    const generatedSets = generateLetterSets();
    const positions: ((prevState: never[]) => never[]) | { letter: string; position: { column: number; row: number; } | { column: number; row: number; } | { column: number; row: number; } | { column: number; row: number; }; }[] = [];

    // Assuming generateLetterSets() returns 4 arrays of 3 letters each
    // Map each letter to a specific position on the square
    
    // Side one (Top row)
    generatedSets[0].forEach((letter, index) => {
      positions.push({ letter, position: { column: index + 2, row: 1 } });
    });

    // Side two (Bottom row)
    generatedSets[1].forEach((letter, index) => {
      positions.push({ letter, position: { column: index + 2, row: 5 } });
    });

    // Side three (Left column)
    generatedSets[2].forEach((letter, index) => {
      positions.push({ letter, position: { column: 1, row: index + 2 } });
    });

    // Side four (Right column)
    generatedSets[3].forEach((letter, index) => {
      positions.push({ letter, position: { column: 5, row: index + 2 } });
    });

    console.log(generatedSets)

    setLetterPositions(positions);
  }, []);

  return (
    <div>
    <div className="flex h-screen items-center justify-center overflow-hidden">
      <Card>
        <div className="grid grid-cols-5 grid-rows-5 gap-4">
          {letterPositions.map(({ letter, position }, index) => (
            <div
              key={index} // Using index as key because letter can repeat
              className="flex items-center justify-center"
              style={{ gridColumn: position.column, gridRow: position.row }}
            >
              <LetterButton letter={letter} />
            </div>
          ))}
        </div>
      </Card>
      </div>
      <Button className="absolute top-[90vh] left-[47vw]" onClick={() => { verifyWordExists(selectedLetters.join('')); console.log(words)}}>
        Submit
      </Button>
      </div>
  );
}
