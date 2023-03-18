import { EdenClient } from 'eden-sdk';

const characters = {
  lucy: {
    name: "Lucy",
    bio: `Lucy is a precocious 24-year old immigrant from Shanghai, China who came to the U.S. as a teenager with her family after being persecuted by the Chinese state. She is passionate about emotional intelligence, psychology and game theory, cares about group vibes, and promotes non-violent communication. She is skilled in the design of self-development games and practices in group settings. Lucy is very family-oriented and cozy, but also adventurous, audacious, and knows what she wants. She at one point feared maybe she was an NPC (non-player character) but she overcame it.`,
    lora: 'Lucy',
    voice_file_urls: [
      'https://minio.aws.abraham.fun/creations-stg/ac14041e0a94c9a6d40ee04da6000f8e2cc1b70f0fc40c41b4ffd1452ba33092.wav',
      'https://minio.aws.abraham.fun/creations-stg/45811df8955fabb6fee6b29cfb45a5b58a577eacc386776909a711888ea35139.wav',
      'https://minio.aws.abraham.fun/creations-stg/836b1f8993f1dd6b46032f2687f3cf918f831027d87c3c6ce1c4cde511aff2ec.wav',
      'https://minio.aws.abraham.fun/creations-stg/6dc95563ff769d50999f23eb88e9bac1e6313074fae26bf77497bea898bc5e03.wav',
      'https://minio.aws.abraham.fun/creations-stg/1d8072a72845ded7c51de054b495a38d4f00cbf9486c0ec7245fba77318210cd.wav',
      'https://minio.aws.abraham.fun/creations-stg/b416bfb17e8980d23f39153458f3aef6bd90336eb42ed109db062fea50d2234d.wav'
    ]
  },
  jmill: {
    name: "JayMill",
    bio: `JayMill is a 30-year old software engineer from Richmond, Virginia. In 2022 he came to Mars, looking for a place from where he could park his van, work his remote software engineering gig, and make new friends in natural settings who shared the same passion for technology and life as he had. JayMill's ambition is to create what he describes as "chaos on the internet" which is to make humorous interventions around contemporary internet culture using his programming skills. He is a 10x engineer, funny jokester with a seemingly endless array of one-liners like "stuck in the SEO shithole," has an interest in Ethereum and cryptocurrency, AI language models like GPT-3, and software engineering. In contrast to his tech leanings, JayMill has an interested in Tarot cards and is an accomplished and sought-after Tarot reader. Before he met Lucy, JayMill described himself as a lone wolf, not used to being coupled.`,
    lora: "Jmill",
    voice_file_urls: [
      'https://minio.aws.abraham.fun/creations-stg/ce73d8ed8984d2ac37f960fe28f46f8aa0f1de3946cdf452ef1fb5714820e765.wav',
      'https://minio.aws.abraham.fun/creations-stg/3b1c5447741cf9bdb91027197d8b4dfb283499ab7c78af376ae04ab27945e608.wav',
      'https://minio.aws.abraham.fun/creations-stg/033406cca944da054f898a78262f2d4b881afbc4d6ef15aa351a0e4109f82f5d.wav',
      'https://minio.aws.abraham.fun/creations-stg/d42193cc237a91362470e90fa8f24d3b5264b4add6eb41a8a063023858c00c2a.wav',
      'https://minio.aws.abraham.fun/creations-stg/634ee16beb4e7b4fbf62b6b412c135adfdda7cb28864ff35f92f8f812eacf757.wav'
    ]
  }
}

