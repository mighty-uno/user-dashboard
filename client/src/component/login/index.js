import React, { useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { login, getUser } from "../../actions";

const Login = (props) => {
  console.log(props);
  const { auth, login, getUser } = props;
  const { from } = props.location.state || { from: { pathname: "/" } };
  const onFinish = async (values) => {
    const result = await login(values);

    console.log("Success:", values, result);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const checkUser = async () => {
    await getUser();
  };
  debugger;
  if (auth.user) {
    //redirect when user login is successfully
    return <Redirect to={from} />;
  } else {
    checkUser();
  }
  return (
    <div className="loginContainer">
      <Card title="Login">
        <Form
          layout={"vertical"}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="User name"
            name="email"
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
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
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
            Don't have account yet ? <Link to="signup">Sign up</Link>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

function mapStateToProps({ auth }) {
  //maps redux state to properties to the component
  return { auth };
}
export default connect(mapStateToProps, { login, getUser })(Login);
