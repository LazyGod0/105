export const formatBotResponse = (text: string) => {
  return text.replace(/(\d+\. )/g, "\n$1").replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"); // Make **text** bold
};

export const truncateText = (text: string, length: number = 100) => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};