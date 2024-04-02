export async function verifyWord(word: string): Promise<boolean> {
  const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      // The API returns a 200 OK status for a word that exists.
      return true;
    }
    // If the API does not return a 200 OK status, assume the word does not exist.
    return false;
  } catch (error) {
    // In case of network error or other fetch issues, log the error and return false.
    console.error("Error fetching word information:", error);
    return false;
  }
}