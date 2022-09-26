import React, { useEffect, createRef, useState } from "react";
import * as echarts from "echarts";
import { connect } from "react-redux";
import "./scss/list.scss";
export const List = (props) => {
  const eyeball = createRef();
  const bigEye = createRef();
  const [sleep, setSleep] = useState(true);
  // const [ballSize, setBallSize] = useState(12);
  // const [leftRotSize, setLeftRotSize] = useState(0);
  //   const multiple = 10;
  let leftRotSize = 0; // 旋转角度
  let ballSize = 0; // 眼睛尺寸
  let eyeballChart;
  let rotTimer; // 定时器
  let ballColor = "transparent";
  // // 添加点击事件，当处于休眠状态时执行唤醒方法
  const onclickToWeakup = () => {
    console.log(sleep);
    if (!sleep) return;
    getEyeballChart();
    setAngry();
    setSleep(false); // 修改状态
    clearInterval(rotTimer); // 清除定时器
    rotTimer = setInterval(() => {
      ballSize <= 50 && (ballSize += 1);
      leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.5);
      getEyeballChart(eyeball);
    }, 10);
  };
  // 唤醒
  // 生气模式
  function setAngry() {
    // 通过js修改body的css变量
    document.body.style.setProperty("--c-eyeSocket", "rgb(255,187,255)");
    document.body.style.setProperty("--c-eyeSocket-outer", "rgb(238,85,135)");
    document.body.style.setProperty(
      "--c-eyeSocket-outer-shadow",
      "rgb(255, 60, 86)"
    );
    document.body.style.setProperty("--c-eyeSocket-inner", "rgb(208,14,74)");
    ballColor = "rgb(208,14,74)";
  }
  // 常态模式
  function setNormal() {
    document.body.style.setProperty("--c-eyeSocket", "rgb(41, 104, 217)");
    document.body.style.setProperty("--c-eyeSocket-outer", "#02ffff");
    document.body.style.setProperty(
      "--c-eyeSocket-outer-shadow",
      "transparent"
    );
    document.body.style.setProperty("--c-eyeSocket-inner", "rgb(35, 22, 140)");
    ballColor = "rgb(0,238,255)";
  }
  // 初始化画布
  function getEyeballChart() {
    if (!eyeballChart) {
      eyeballChart = echarts.init(eyeball.current);
    }
    eyeballChart.setOption({
      series: [
        {
          type: "gauge", // 使用仪表盘类型
          radius: "-1%", // 采用负数是为了让分割线从内向外延伸
          clockwise: false,
          startAngle: `${0 + leftRotSize * 5}`, // 加为逆时针旋转，乘5表示速度为leftRotSize的倍
          endAngle: `${360 + leftRotSize * 5}`,
          splitNumber: 9, // 分割数量，会将270度分割为3份，所以有四根线
          detail: false,
          axisLine: {
            show: false,
          },
          axisTick: false,
          splitLine: {
            show: true,
            length: ballSize, // 分割线高度设置为眼球尺寸变量
            lineStyle: {
              shadowColor: ballColor, // 把眼睛的眼影颜色设为变量控制
              color: ballColor,
              shadowBlur: 20, // 阴影渐变
              // shadowColor: "rgb(0, 238, 255)", // 阴影颜色
              shadowOffsetY: "0",
              //color: "rgb(0, 238, 255)", // 分割线颜色
              width: 3, // 分割线宽度
            },
          },
          axisLabel: false,
        },
      ],
    });
  }

  // 休眠
  function toSleep() {
    clearInterval(rotTimer); // 清除定时器
    rotTimer = setInterval(() => {
      getEyeballChart();
      if (ballSize > 0) {
        ballSize -= 0.1; // 当眼球存在时慢慢减小
      } else {
        setSleep(true);
      }
      leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.1); // 旋转，
    }, 10);
  }

  useEffect(() => {
    // ...其他代码
    // getEyeballChart(); // 把这两行删掉
    // toSleep() // 把这两行删掉
    // getEyeballChart();
    // toSleep();
  }, []);

  return (
    <div className="table-list home-list">
      <div
        className={`eyeSocket ${sleep ? "eyeSocketSleeping" : ""}`}
        ref={bigEye}
        onClick={onclickToWeakup}
      >
        <div ref={eyeball} style={{ height: "100%", width: "100%" }}></div>
      </div>
      <div className="eyeSocket" id="eyeFilter" onClick={onclickToWeakup} style={{opacity:sleep?'0':'1'}}></div>
      {/* <div className="filter">
   
      </div> */}
      <svg width="0">
        <filter id="filterl">
          <feTurbulence baseFrequency="1">
            <animate
              id="animate1"
              attributeName="baseFrequency"
              dur="1s"
              from="0.5"
              to="0.55"
              begin="0s;animate1.end"
            ></animate>
            <animate
              id="animate2"
              attributeName="baseFrequency"
              dur="1s"
              from="0.55"
              to="0.5"
              begin="animate2.end"
            ></animate>
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            scale="50"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </svg>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(List);
