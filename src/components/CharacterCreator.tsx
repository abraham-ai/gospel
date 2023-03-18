import React, { useState, useEffect, useCallback } from "react";
import { Button, Form } from "antd";
import axios from "axios";
import StringParameter from "components/parameters/StringParameter";
import UploadParameter from "components/parameters/UploadParameter";
import OptionParameter from "components/parameters/OptionParameter";

const CharacterCreator = () => {

  const [form] = Form.useForm();
  const [values, setValues] = useState({});

  const handleFinish = (formValues: any) => {
    setValues(formValues);
  };

  useEffect(() => {
    const requestCreation = async (values: any) => {

      try {
        //const config = getConfig(values);
        const config = values;
        const response = await axios.post("/api/create", {
          config: config,
        });
        const newTaskId = response.data.taskId;
      }
      catch (error: any) {
        console.log(error)
      }
    };

    if (Object.keys(values).length > 0) {
      requestCreation(values);
    }

  }, [values]);


  const parameters = [
    {
      name: 'name',
      label: 'Name',
      description: "Character's name",
      isRequired: true,
    },
    {
      name: 'tagline',
      label: 'Tagline',
      description: 'A short (1-sentence) description of the character',
      isRequired: true,
    },
    {
      name: 'description',
      label: 'Description',
      description: 'A long (1-paragraph) description or biography of the character',
      isRequired: true,
      long: true,
    },


    {
      name: 'voice',
      label: 'Voice',
      description: 'Which preset voice to use',
      default: 'Jordan',
      allowedValues: ['Larry', 'Jordan', 'Susan', 'William', 'Oliver', 'Alfonso', 'Daniel', 'Charlotte', 'Adrian', 'Alexander', 'Anthony', 'Aurora', 'Axel', 'Carter', 'Daisy', 'Darcie', 'Ellie', 'Evelyn', 'Frankie', 'Frederick', 'Harrison', 'Hudson', 'Hunter', 'Julian', 'Lillian', 'Lottie', 'Maverick', 'Bret', 'Nolan', 'Nova', 'Owen', 'Phoebe', 'Stella', 'Theodore', 'Arthur', 'Bruce', 'Bryan', 'Carlo', 'Domenic', 'Hayden(Cooper)', 'Reynaldo'],
    },
  
  
    {
      name: 'voice_file_urls',
      label: 'Voice file URLs',
      description: 'URLs for the audio files of target voice (if voice is clone)',
      mediaUpload: true,
      default: [],
      minLength: 1,
      maxLength: 16,
    },
    {
      name: 'profile_images',
      label: 'Profile images',
      description: 'URLs for the image files of target concept to train a LORA for',
      mediaUpload: true,
      default: [],
      minLength: 1,
      maxLength: 8,
      isRequired: true,
    },
  
  
  ];


  return (
    <>

      <h1>Character Creator</h1>

      <Form
          form={form}
          name="generate"
          onFinish={handleFinish}
        >

        <div style={{ paddingBottom: 5, marginBottom: 10, borderBottom: "1px solid #ccc" }}>
          <StringParameter key={"name"} form={form} parameter={parameters[0]} />
        </div>
        <div style={{ paddingBottom: 5, marginBottom: 10, borderBottom: "1px solid #ccc" }}>
          <StringParameter key={"tagline"} form={form} parameter={parameters[1]} />
        </div>
        <div style={{ paddingBottom: 5, marginBottom: 10, borderBottom: "1px solid #ccc" }}>
          <StringParameter key={"description"} form={form} parameter={parameters[2]} />
        </div>

        <div style={{ paddingBottom: 5, marginBottom: 10, borderBottom: "1px solid #ccc" }}>
          <OptionParameter key={"voice"} form={form} parameter={parameters[3]} />
        </div>

        <div style={{ paddingBottom: 5, marginBottom: 10, borderBottom: "1px solid #ccc" }}>
          <UploadParameter key={"voice_file_urls"} form={form} parameter={parameters[4]} />
        </div>


        <div style={{ paddingBottom: 5, marginBottom: 10, borderBottom: "1px solid #ccc" }}>
          <UploadParameter key={"profile_images"} form={form} parameter={parameters[5]} />
        </div>

      {/* picture */}
      {/* voice */}
      {/* generate one for me */}

      {/* 
        Generate self-intro 
        Generate poem
        Generate story     
        Generate interview answer      

        Generate conversation (multiple characters)
      */}

        <Form.Item>
          <Button
            type="primary"
            // icon={<RightCircleOutlined />}
            htmlType="submit"
            // loading={generating}
            // disabled={generating}
            size="large"
          >
            Create character
          </Button>
        </Form.Item>
      </Form>

      {/* <Button onClick={getMoreCreations}>Character</Button> */}
    </>
  );
};

export default CharacterCreator;
