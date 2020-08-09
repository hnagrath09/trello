import React, { useContext, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Input, Checkbox, Button, Form } from "antd";
import AuthContext from "../../../contexts/AuthContext";

const Login = () => {
  const { signInWithEmail } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async ({ email, password, rememberMe }) => {
      setLoading(true);
      if (!(await signInWithEmail({ email, password, rememberMe }))) {
        setLoading(false);
      }
    },
    [signInWithEmail]
  );

  return (
    <div className="max-w-md px-16 py-12 mx-auto bg-white rounded-sm shadow-lg ">
      <div className="space-y-4">
        <div className="relative z-10 mb-6 text-xl font-bold text-center text-gray-800">
          Log in to <span className="text-blue-500">trello</span>
        </div>
      </div>
      <Form
        layout="vertical"
        colon={false}
        onFinish={handleSubmit}
        name="login"
        initialValues={{ rememberMe: true }}
      >
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
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Email is required" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <div className="flex items-center justify-between mb-4">
          <Form.Item name="rememberMe" valuePropName="checked" className="mb-0">
            <Checkbox>Remember Me</Checkbox>
          </Form.Item>
          <Link
            to="/reset-password"
            className="text-sm font-medium text-center text-blue-500"
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          className="w-full"
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Login
        </Button>
      </Form>
      <div className="relative mt-4 border-b border-gray-200">
        <div className="mb-4 text-center">OR</div>
      </div>
      <Link to="/signup">
        <Button className="w-full" type="default">
          Sign up for an account
        </Button>
      </Link>
    </div>
  );
};

export default Login;
