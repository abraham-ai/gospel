import { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "util/withSession";
import { generateMonologue } from "scripts/monologue";


interface ApiRequest extends NextApiRequest {
  body: {
    config: any;
  };
}

const taskQueue: {
  taskId: string, 
  status: string, 
  config: any,
  // authToken: string, 
  result: any
}[] = [];

const processNextTask = async () => {
  if (taskQueue.length == 0) {
    return;
  }

  const newTask = taskQueue.shift();
  if (!newTask) {
    return;
  }

  //const { taskId, config, authToken } = newTask;
  const { taskId, config } = newTask;
  //const result = await generateMonologue(authToken, config);
  const result = await generateMonologue(config);

  console.log("got this monologue");
  console.log(result.uri);

  const task = taskQueue.find((t) => t.taskId === taskId);
  if (task) {
    task.status = "completed";
    task.result = result;
  }

  processNextTask();
};

const handler = async (req: ApiRequest, res: NextApiResponse) => {
  const { config } = req.body;
  // const authToken = req.session.token;

  // if (!authToken) {
  //   return res.status(401).json({ error: "Not authenticated" });
  // }

  try {
    const randomTaskId = Math.random().toString(36).substring(2, 15);

    const newTask = {
      taskId: randomTaskId, 
      status: "queued",
      config: config,
      // authToken: authToken,
      result: null,
    };

    console.log("do", newTask)
    taskQueue.push(newTask);

    res.status(200).json({ taskId: newTask.taskId });

    if (taskQueue.length === 1) {
      processNextTask();
    }

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error.response.data });
  }
};

export default withSessionRoute(handler);
