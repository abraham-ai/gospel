import { EdenClient } from 'eden-sdk';
import characters from '../characters';
import {generateVideoTalk} from './monologue';

type Character = keyof typeof characters;



// export const generateConversation = async (authToken: string, config: any) => {
export const generateConversation = async (config: any) => {
  console.log("processing task", config)

  const eden = new EdenClient();
  // eden.setAuthToken(authToken);
  eden.loginApi(
    process.env.EDEN_API_KEY as string,
    process.env.EDEN_API_SECRET as string
  )

  let conversation = [] as {character: any, text: string}[];

  let character1 = characters[config.characters[0] as Character];
  let character2 = characters[config.characters[1] as Character];
  const preset1_idx1 = Math.floor(Math.random() * character1.preset_faces.length)
  const preset2_idx1 = Math.floor(Math.random() * character2.preset_faces.length)

  for (var c=0; c<8; c++) {
    character1 = characters[config.characters[c%2] as Character];
    character2 = characters[config.characters[1-(c%2)] as Character];
    
    let prompt = `The two characters in this conversation are ${character1.name} and ${character2.name}.

    ${character1.bio}
    
    ${character2.bio}

    ${character1.name} and ${character2.name} are having a conversation about ${config.topic}. The conversation is dynamic and insightful but also casual, as though they are having it at a party or a bar.

    `;

    if (conversation.length > 0) {
      prompt += `\nHere is what has been said so far:\n\n`
      for (let i = 0; i < conversation.length; i++) {
        prompt += `${conversation[i].character.name}: ${conversation[i].text}\n`;
      }
      prompt += `\nYou are ${character1.name}. Responding to ${character2.name}, you say:`;
    } else {
      prompt += `\nThis is the beginning of the conversation. You are ${character1.name}, and you are leading off the conversation. You say:`
    }

    console.log("prompt", prompt);

    const convo_result = await eden.create("complete", {
      prompt: prompt,
      temperature: 0.9,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0.15,
      presence_penalty: 0.1
    });
    
    let convo = convo_result.task.output.result.trim();
    convo = convo.replace(/^"(.+(?="$))"$/, '$1').trim();

    conversation.push({
      character: character1, 
      text: convo
    });

  }


  const promises = conversation.map(async (line) => {
    const introText = null;
    const result = await generateVideoTalk(line.character, line.text, 0, introText);
    //await downloadFile(result.uri, vidName);  
    return result.uri;
  });
  
  const all_videos = await Promise.all(promises);
  console.log("all_videos", all_videos);


  console.log(conversation);

}