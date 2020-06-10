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
import { EditOutlined, DeleteFilled, UndoOutlined } from "@ant-design/icons";
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

  const [edit, setEdit] = useState("");
  const [name, setName] = useState("");

  let timer;
  const setTimer = () => {
    timer = setTimeout(() => {
      logout();
    }, 10000);
  };
  useEffect(() => {
    fetchUserList();
    notification.success({ message: "You will be auto logout after 1 minute" });
    setTimer();
    return () => {
      clearInterval(timer);
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
          <Col key={user._id} span={4}>
            <Card
              style={{ width: 300 }}
              actions={[
                <div>
                  {user._id == edit ? (
                    <UndoOutlined
                      key="undo"
                      onClick={() => {
                        setEdit("");
                        setName("");
                      }}
                    ></UndoOutlined>
                  ) : (
                    <EditOutlined
                      key="edit"
                      onClick={() => {
                        setEdit(user._id);
                        setName(user.name);
                      }}
                    />
                  )}
                </div>,

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
                title={
                  user._id == edit ? (
                    <input
                      value={name}
                      onKeyUp={async (e) => {
                        if (e.which == 13) {
                          const result = await updateUser(user._id, { name });
                          if (result) {
                            setEdit("");
                          }
                        }
                      }}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    ></input>
                  ) : (
                    user.name
                  )
                }
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
