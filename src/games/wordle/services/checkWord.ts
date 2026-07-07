import { url } from "../api/dictionary.js";

/** Returns `true` if a word exists, else `false`. */
export async function checkWord(word: string) {
  const complete_url = url + word;

  try {
    const response = await fetch(complete_url);
    return response.ok;
  } catch {
    return false;
  }
}
