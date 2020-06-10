import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Row,
  Button,
  Popconfirm,
  PageHeader,
  Typography,
  Col,
  Card,
  notification,
  Avatar,
} from "antd";
import { EditOutlined, DeleteFilled } from "@ant-design/icons";
import { connect } from "react-redux";
import { fetchUserList, logout, deleteUser, updateUser } from "../../actions";
const { Meta } = Card;

const UserListComponent = (props) => {
  const {
    fetchUserList,
    userList,
    logout,
    auth,
    deleteUser,
    updateUser,
  } = props;
  let timer;
  const setTimer = () => {
    timer = setTimeout(() => {
      logout();
    }, 10000);
  };
  useEffect(() => {
    fetchUserList();
    notification.success({ message: "You will be auto logout after 1 minute" });
    // setTimer();
    return () => {
      // clearInterval(timer);
    };
  }, []);

  return (
    <>
      {console.log(auth)}
      <PageHeader
        title="User List"
        extra={[
          <Typography.Title level={4}>{auth.name || ""}</Typography.Title>,
          <Button
            type="primery"
            onClick={async () => {
              await logout();
              window.location.reload();
            }}
          >
            {" "}
            Logout{" "}
          </Button>,
        ]}
      ></PageHeader>
      <Row gutter={8}>
        {userList.map((user) => (
          <Col key={user._id} span={8}>
            <Card
              style={{ width: 300 }}
              actions={[
                <EditOutlined key="edit" />,

                <Popconfirm
                  title={"Are you sure ?"}
                  onConfirm={() => {
                    deleteUser(user._id);
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  {user.email !== auth.user.email ? (
                    <DeleteFilled key="delete" />
                  ) : null}
                </Popconfirm>,
              ]}
            >
              <Meta
                style={{ textTransform: "capitalize" }}
                avatar={<Avatar>{user.name[0]}</Avatar>}
                title={user.name}
                description={`added at ${moment(user.createdAt).format(
                  "DD MMM YY LT"
                )}`}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

function mapStateToProps({ userList, auth }) {
  return { userList, auth };
}

export default connect(mapStateToProps, {
  fetchUserList,
  deleteUser,
  updateUser,
  logout,
})(UserListComponent);
