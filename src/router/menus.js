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
        path: "/edit/means",
        title: "文章发布",
        icon: <AreaChartOutlined />,
        component: React.lazy(() => import("../pages/Means.jsx")),
      },
      {
        key: "0-1-2",
        path: "/edit/look",
        title: "文章库",
        icon: <AreaChartOutlined />,
        component: React.lazy(() => import("../pages/Look.jsx")),
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
      },
      {
        key: "0-2-1",
        path: "/means/particular",
        title: "资料详情",
        icon: <AreaChartOutlined />,
        component: React.lazy(() => import("../pages/Particulars.jsx")),
      },
      {
        key: "0-2-2",
        path: "/means/df",
        title: "资料修改",
        icon: <AreaChartOutlined />,
        component: React.lazy(() => import("../pages/Register.jsx")),
      }
    ]
  },
  {
    key: "0-3",
    path: "/statistics",
    title: "统计",
    icon: <AreaChartOutlined />,
    component: React.lazy(() => import("../pages/Statistics.jsx")),
  },
  {
    key: "0-4",
    path: "/work",
    title: "功能",
    icon: <AreaChartOutlined />,
    children: [
      {
        key: "0-4-0",
        path: "/work/drag",
        title: "拖拽",
        icon: <AreaChartOutlined />,
        component: React.lazy(() => import("../pages/Drag.jsx")),
      },
      {
        key: "0-4-1",
        path: "/work/ee",
        title: "详情",
        icon: <AreaChartOutlined />,
        component: React.lazy(() => import("../pages/DragMobile.jsx")),
      }
    ]
  },
]

export default menus;