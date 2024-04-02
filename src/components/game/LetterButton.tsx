import { Button } from "@/components/ui/button";
import { useLetterContext } from "@/context/LetterContext";
import cn from "clsx";

interface LetterButtonProps {
  letter: string;
  side: number;
  className?: string;
}

export function LetterButton({ letter, side, className }: LetterButtonProps) {
  const { handleSelectLetter, usedLetters, usedLettersInWord } =
    useLetterContext();

  const isUsed = usedLetters.includes(letter);
  const isUsedInWord = usedLettersInWord.includes(letter);

  return (
    <Button
      onClick={() => handleSelectLetter(letter, side)}
      className={cn(
        "m-2 min-h-10 min-w-10 rounded-full",
        {
          "bg-muted-foreground": isUsed || isUsedInWord,
          "hover:bg-muted-foreground": isUsed || isUsedInWord,
        }, // Conditionally apply class
        className,
      )}
    >
      {letter}
    </Button>
  );
}
