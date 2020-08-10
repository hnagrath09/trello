import React, { useContext, useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import AuthContext from "../../../contexts/AuthContext";

const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async ({ email }) => {
      setLoading(true);
      await forgotPassword(email);
      setLoading(false);
    },
    [forgotPassword]
  );

  return (
    <div className="max-w-md px-16 py-12 mx-auto bg-white rounded-sm shadow-lg ">
      <div className="relative z-10 mb-4 text-xl font-bold text-center text-gray-800">
        Reset Password
      </div>
      <Form layout="vertical" colon={false} onFinish={handleSubmit}>
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
          <Input name="email" placeholder="Email" />
        </Form.Item>
        <Button
          className="w-full"
          htmlType="submit"
          loading={loading}
          type="primary"
        >
          Reset Password
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPassword;
