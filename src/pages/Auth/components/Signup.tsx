import React, { useContext, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import { Form, Input, Checkbox, Button } from "antd";

const Signup = () => {
  const { signUpWithEmail } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async ({ name, email, password, rememberMe }) => {
      setLoading(true);
      if (!(await signUpWithEmail({ name, email, password, rememberMe }))) {
        setLoading(false);
      }
    },
    [signUpWithEmail]
  );

  return (
    <div className="max-w-md px-16 py-12 mx-auto bg-white rounded-sm shadow-lg ">
      <div className="relative z-10 mb-4 text-xl font-bold text-center text-gray-800">
        Sign up at <span className="text-blue-500">trello</span>
      </div>
      <Form
        layout="vertical"
        colon={false}
        onFinish={handleSubmit}
        initialValues={{ rememberMe: true }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input name="name" placeholder="Name" id="name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            {
              type: "email",
              message: "Email is invalid",
              validateTrigger: "onblur",
            },
          ]}
        >
          <Input name="email" placeholder="Email" id="email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input.Password
            placeholder="Password"
            type="password"
            id="password"
            name="password"
          />
        </Form.Item>
        <Form.Item name="rememberMe" valuePropName="checked">
          <Checkbox name="rememberMe">Remember Me</Checkbox>
        </Form.Item>
        <Button
          className="w-full"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Sign up
        </Button>
      </Form>
      <div className="my-4 text-center">Already have an account?</div>
      <Link to="/login">
        <Button className="w-full" type="default">
          Login
        </Button>
      </Link>
    </div>
  );
};

export default Signup;
