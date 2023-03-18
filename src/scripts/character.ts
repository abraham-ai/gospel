import { EdenClient } from 'eden-sdk';
import * as utils from 'util/utils';


const character_prompt = `I am generating text prompts of protagonists for AI generators. These are descriptions of characters or people which are highly detailed and aesthetically imaginative, diverse, and adventurous. They should start with a description of the character and then a long list of modifiers which elaborate on the style, genre, and medium of the character's appearance and illustration. They should be creative, bold, evocative, edgy, and eclectic.

Here are some examples.

Centered detailed portrait of a masked woman wearing a venetian mask, vibrant peacock feathers, intricate, elegant, highly detailed, digital painting, artstation, smooth, sharp focus, illustration, illuminated lines, outrun, vaporware, intricate venetian patterns, cyberpunk darksynthalphonse mucha
Slum cyberpunk man with gun, tattoed, cyberpunk slum rio de janeiro, light summer clothes, cyberpunk style, 2.2 gama, sony a7r7, tamron 10-24mm f/3.5-4.5, iso 3200, extremely detailed, 8k texture, lots of flowers and vibrant plants
An astronaut in a garden on a spring day, ornate, dynamic, particulate, rich colors, intricate, elegant, highly detailed, harper's bazaar art, fashion magazine, smooth, sharp focus, 8 k, octane render
A portrait of a traditional indigenous elder, with weathered skin and wrinkles, adorned with intricate tattoos and jewelry, seated in a natural outdoor setting, surrounded by plants and animals, with a peaceful and wise expression, detailed textures and realistic style, 4k resolution

I want you to generate a list of 2-3 such text prompts.`




export const makeCharacter = async (authToken: string, config: any) => {
  
  if (!authToken) {
    //return res.status(401).json({ error: "Not authenticated" });
  }

  console.log("processing task", config)

  const eden = new EdenClient();
  eden.setAuthToken(authToken);
  
  let character_result = await eden.create("complete", {
    prompt: character_prompt,
    temperature: 0.9,
    max_tokens: 200,
    top_p: 1,
    frequency_penalty: 0.15,
    presence_penalty: 0.1
  });
  
  let character_descriptions = utils.parseLines(character_result.task.output.result);
  

  const result = {result: character_descriptions}

  console.log("result", result)


  return result;

}
