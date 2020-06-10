import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { Link } from "react-router-dom";
import { signup } from "../../actions";
import { connect } from "react-redux";
const Signup = (props) => {
  const { signup } = props;
  const onFinish = async (values) => {
    const result = await signup(values);
    if (result) {
      props.history.push("/login");
    }
    console.log("Success:", values, result);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="loginContainer">
      <Card title="Signup">
        <Form
          layout={"vertical"}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="User name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your user name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="email Id"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email id!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your min password! minimum 8 length ",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please re-input your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Submit
            </Button>{" "}
          </Form.Item>
          <Form.Item>
            {" "}
            Already have an account ? <Link to="login">login</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default connect(null, {
  signup,
})(Signup);
