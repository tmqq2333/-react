import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Menu } from "antd";
import { Layout } from "antd";
const { Sider } = Layout;
const renderMenu = (menus) => {
  const list = [];
  menus.map((item) => {
    if (item.hidden) return undefined;
    let lin = {
      label: item.title,
      key: item.path,
      icon: item.icon,
    };
    if (item.children) {
      let children = renderMenu(item.children);
      if (children.length) {
        lin["children"] = children;
      }
      list.push(lin);
    } else {
      list.push(lin);
    }
  });
  return list;
};

export default function Asider(props) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { menus } = props;
  const [selectedKey, setSelectedKey] = useState([pathname]);
  const [openKeys, setOpenKeys] = useState(["/" + pathname.split("/")[1]]);
  const rootSubmenuKeys = [];
  useEffect(()=>{
    pathname==='/'&&setSelectedKey([menus[0].path])
  },[])
  menus.forEach((item) => {
    if (item.children) {
      rootSubmenuKeys.push(item.path);
    }
  });
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const handleClick = (e) => {
    navigate(e.key)
    setSelectedKey([e.key]);
  };
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        selectedKeys={selectedKey}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={handleClick}
        mode="inline"
        theme="dark"
        items={renderMenu(menus)}
      />
    </Sider>
  );
}
