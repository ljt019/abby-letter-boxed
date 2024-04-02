import { Button } from "@/components/ui/button";
import { useLetterContext } from "@/context/LetterContext";
import cn from "clsx";

interface LetterButtonProps {
  letter: string;
  className?: string;
}


export function LetterButton({ letter, className }: LetterButtonProps) {
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