export default interface Character {
  name: string;
  bio: string;
  examples: any[] | null;
  lora: string | null;
  tts_voice: string | null;
  voice_file_urls: string[] | null;
  preset_faces: string[];
}
