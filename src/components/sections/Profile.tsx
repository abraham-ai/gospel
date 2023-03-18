import { Modal, Table, Switch, Space } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import { useProfile } from "hooks/useProfile";
import ImageResult from "components/media/ImageResult";
import VideoResult from "components/media/VideoResult";
import TextResult from "components/media/TextResult";
import AudioResult from "components/media/AudioResult";

const Profile = () => {

  const [creations, setCreations] = useState<object[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const {profile} = useProfile();
  
  const [configVisible, setConfigVisible] = useState<boolean>(false);
  const [resultVisible, setResultVisible] = useState<boolean>(false);
  const [config, setConfig] = useState<object>({});
  const [result, setResult] = useState<string>("");
  const [outputType, setOutputType] = useState<string>("image");
  
  

  const getOutputType = (generatorName: string) => {
    if (generatorName == "tts" || generatorName == "tts_fast") {
      return "audio";
    } else if (generatorName == "interrogate") {
      return "text";
    } else if (generatorName == "wav2lip" || generatorName == "interpolate" || generatorName == "real2real") {
      return "video";
    } else {
      return "image";
    }
  }

  useEffect(() => {
    const fetchCreations = async () => {
      if (!profile || !profile.username) {
        return;
      }
      setLoading(true);
      try {
        const filter = {limit: 100, generators: ["wav2lip"]};
        const response = await axios.post("/api/creations", filter);
        const data = response.data.creations &&
          response.data.creations.map((creation: any) => {
            return {
              key: creation._id,
              timestamp: creation.createdAt,
              name: creation.name,
              status: creation.task.status,
              output: creation.uri,
              outputType: getOutputType(creation.task?.generator?.generatorName),
              config: creation.task.config,
            };
          }
        );
        setCreations(data);
      } catch (error: any) {
        setMessage(`Error: ${error}`);
      }
      setLoading(false);
    };
    fetchCreations();
  }, [profile]);

  const handleConfigClick = (creation: any) => {
    setConfig(creation.config);
    setConfigVisible(true);
  };

  const handleConfigModalOk = () => {
    setConfigVisible(false);
  };

  const handleConfigModalCancel = () => {
    setConfigVisible(false);
  };

  const handleResultClick = (url: any, outputType: string) => {
    setOutputType(outputType);
    setResult(url);
    setResultVisible(true);
  };  

  const handleResultModalOk = () => {
    setResultVisible(false);
  };

  const handleResultModalCancel = () => {
    setResultVisible(false);
  };

  const columns = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: number) => new Date(timestamp).toLocaleString(),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Output',
      dataIndex: 'output',
      key: 'output',
      render: (output: string, record: any) => (
        <a onClick={() => handleResultClick(output, record.outputType)}>output</a>
      )
    },
    {
      title: "Config",
      key: "config",
      render: (creation: any) => (
        <a onClick={() => handleConfigClick(creation)}>config</a>
      ),
    },
  ];

  return (    
    <>
      <Modal
        title="Configuration"
        open={configVisible}
        onOk={handleConfigModalOk}
        onCancel={handleConfigModalCancel}
        footer={null}
      >
        <pre>{JSON.stringify(config, null, 2)}</pre>
      </Modal>

      <Modal
        title="Result"
        open={resultVisible}
        onOk={handleResultModalOk}
        onCancel={handleResultModalCancel}
        footer={null}
      >
        {outputType == "image" && <ImageResult resultUrl={result} />}
        {outputType == "video" && <VideoResult resultUrl={result} />}
        {outputType == "audio" && <AudioResult resultUrl={result} />}
        {outputType == "text" && <TextResult resultUrl={result} />}
      </Modal>

      {message && <p>{message}</p>}
      {loading ? <p>Loading...</p> : <>
        <Table dataSource={creations} columns={columns} />
      </>}
    </>
  );
};

export default Profile;