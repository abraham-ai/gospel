import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "util/withSession";
import { EdenClient } from 'eden-sdk';

interface ApiRequest extends NextApiRequest {
  body: {
    username: string
    generators: string[]
    earliestTime: number
    latestTime: number
    limit: number
  }
}

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  const { username, generators, earliestTime, latestTime, limit } = req.body;
  // const authToken = req.session.token;

  // if (!authToken) {
  //   return res.status(401).json({ error: 'Not authenticated' })
  // }

  try {
    const eden = new EdenClient();
    //eden.setAuthToken(authToken);
    // eden.loginApi(
    //   "afb9da36e8b2e9143afd6479b0c43b033bf2f17fa4bf9a48","2c6cb1042e90fed840a5f3a4d7b88ba233a8be6a7e9e5817"
    // )

    // const username = req.session.username;

    const filter = {};
    Object.assign(filter, username ? { username: username } : {})
    Object.assign(filter, generators ? { generators: generators } : {})
    
    
    Object.assign(filter, earliestTime ? { earliestTime: earliestTime } : {})
    Object.assign(filter, latestTime ? { latestTime: latestTime } : {})
    Object.assign(filter, limit ? { limit: limit } : {})
    
    console.log("getCreations filter", filter);

    const creations = await eden.getCreations(filter);

    return res.status(200).json({ creations: creations })
  } catch (error: any) {
    if (error.response.data == 'jwt expired') {
      return res.status(401).json({ error: 'Authentication expired' })
    }
    return res.status(500).json({ error: error.response.data })
  }
}

export default withSessionRoute(handler)