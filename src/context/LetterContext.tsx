import { createContext, useState, useContext, ReactNode } from "react";
import { verifyWord } from "@/logic/verifyWord";

interface LetterContextType {
  selectedLetters: string[];
  handleSelectLetter: (letter: string) => void;
  verifyWordExists: (word: string) => void;
  words: string[];
}

const LetterContext = createContext<LetterContextType>({
  selectedLetters: [],
  handleSelectLetter: () => { },
  verifyWordExists: () => { },
  words: [],
});

export function LetterContextProvider({ children }: { children: ReactNode }) {
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>([]);

  const handleSelectLetter = (letter: string) => {
    setSelectedLetters((prevLetters) => {
      return prevLetters.includes(letter)
        ? prevLetters.filter((l) => l !== letter)
        : [...prevLetters, letter];
    });
  };

  async function verifyWordExists(word: string) {
    // Need to have a variable that is set to false if word.length < 3 or if verifyWord returns false, and true if verifyWord returns true
    if (word.length < 3) {
      console.log("Word must be at least 3 letters long");
    } else if (await verifyWord(word)) {
      console.log("Word is valid");
      setWords((prevWords) => [...prevWords, word]);
    } else {
      console.log("Word is invalid");
    }

    setSelectedLetters([]);
  }

  return (
    <LetterContext.Provider value={{ selectedLetters, handleSelectLetter, verifyWordExists, words }}>
      {children}
    </LetterContext.Provider>
  );
}

export function useLetterContext() {
  return useContext(LetterContext);
}

/* 
Planning

*Current*
Need to make submit button that passes the selected letters to verifyWord function, which will check if the word is valid
If it is valid, the word will be added to the list of words and the corresponding letter buttons will be greyed out

*Future Unsure For Now*
Find a way to make sure that letters must be selected from sides that aren't thier own

*/