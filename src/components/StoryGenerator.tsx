import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";

const CharacterCreator = () => {

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [values1, setValues1] = useState({});
  const [values2, setValues2] = useState({});
  const [values3, setValues3] = useState({});
  const [message1, setMessage1] = useState<string | null>(null);
  const [message2, setMessage2] = useState<string | null>(null);
  const [message3, setMessage3] = useState<string | null>(null);

  const handleFinish1 = (formValues: any) => {
    setValues1(formValues);
  };
  const handleFinish2 = (formValues: any) => {
    setValues2(formValues);
  };
  const handleFinish3 = (formValues: any) => {
    setValues3(formValues);
  };

  const requestCreation = async (values: any, character: string) => {
    try {
      const config = {
        question: values.question,
        character: character
      };
      const response = await axios.post("/api/create", {
        config: config,
      });
      const newTaskId = response.data.taskId;
    }
    catch (error: any) {
      console.log(error)
    }
  };

  useEffect(() => {
    console.log("now wnow");
    if (Object.keys(values1).length > 0) {
      //requestCreation(values1, "lucy");
      setMessage1("Question submitted!");
      form1.resetFields();
      setTimeout(() => {setMessage1(null)}, 3000);      
    }
  }, [values1]);

  useEffect(() => {
    if (Object.keys(values2).length > 0) {
      //requestCreation(values2, "jmill");
      setMessage1("Question submitted!");
      form2.resetFields();
      setTimeout(() => {setMessage1(null)}, 3000);      
    }
  }, [values2]);

  useEffect(() => {
    if (Object.keys(values3).length > 0) {
      //requestCreation(values2, "jmill");
      setMessage1("Conversation submitted!");
      form3.resetFields();
      setTimeout(() => {setMessage1(null)}, 3000);      
    }
  }, [values3]);

  return (
    <>
      <h1>Lucy monologue</h1>

      <Form form={form1} name="generate" onFinish={handleFinish1}>      
        <Form.Item label="Question" name="question" rules={[{ required: true, message: 'Please describe what the monologue is about!' }]}>
          <Input placeholder="Ask Lucy a question or tell her to talk about something" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">
            Create monologue
          </Button>
        </Form.Item>
      </Form>

      {message1 && <p>{message1}</p>}
      <hr />

      <h1>Jmill monologue</h1>

      <Form form={form2} name="generate" onFinish={handleFinish2}>      
        <Form.Item label="Question" name="question" rules={[{ required: true, message: 'Please describe what the monologue is about!' }]}>
          <Input placeholder="Ask Jmill a question or tell him to talk about something" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">
            Create monologue
          </Button>
        </Form.Item>
      </Form>
      
      {message2 && <p>{message2}</p>}
      <hr />

      <h1>Lucy and Jmill conversation</h1>

      <Form form={form3} name="generate" onFinish={handleFinish3}>      
        <Form.Item label="Question" name="question" rules={[{ required: true, message: 'Please describe what the conversation is about!' }]}>
          <Input placeholder="Give Jmill and Lucy a topic to converse about" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">
            Create conversation
          </Button>
        </Form.Item>
      </Form>

      {message3 && <p>{message3}</p>}
      <hr />
      
    </>
  );
};

export default CharacterCreator;
