import { EdenClient } from 'eden-sdk';
import characters from '../characters';

// type Character = keyof typeof characters;

const eden = new EdenClient();
eden.loginApi(
  process.env.EDEN_API_KEY as string,
  process.env.EDEN_API_SECRET as string
)

const face_init_images = [
  // 'https://minio.aws.abraham.fun/creations-stg/f41f00a1925aaef747d22d2795696c5b027b99d0efa7205305f87b201fb979c8.jpg',
  'https://minio.aws.abraham.fun/creations-stg/35e22f295753e2a3ab14b7096851d8500d05751244096d12dc005f136b794b09.jpg',
  'https://minio.aws.abraham.fun/creations-stg/b1ca3f86718598000b2a8a949a06f23db025267c4b5039f66d0ea49fbcd54921.jpg'
]

const constitution = `I will introduce two people, JayMill and Lucy, who met, fell in love, and got married at Mars College, an educational program, R&D lab, and off-grid residential community dedicated to cultivating a low-cost, high-tech lifestyle, located in Bombay Beach, California, near the Salton Sea. Mars College is an annual program since 2020 where a group of artists, students, vagabonds, and bohemians gather for three months a year to build a temporary off-grid village out of pallet racks, camper trailers, and vans in the open desert outside of Bombay Beach, and create transcendent art and experiences in the wider community.

${characters.jmill.bio}

${characters.lucy.bio}

Lucy and JayMill instantly bonded at Mars College, finding common affinites for cooking, dumpster diving to find fresh vegegables on the verge of being unecessarily thrown away, and picking up unusual skills and crafts. They began cooking and spending more time together among their friends at Mars College, and quickly decided to start a production brand together specializing in internet-based hijincks in emotional intelligence. They became so comfortable around each other's presence, that they joked they were beginning to merge personalities.

In 2023, JayMill and Lucy decided to get engaged at Mars College, and their friends rejoiced. JayMill and Lucy have many common friends at Mars College like Gene, Vanessa, Nico, Zander, Freeman, Ria, Marzipan, Will, Mason, Atin, Wakeen, Caro, Sam, Vincent, and Pseudo.`


const makePromptJuicy = function(character: any, question: string) {  
  const otherName = character.name === "Lucy" ? "JayMill" : "Lucy";
  const prompt = `${constitution}
  
  You are ${character.name}. You are deep into an interview with me, a journalist and philosopher. For the last several hours, I've asked you various questions about life, love, and the universe, as well as your experiences at Mars College and your relationship with ${otherName}. You've given eloquent and witty responses. I ask you: ${question}. You respond:`
  return prompt;
}

const makePrompt = function(character: any, question: string) {
  const prompt = `${character.name}: ${character.bio}
    
  You are ${character.name}. You are deep into an interview with me, a journalist and philosopher. For the last several hours, I've asked you various questions about life, love, and the universe. You've given eloquent and witty responses. I ask you: ${question}. You respond:`
  return prompt;
}

export const generateMonologue = async (config: any) => {
  // const character = characters[config.character as Character];
  const character = config.character;

  console.log("my character: ", character);
  console.log("my character: ", character.name);
  console.log("my question: ", config.question);

  let prompt;
  if (character.name === "JayMill" || character.name === "Lucy") {
    prompt = makePromptJuicy(character, config.question);
  } else {
    prompt = makePrompt(character, config.question);
  }

  const monologue_result = await eden.create("complete", {
    prompt: prompt,
    temperature: 0.925,
    max_tokens: 350,
    top_p: 1,
    frequency_penalty: 0.15,
    presence_penalty: 0.1
  });
  
  const monologue = monologue_result.task.output.result.trim();
  const characterName = character.name === "JayMill" ? "Jmill" : character.name;
  const introText = `${characterName}, ${config.question}`;
  const preset_face_idx = Math.floor(Math.random() * character.preset_faces.length)

  const result = await generateVideoTalk(character, monologue, preset_face_idx, introText);
  return result;  
}


export const generateVideoTalk = async (character: any, monologue: string, preset_face_idx: number | null, introText: string | null) => {
  // 2) TTS
  let tts_result;
  if (character.name === "Opalyst") {
    tts_result = await eden.create("tts_fast", {
      text: monologue.slice(0, 1000),
      voice: character.tts_voice,
      preset: "high-quality",
    });
  } else {
    const voice_file_urls = character.voice_file_urls;
    tts_result = await eden.create("tts", {
      text: monologue,
      voice: "clone",
      voice_file_urls: voice_file_urls,
      preset: "high_quality", //['ultra_fast', 'fast', 'standard', 'high_quality']
    });
  }
  console.log(tts_result);

  let face_url;  

  // 3) face image
  if (preset_face_idx !== null) {
    face_url = character.preset_faces[preset_face_idx];
  } 
  else {
    const init_image = face_init_images[Math.floor(Math.random() * face_init_images.length)]; 
    const text_input = `<${character.lora}> standing in front of a beautiful garden`;

    let face_config = {
      lora: character.lora,
      text_input: text_input,
      init_image_data: init_image,
      init_image_strength: 0.11,
      width: 576,
      height: 896
    }
    const face_result = await eden.create("create", face_config);
    face_url = face_result.uri;
  }

  const w2l_result = await eden.create("wav2lip", {
    speech_url: tts_result.uri,
    face_url: face_url,
    gfpgan: true,
    gfpgan_upscale: 1.0,
    intro_text: introText
  });
  console.log("w2l", w2l_result);

  return w2l_result;
}