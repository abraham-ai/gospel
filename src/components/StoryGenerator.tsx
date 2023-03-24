import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";

import Character from "characters/Character";
import characters from "characters";


const CharacterCard = (props: {character: Character}) => {
  const [form] = Form.useForm();
  const [values, setValues] = useState({});
  const [message, setMessage] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  const characterName = props.character.name == "JayMill" ? "Jmill": props.character.name;
  const bioWords = props.character.bio.split(' ');
  const first50Words = bioWords.slice(0, 30).join(' ');
  const restWords = bioWords.slice(30).join(' ');
  
  const handleFinish = (formValues: any) => {
    setValues(formValues);
  };
  
  const requestCreation = async (values: any) => {
    try {
      const config = {
        question: values.question,
        character: props.character
      };
      const response = await axios.post("/api/create", {
        mode: "monologue",
        config: config,
      });
      console.log(response);
    }
    catch (error: any) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (Object.keys(values).length > 0) {
      requestCreation(values);
      setMessage("Prompt submitted! Check back in 45 minutes to see the result.");
      form.resetFields();
      setTimeout(() => {setMessage(null)}, 5000);      
    }
  }, [values]);

  return (
    <div style={{ display: 'flex', margin: 10, padding: 10, backgroundColor: "#eee" }}>
      <div style={{ marginRight: 10 }}>
        <img src={props.character.preset_faces[0]} height="225" />
      </div>
      <div style={{ flex: 1 }}>
        <h2>{characterName}</h2>
        <p>
          {first50Words} 
          {expanded && (<>{restWords}</>)}
          {!expanded && (<button                  
            onClick={() => {
              setExpanded(true);
            }}
            style={{ marginLeft: 10 }}
          >
            ...
          </button>)}
        </p>
        <p>
          <Form form={form} name="generate" onFinish={handleFinish}>      
            <Form.Item label="Question" name="question" rules={[{ required: true, message: 'Please describe what the monologue is about!' }]}>
              <Input placeholder={`Ask ${characterName} a question or tell her to talk about something`} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Create monologue
              </Button>
            </Form.Item>
          </Form>
        </p>
      </div>
      {message && <p>{message}</p>}
      <hr />
    </div>
  )

};

const CharacterCreator = () => {

  return (
    <>
      <h1>Characters</h1>
      {Object.keys(characters).map((key) => {
        const character = characters[key];
        return <CharacterCard key={key} character={character} />
      })}
    </>
  );
};

export default CharacterCreator;
