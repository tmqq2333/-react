import React, { useState } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space,message,Drawer,Button, } from "antd";
import defaultAvater from "@/assets/defaultImg.jpg";
import logo from "@/assets/logo.jpg";
import {  useNavigate } from "react-router-dom";
import Informat from "./Informat";
export default function Header() {
  const [avater, setAvater] = useState(defaultAvater);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const onClose = () => {
    setOpen(false);
  };
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setOpen(true)
              }}
            >
              修改资料
            </a>
          ),
          icon: <SmileOutlined />,
        },
        {
          type: "divider",
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                localStorage.clear();
                sessionStorage.clear();
                // logout();
                message.success("退出成功")
                navigate("/login")
              }}
            >
              退出登录
            </a>
          ),
          icon: <SmileOutlined />,
        },
      ]}
    />
  );
  return (
    <header>
      <img src={logo} alt="" className="logo-img" />
      <div>
        <Dropdown overlay={menu}>
          <div onClick={(e) => e.preventDefault()} className="right">
            <Space>
              <img src={avater} alt="" className="avater-img" />
              <span className="username">{username}</span>
              <DownOutlined />
            </Space>
          </div>
        </Dropdown>
      </div>
    <Informat visible={open} onCancel={onClose}></Informat>
    </header>
  );
}
