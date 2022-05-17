function getRandomNum(max: number, prev?: number) {
  let random = Math.floor(Math.random() * max);

  if (prev && max === prev) random = getRandomNum(max, prev);

  return random;
}

export default getRandomNum;
