import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import menus from "@/router/menus";
import { Link, useLocation } from "react-router-dom";
export default function BreadCrumbs() {
  const { pathname } = useLocation();
  const [bread, setBread] = useState([]);
  let breadcrumbNameMap = [];
  let list = pathname.split("/");
  const getData = (menus = [], i = 1) => {
    menus.forEach((item) => {
      if (item.path === list.slice(0, i + 1).join("/")) {
        if (list.length > i + 1) {
          breadcrumbNameMap.push({ title: item.title, path: item.path });
          getData(item.children, i + 1);
        } else {
          breadcrumbNameMap.push({ title: item.title, path: item.path });
        }
      }
    });
  };
  useEffect(() => {
    getData(menus);
    setBread(breadcrumbNameMap);
  }, [pathname]);
  return (
    <Breadcrumb>
      {bread.map((i, index) => {
        return (
          <Breadcrumb.Item key={index}>
            {index !== bread.length ? (
              <Link to={i.path}>{i.title}</Link>
            ) : (
              i.title
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
