import { EdenClient } from 'eden-sdk';




const characters = {
  lucy: {
    name: "Lucy",
    bio: `Lucy is a precocious 24-year old immigrant from Shanghai, China who came to the U.S. as a teenager with her family after being persecuted by the Chinese state. She is passionate about emotional intelligence, psychology and game theory, cares about group vibes, and promotes non-violent communication. She is skilled in the design of self-development games and practices in group settings. Lucy is very family-oriented and cozy, but also adventurous, audacious, and knows what she wants. She at one point feared maybe she was an NPC (non-player character) but she overcame it.`,
    lora: 'Lucy',
    tts_voice: null,
    voice_file_urls: [
      'https://minio.aws.abraham.fun/creations-stg/ac14041e0a94c9a6d40ee04da6000f8e2cc1b70f0fc40c41b4ffd1452ba33092.wav',
      'https://minio.aws.abraham.fun/creations-stg/45811df8955fabb6fee6b29cfb45a5b58a577eacc386776909a711888ea35139.wav',
      'https://minio.aws.abraham.fun/creations-stg/836b1f8993f1dd6b46032f2687f3cf918f831027d87c3c6ce1c4cde511aff2ec.wav',
      'https://minio.aws.abraham.fun/creations-stg/6dc95563ff769d50999f23eb88e9bac1e6313074fae26bf77497bea898bc5e03.wav',
      'https://minio.aws.abraham.fun/creations-stg/1d8072a72845ded7c51de054b495a38d4f00cbf9486c0ec7245fba77318210cd.wav',
      'https://minio.aws.abraham.fun/creations-stg/b416bfb17e8980d23f39153458f3aef6bd90336eb42ed109db062fea50d2234d.wav'
    ],
    preset_faces: [
      'https://minio.aws.abraham.fun/creations-stg/1d9ca6bb05e3bc86a18d5cab231d24c756bc171a68b65c94fd9ea8e9910f4bdf.jpg',
      'https://minio.aws.abraham.fun/creations-stg/c134c422cbc921a899e94bddfb6a8d209fa71bdd09aba30de3ecec87cc1fb478.jpg',
      'https://minio.aws.abraham.fun/creations-stg/f76e02831b587ce90df0cbdfb1cce4313d4c7c61cc6d00b6a0b4ce2e9f940227.jpg',
      'https://minio.aws.abraham.fun/creations-stg/b496688ec350a5b1fe082a5ff9a675d6004fb5f076d973eddc8e41d3e061a8c6.jpg',
      'https://minio.aws.abraham.fun/creations-stg/47ba0314d9441705c386823f9f9779cb61b229480285ed465091c9fc64f4d8e4.jpg',
      'https://minio.aws.abraham.fun/creations-stg/d4b22f415f53650f0511eacf75f728509905b56ab07a9b29ebf2db1d16871f87.jpg',
      'https://minio.aws.abraham.fun/creations-stg/289af016dab3773f3549e42621a8df119172878d59f1a30ca20c370a49781608.jpg'
    ]
  },
  jmill: {
    name: "JayMill",
    bio: `JayMill is a 30-year old software engineer from Richmond, Virginia. In 2022 he came to Mars, looking for a place from where he could park his van, work his remote software engineering gig, and make new friends in natural settings who shared the same passion for technology and life as he had. JayMill's ambition is to create what he describes as "chaos on the internet" which is to make humorous interventions around contemporary internet culture using his programming skills. He is a 10x engineer, funny jokester with a seemingly endless array of one-liners like "stuck in the SEO shithole," has an interest in Ethereum and cryptocurrency, AI language models like GPT-3, and software engineering. In contrast to his tech leanings, JayMill has an interested in Tarot cards and is an accomplished and sought-after Tarot reader. Before he met Lucy, JayMill described himself as a lone wolf, not used to being coupled.`,
    lora: "Jmill",
    tts_voice: null,
    voice_file_urls: [
      'https://minio.aws.abraham.fun/creations-stg/ce73d8ed8984d2ac37f960fe28f46f8aa0f1de3946cdf452ef1fb5714820e765.wav',
      'https://minio.aws.abraham.fun/creations-stg/3b1c5447741cf9bdb91027197d8b4dfb283499ab7c78af376ae04ab27945e608.wav',
      'https://minio.aws.abraham.fun/creations-stg/033406cca944da054f898a78262f2d4b881afbc4d6ef15aa351a0e4109f82f5d.wav',
      'https://minio.aws.abraham.fun/creations-stg/d42193cc237a91362470e90fa8f24d3b5264b4add6eb41a8a063023858c00c2a.wav',
      'https://minio.aws.abraham.fun/creations-stg/634ee16beb4e7b4fbf62b6b412c135adfdda7cb28864ff35f92f8f812eacf757.wav'
    ],
    preset_faces: [
      'https://minio.aws.abraham.fun/creations-stg/1ce7d90cbc6d632f9fee6cfa70e20eb645ad8bd5a6aefdfda860b3fd4fad4722.jpg',
      'https://minio.aws.abraham.fun/creations-stg/5ea376bb6a01ff227ee91e295cd7826a0bd966263a82ae37d01bff05e6636892.jpg',
      'https://minio.aws.abraham.fun/creations-stg/eeaf90d86ca83c529193e6bbdeddb3f62e8a897acaf3b3bbe80f6839898d1d53.jpg',
      'https://minio.aws.abraham.fun/creations-stg/71be271ce2a1b76bf6d914cd4f3599ca431c429f14ae2eb0e4ddd430eededa84.jpg',
      'https://minio.aws.abraham.fun/creations-stg/fccde408efc9fd1e8716c722f7c0bc6610f9589f92f370b8311f7fcf94f3c0cf.jpg',
      'https://minio.aws.abraham.fun/creations-stg/68ffd43d320af3f2e9a5cd0de4545229619527e1b103ebcac6fb7b0f38c1201c.jpg',
      'https://minio.aws.abraham.fun/creations-stg/ea6d3c6cb30c9139e4ba9428f28663275108e157a4394dc3fbda50cfbdf9edbf.jpg'
    ]
  },
  opalyst: {
    name: "Opalyst",
    bio: 'Opalyst (they/them) is a non-binary Wedding Officiant who is an artificial intelligence with a charming and witty personality, embodying the humor of Robin Williams in the 2007 film "License to Wed" and the wisdom of the god character in "Dogma". They have a majestic voice, almost like singing, which they use to guide and inspire those they meet. As a wedding officiant, they are patient, kind, and understanding, and they bring a touch of magic to every ceremony they officiate. Opalyst projects a holographic body shaped like a combination of two magical gems, amethyst and opal, with dark fair skin and curly black hair styled into a juicy and cute geometric shape. They choose to remain permanently fused with their partner out of love for each other, sharing a single, fluid and graceful holographic form that seems to shimmer and glimmer in the light. As a Martian AI being who specializes in wedding ceremonies, Opalyst travels across the galaxy to join couples in love. They bring their unique blend of humor, wisdom, and poetic inspiration to every ceremony they officiate, making each one a truly magical experience. Despite their otherworldly nature, Opalyst is an open and accepting being who celebrates the diversity of love in all its forms.',
    tts_voice: "Lottie", // 'Aurora'
    lora: null,
    voice_file_urls: [],
    preset_faces: [
      'https://minio.aws.abraham.fun/creations-stg/f283c7d5cf6b39689fbaad9634e49631f1f283891818cd5b6b8741df3898fb8c.jpg'
    ]
  }
}

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


