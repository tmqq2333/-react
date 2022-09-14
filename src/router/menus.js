import React from "react";
import { AreaChartOutlined } from "@ant-design/icons";
const menus = [
  {
    key: "0-0",
    path: "/list",
    title: "系统首页",
    icon: <AreaChartOutlined />,
    component: React.lazy(() => import("../pages/List.jsx")),
  },
  {
    key: "0-1",
    path: "/edit",
    title: "修改",
    icon: <AreaChartOutlined />,
    children: [
      {
        key: "0-1-0",
        path: "/edit/car",
        title: "文章修改",
        icon: <AreaChartOutlined />,
        children: [
          {
            key: "0-1-0-0",
            path: "",
            title: "列表",
            hidden:true,
            icon: <AreaChartOutlined />,
            component: React.lazy(() => import("../pages/Edit.jsx")),
          },
          {
            key: "0-1-0-1",
            path: "/edit/car/add",
            title: "新增",
            hidden:true,
            icon: <AreaChartOutlined />,
            component: React.lazy(() => import("../pages/Edit.jsx")),
          },
        ]
      },
      {
        key: "0-1-1",
        path: "/edit/ship",
        title: "文章发布",
        icon: <AreaChartOutlined />,
        component: React.lazy(() => import("../pages/Means.jsx")),
      }
    ]
  },
  {
    key: "0-2",
    path: "/means",
    title: "资料",
    icon: <AreaChartOutlined />,
    component: React.lazy(() => import("../pages/Means.jsx")),
    children: [
      {
        key: "0-2-0",
        path: "/means/ship",
        title: "资料查看",
        icon: <AreaChartOutlined />,
        component: React.lazy(() => import("../pages/Repbox.jsx")),
      }
    ]
  },
]

export default menus;