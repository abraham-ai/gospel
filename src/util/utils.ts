import fs from 'fs';
import path from 'path';


export function getAllFiles(directoryPath: string, filetype: string) {
  const files = fs.readdirSync(directoryPath).filter(file => file.endsWith(filetype));
  return files.map(file => path.join(directoryPath, file));
}

export function getRandomSample(array: any[], n: number) {
  let result = [] as any[];
  while (result.length < n) {
    const index = Math.floor(Math.random() * array.length);
    if (!result.includes(array[index])) {
      result.push(array[index]);
    }
  }
  return result;
}

export function parseChat(chatText: string) {
  const messages = [];
  const lines = chatText.split("\n");
  for (let line of lines) {
    line = line.trim();
    if (line.includes(":")) {
      const [speaker, message] = line.split(":", 2).map((s) => s.trim());
      messages.push({ speaker, message });
    }
  }
  return messages;
}

export function parseLines(text: string) {
  const textLines = text.trim().split("\n");
  let lines = [];
  for (let line of textLines) {
    line = line.trim();
    line = line.replace(/^\d+\.\s*/, '');
    if (line.length > 0) {
      lines.push(line);
    }
  }
  return lines;
}