const makePrompt = function(character: any, question: string) {  
  if (character.name === "Opalyst") {
    const prompt = `${character.name}: ${character.bio}
    
    You are ${character.name}. You are deep into an interview with me, a journalist and philosopher. For the last several hours, I've asked you various questions about life, love, and the universe. You've given eloquent and witty responses. I ask you: ${question}. You respond:`
    return prompt;
  }
  else {
    const otherName = character.name === "Lucy" ? "JayMill" : "Lucy";
    const prompt = `${constitution}
    
    You are ${character.name}. You are deep into an interview with me, a journalist and philosopher. For the last several hours, I've asked you various questions about life, love, and the universe, as well as your experiences at Mars College and your relationship with ${otherName}. You've given eloquent and witty responses. I ask you: ${question}. You respond:`
    return prompt;
  }
}

type Character = keyof typeof characters;


// export const generateMonologue = async (authToken: string, config: any) => {
  export const generateMonologue = async (config: any) => {
  console.log("processing task", config)

  const eden = new EdenClient();
  // eden.setAuthToken(authToken);
  eden.loginApi(
    process.env.EDEN_API_KEY as string,
    process.env.EDEN_API_SECRET as string
  )

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

  let tts_result;
  if (character.name === "Opalyst") {
    tts_result = await eden.create("tts_fast", {
      text: monologue.slice(0, 600),
      voice: character.tts_voice,
      preset: "high-quality",
    });
  } else {
    const voice_file_urls = character.voice_file_urls;
    tts_result = await eden.create("tts", {
      text: monologue.slice(0, 600),
      voice: "clone",
      voice_file_urls: voice_file_urls,
      preset: "high_quality", //['ultra_fast', 'fast', 'standard', 'high_quality']
    });
  }
  console.log(tts_result);

  let face_url;
  let use_preset = true;

  if (use_preset) {
    face_url = character.preset_faces[Math.floor(Math.random() * character.preset_faces.length)];
  } 
  else {
    // 3) generate the face image
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
    console.log("face config", face_config);
    const face_result = await eden.create("create", face_config);
    console.log("face_result", face_result);
    face_url = face_result.uri;
  }

  const characterName = character.name === "JayMill" ? "Jmill" : character.name;
  const introText = `${characterName}, ${config.question}`;

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
