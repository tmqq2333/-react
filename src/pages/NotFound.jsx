import React from "react";
import "./scss/notfound.scss";
import { useNavigate, useLocation } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate('/');
  };
  const message="对不起，你没有权限你没有权限你没有权限你没有权限你没有权限你没有权限你没有权限你没有权限你没有权限你没有权限你没有权限你没有权限你没有权限你没有权限"
  return (
    <div style={{ background: "#f0f2f5", marginTop: "-20px", height: "100%" }}>
      <div className="wscn-http404">
        <div className="pic-404"></div>
        <div className="bullshit">
          <div className="bullshit__headline">{message}</div>
          <div className="bullshit__info">对不起，你没有权限</div>
          <a onClick={backToHome} className="bullshit__return-home">
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
}
