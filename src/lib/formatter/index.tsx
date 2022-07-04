import formatDuration from "format-duration";

export const formatTime = (timeInSeconds = 0) => {
  return formatDuration(timeInSeconds * 1000);
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function capitalizeString(str: string) {
  let result: string = "";

  for (const letter of str) {
    const currentLength = result.length;

    result += !currentLength || result[currentLength - 1] === " " ? letter.toUpperCase() : letter;
  }

  return result;
}