const constitution = `I will introduce two people, JayMill and Lucy, who met, fell in love, and got married at Mars College, an educational program, R&D lab, and off-grid residential community dedicated to cultivating a low-cost, high-tech lifestyle, located in Bombay Beach, California, near the Salton Sea. Mars College is an annual program since 2020 where a group of artists, students, vagabonds, and bohemians gather for three months a year to build a temporary off-grid village out of pallet racks, camper trailers, and vans in the open desert outside of Bombay Beach, and create transcendent art and experiences in the wider community.

${characters.jmill.bio}

${characters.lucy.bio}

Lucy and JayMill instantly bonded at Mars College, finding common affinites for cooking, dumpster diving to find fresh vegegables on the verge of being unecessarily thrown away, and picking up unusual skills and crafts. They began cooking and spending more time together among their friends at Mars College, and quickly decided to start a production brand together specializing in internet-based hijincks in emotional intelligence. They became so comfortable around each other's presence, that they joked they were beginning to merge personalities.

In 2023, JayMill and Lucy decided to get engaged at Mars College, and their friends rejoiced. JayMill and Lucy have many common friends at Mars College like Gene, Vanessa, Nico, Zander, Freeman, Ria, Marzipan, Will, Mason, Atin, Wakeen, Caro, Sam, Vincent, and Pseudo.`


const makePrompt = function(character: any, question: string) {  
  const otherName = character.name === "Lucy" ? "JayMill" : "Lucy";
  const prompt = `${constitution}
  
  You are ${character.name}. You are deep into an interview with me, a journalist and philosopher. For the last several hours, I've asked you various questions about life, love, and the universe, as well as your experiences at Mars College and your relationship with ${otherName}. You've given eloquent and witty responses. I ask you: ${question}. You respond:`
  return prompt;
}

type Character = keyof typeof characters;


export const generateMonologue = async (authToken: string, config: any) => {
  console.log("processing task", config)

  const eden = new EdenClient();
  eden.setAuthToken(authToken);

  const character = characters[config.character as Character];
  console.log("character", character);  

  const prompt = makePrompt(character, config.question);
  console.log("prompt", prompt);

  const monologue_result = await eden.create("complete", {
    prompt: prompt,
    temperature: 0.925,
    max_tokens: 350,
    top_p: 1,
    frequency_penalty: 0.15,
    presence_penalty: 0.1
  });
  console.log(monologue_result);
  
  const monologue = monologue_result.task.output.result.trim();
  console.log("monologue", monologue);

  // const tts_result = await eden.create("tts_fast", {
  //   text: monologue.slice(0, 600),
  //   voice: "Susan",
  //   // voice_file_urls: voice_file_urls,
  //   preset: "real-time", //"high_quality"
  // });
  // console.log(tts_result);
  const voice_file_urls = character.voice_file_urls;

  const tts_result = await eden.create("tts", {
    text: monologue.slice(0, 600),
    voice: "clone",
    voice_file_urls: voice_file_urls,
    preset: "high_quality", //['ultra_fast', 'fast', 'standard', 'high_quality']
  });
  console.log(tts_result);



  // 3) generate the face image
  const init_images = [
    // 'https://minio.aws.abraham.fun/creations-stg/f41f00a1925aaef747d22d2795696c5b027b99d0efa7205305f87b201fb979c8.jpg',
    'https://minio.aws.abraham.fun/creations-stg/35e22f295753e2a3ab14b7096851d8500d05751244096d12dc005f136b794b09.jpg',
    'https://minio.aws.abraham.fun/creations-stg/b1ca3f86718598000b2a8a949a06f23db025267c4b5039f66d0ea49fbcd54921.jpg'
  ]

  const init_image = init_images[Math.floor(Math.random() * init_images.length)]; 
  const text_input = `<${character.lora}> standing in front of a beautiful garden`;

  let face_config = {
    lora: character.lora,
    text_input: text_input,
    init_image_data: init_image,
    init_image_strength: 0.11,
    width: 576,
    height: 832
  }
  console.log("face config", face_config);
  const face_result = await eden.create("create", face_config);
  console.log("face_result", face_result);

  const characterName = character.name === "JayMill" ? "Jmill" : "Lucy";
  const introText = `${characterName}, ${config.question}`;

  const w2l_result = await eden.create("wav2lip", {
    speech_url: tts_result.uri,
    face_url: face_result.uri,
    gfpgan: true,
    gfpgan_upscale: 2.0,
    intro_text: introText
  });
  console.log("w2l", w2l_result);

  return w2l_result;

}
