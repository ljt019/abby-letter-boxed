import { createContext, useState, useContext, ReactNode } from "react";

interface LetterContextType {
  selectedLetters: string[];
  handleSelectLetter: (letter: string) => void;
}

const LetterContext = createContext<LetterContextType>({
  selectedLetters: [],
  handleSelectLetter: () => {},
});

export function LetterContextProvider({ children }: { children: ReactNode }) {
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);

  const handleSelectLetter = (letter: string) => {
    setSelectedLetters((prevLetters) => {
      return prevLetters.includes(letter)
        ? prevLetters.filter((l) => l !== letter)
        : [...prevLetters, letter];
    });
  };

  return (
    <LetterContext.Provider value={{ selectedLetters, handleSelectLetter }}>
      {children}
    </LetterContext.Provider>
  );
}

export function useLetterContext() {
  return useContext(LetterContext);
}
