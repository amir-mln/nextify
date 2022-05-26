import getRandomNum from "./random-number";

function shuffleArray<T>(array: T[]) {
  const copy = Array.from(array);

  for (let i = copy.length - 1; i >= 0; i--) {
    const randomIndex = getRandomNum(i);
    const temp = copy[randomIndex];
    copy[randomIndex] = copy[i];
    copy[i] = temp;
  }

  return copy;
}

export default shuffleArray;
