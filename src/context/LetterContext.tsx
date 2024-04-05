import { verifyWord } from "@/logic/verifyWord";
import { ReactNode, createContext, useContext, useState } from "react";

interface LetterContextType {
  selectedLetters: string[];
  handleSelectLetter: (letter: string, side: number) => void;
  verifyWordExists: (word: string) => void;
  words: string[];
  lastSelectedSide: number | null;
  resetGame: () => void;
  clearCurrentWord: () => void;
  usedLetters: string[];
  usedLettersInWord: string[];
}

const LetterContext = createContext<LetterContextType>({
  selectedLetters: [],
  handleSelectLetter: () => {},
  verifyWordExists: () => {},
  words: [],
  lastSelectedSide: null,
  resetGame: () => {},
  clearCurrentWord: () => {},
  usedLetters: [],
  usedLettersInWord: [],
});

export function LetterContextProvider({ children }: { children: ReactNode }) {
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [lastSelectedSide, setLastSelectedSide] = useState<number | null>(null);
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [usedLettersInWord, setUsedLettersInWord] = useState<string[]>([]);
  const [lastLetterOfWord, setLastLetterOfWord] = useState<string>("");

  const handleSelectLetter = (letter: string, side: number) => {
    if (lastSelectedSide !== null && side === lastSelectedSide) {
      console.log("Select letters from a different side.");
      return;
    }
    setSelectedLetters((prevLetters) => [...prevLetters, letter]);
    setLastSelectedSide(side);
    setUsedLetters((prevUsedLetters) => {
      return prevUsedLetters.includes(letter)
        ? prevUsedLetters
        : [...prevUsedLetters, letter];
    });
  };

  async function verifyWordExists(word: string) {
    if (word.length < 3) {
      console.log("Word must be at least 3 letters long");
      return; // Exit the function if word is too short
    }

    const isValidWord = await verifyWord(word);
    if (isValidWord) {
      console.log("Word is valid");
      setWords((prevWords) => [...prevWords, word]);
      setUsedLettersInWord((prevUsedLettersInWord) => [
        ...prevUsedLettersInWord,
        ...selectedLetters,
      ]);
      // Update the lastLetterOfWord before resetting the selectedLetters
      const lastLetter = word[word.length - 1];
      setLastLetterOfWord(lastLetter); // Move this line here to ensure it's set correctly
      setSelectedLetters([lastLetter]); // Use the updated lastLetter
    } else {
      console.log("Word is invalid");
      setSelectedLetters([]); // Reset if the word is invalid
    }
    // Clear usedLetters and reset lastSelectedSide regardless of word validity
    setUsedLetters([]);
    if (lastLetterOfWord === "") {
      setLastSelectedSide(null); 
    }
  }

  function resetGame() {
    setWords([]);
    setSelectedLetters([]);
    setLastSelectedSide(null);
    setUsedLetters([]);
    setUsedLettersInWord([]);
    setLastLetterOfWord("");
  }

  function clearCurrentWord() {
    setSelectedLetters([]);
    setSelectedLetters([lastLetterOfWord]);
    setLastSelectedSide(null);
    setUsedLetters([]);
  }

  return (
    <LetterContext.Provider
      value={{
        selectedLetters,
        handleSelectLetter,
        verifyWordExists,
        words,
        lastSelectedSide,
        resetGame,
        clearCurrentWord,
        usedLetters,
        usedLettersInWord,
      }}
    >
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
Find a way to make sure that letters must be selected from sides that aren't thier own

*Completed*
Need to make submit button that passes the selected letters to verifyWord function, which will check if the word is valid
If it is valid, the word will be added to the list of words and the corresponding letter buttons will be greyed out
*/
