import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import "./scss/edit.scss";
export const Edit = (props) => {
  const [widthVar, setWidthVar] = useState(true);
  const [rotateWrap, setRotateWrap] = useState("");
  const [active, setActive] = useState(true);
  const [page, setPage] = useState(99);
  const someStyle = {
    "--groove-left": widthVar ? "12px" : "calc(12px + 50%)",
    "--wraper-origin": widthVar ? "75% top" : "25% top",
    "--wraper-rotate": widthVar ? "-8deg" : "8deg",
  };
  const handleClick=(i)=>{
    i?setPage(page-1):setPage(page+1)
    setWidthVar(i);
    setRotateWrap("rotateWrap");
    setTimeout(() => {
      setActive(i)
    }, 350);
    setTimeout(() => {
      setRotateWrap("");
    }, 550);
  }
  return (
    <div className={`table-list ${widthVar?"light":"dark"}`}>
      <div id="btnWrapper" className={rotateWrap} style={someStyle}>
        <div className={`btn ${active?"active":""}`} onClick={()=>handleClick(true)}>开灯</div>
        <div className={`btn ${active?"":"active"}`} onClick={()=>handleClick(false)}>关灯</div>
      </div>
      <iframe
        id="leftFrame"
        src={`https://www.yushubo.net/read_131217_${page}.html`}
        //src={`http://localhost:8082/#/echarts`}
        width="100%"
        height="100%"
        name="high"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
