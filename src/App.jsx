import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import { getPassword } from "@/api/user";
import { Outlet,useNavigate } from "react-router-dom";
import menus from "@/router/menus";
import Header from "./components/Header";
import AppMain from "@/router/main";
import BreadCrumbs from "./components/BreadCrumbs";
import Asider from "./components/Asider";
import { Layout } from "antd";
import {deepCopy} from '@/utils/util'
const { Sider, Content } = Layout;
export const App = (props) => {
  const [state, setState] = useState(false);
  const [fmenus, setFmenus] = useState([]);
  const navigate = useNavigate();
  //token验证，，或者用路由拦截
  const Validation = (menus, meun) => {
    return menus.filter((item) => {
      if (item.children) {
        item.children = Validation(item.children, meun);
      }
      return meun.includes(item["key"]);
    });
  };
  useEffect(() => {
    getPassword().then((res) => {
      const fing = res.some((i) => i.token === localStorage.getItem("token"));
      if (fing) {
        const meun = localStorage.getItem("meun");
        if (meun.includes("all")) {
          setFmenus(menus);
        } else {
          let meunsList=deepCopy(menus)
          setFmenus(Validation(meunsList, meun));
        }
        setState(true);
      } else {
        navigate('/login')
        setState(false);
      }
    });
  }, [localStorage.getItem("token")]);
  return (
    <>
      {state ? (
        <Layout id="app">
          <Header />
          <Layout>
            <Asider menus={fmenus} />
            <Content>
              <BreadCrumbs></BreadCrumbs>
              <AppMain menus={fmenus}></AppMain>
              {/* <Outlet></Outlet> */}
            </Content>
          </Layout>
          <footer>Respect | Copyright &copy;2022 Author 曜炘</footer>
        </Layout>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
