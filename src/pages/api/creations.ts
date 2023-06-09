import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "util/withSession";
import { EdenClient } from 'eden-sdk';

interface ApiRequest extends NextApiRequest {
  body: {
    characterName: string | null;
    username: string
    generators: string[]
    earliestTime: number
    latestTime: number
    limit: number
  }
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  const { characterName, username, generators, earliestTime, latestTime, limit } = req.body;
  // const authToken = req.session.token;

  console.log("creationds")

  // if (!authToken) {
  //   return res.status(401).json({ error: 'Not authenticated' })
  // }

  try {
    // console.log("go", process.env.EDEN_API_URL)
    // const eden = new EdenClient(process.env.EDEN_API_URL as string);
    const eden = new EdenClient();
    
    eden.loginApi(
      process.env.EDEN_API_KEY as string,
      process.env.EDEN_API_SECRET as string
    )
  
    // const username = req.session.username;

    const filter = {};
    Object.assign(filter, username ? { username: username } : {});
    Object.assign(filter, generators ? { generators: generators } : {});
    Object.assign(filter, earliestTime ? { earliestTime: earliestTime } : {});
    Object.assign(filter, latestTime ? { latestTime: latestTime } : {});
    Object.assign(filter, limit ? { limit: limit } : {});
    
    console.log("getCreations filter", filter);

    const creations = await eden.getCreations(filter);

    if (characterName) {
      const filteredCreations = creations.filter((creation: any) => creation.name.startsWith(characterName));
      return res.status(200).json({ creations: filteredCreations })
    }
    else {
      return res.status(200).json({ creations: creations })
    }


  } catch (error: any) {
    if (error.response.data == 'jwt expired') {
      return res.status(401).json({ error: 'Authentication expired' })
    }
    return res.status(500).json({ error: error.response.data })
  }
}

export default withSessionRoute(handler)