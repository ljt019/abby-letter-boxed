export function generateLetterSets(): string[][] {
  // Configuration constants
  const TOTAL_LETTERS = 12;
  const MIN_VOWELS = 3;
  const SIDES = 4; // Number of sides of the square
  const LETTERS_PER_SIDE = TOTAL_LETTERS / SIDES;

  // Define vowels and consonants
  const vowels = ["A", "E", "I", "O", "U"];
  const consonants = [
    "B",
    "C",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "M",
    "N",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  // Initialize sets
  const sides: string[][] = [[], [], [], []];

  // Helper to get a random element from an array
  const getRandomElement = (array: string[]): string => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  };

  // Remove an element from an array and return that element
  const removeElement = (array: string[], element: string) => {
    const index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
    return element;
  };

  // Available letters pools to ensure uniqueness
  const availableVowels = [...vowels];
  const availableConsonants = [...consonants];

  // Ensure a vowel for each side initially
  for (let i = 0; i < SIDES; i++) {
    const vowel = removeElement(
      availableVowels,
      getRandomElement(availableVowels),
    );
    sides[i].push(vowel);
  }

  // Generate the rest of the letters ensuring uniqueness
  for (let count = SIDES; count < TOTAL_LETTERS; ) {
    let letter;

    // Select from the appropriate pool to maintain letter count balance
    if (
      availableVowels.length > 0 &&
      (count < MIN_VOWELS || Math.random() < 0.5)
    ) {
      // Select a vowel if we haven't met the MIN_VOWELS or randomly 50% of the time if vowels are available
      letter = removeElement(
        availableVowels,
        getRandomElement(availableVowels),
      );
    } else if (availableConsonants.length > 0) {
      // Select a consonant otherwise
      letter = removeElement(
        availableConsonants,
        getRandomElement(availableConsonants),
      );
    } else {
      // Break if somehow we've run out of letters to assign
      break;
    }

    // Attempt to place the letter in a side
    let placed = false;
    while (!placed && letter) {
      const sideIndex = Math.floor(Math.random() * SIDES);
      if (sides[sideIndex].length < LETTERS_PER_SIDE) {
        sides[sideIndex].push(letter);
        placed = true;
        count++; // Only increment count when a letter is successfully placed
      }
    }
  }

  return sides;
}
