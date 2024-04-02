export function generateLetterSets(): string[][] {
  // Configuration constants
  const TOTAL_LETTERS = 12;
  const MIN_VOWELS = 3;
  const SIDES = 4; // Number of sides of the square
  const LETTERS_PER_SIDE = TOTAL_LETTERS / SIDES;

  // Define vowels and consonants
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  const consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

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

  // Generate vowels ensuring one vowel per side
  const availableVowels = [...vowels]; // Clone the vowels array to manipulate
  for (let i = 0; i < SIDES; i++) {
    // Ensure we distribute at least one vowel per side initially
    const vowel = removeElement(availableVowels, getRandomElement(availableVowels));
    sides[i].push(vowel);
  }

  // Generate the rest of the letters
  for (let count = SIDES; count < TOTAL_LETTERS; count++) {
    let letter;
    if (count < MIN_VOWELS) {
      // If we haven't met the minimum vowel count yet, add another vowel
      letter = getRandomElement(vowels);
    } else {
      // Otherwise, add a consonant
      letter = getRandomElement(consonants);
    }
    
    // Place the letter in a side that hasn't reached the limit yet
    let placed = false;
    while (!placed) {
      const sideIndex = Math.floor(Math.random() * SIDES);
      if (sides[sideIndex].length < LETTERS_PER_SIDE) {
        sides[sideIndex].push(letter);
        placed = true;
      }
    }
  }

  return sides;
}
