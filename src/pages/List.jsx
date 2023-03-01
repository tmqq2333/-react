import React, { useEffect, createRef,useRef, useState } from "react";
import * as echarts from "echarts";
import { connect } from "react-redux";
import "./scss/list.scss";
export const List = (props) => {
  const eyeball = useRef();
  // const [leep, setLeep] = useState(false);
  // const [sleep, setSleep] = useState(false);
  const [weakup, setWeakup] = useState("eyeSocketSleeping"); //休息：eyeSocketSleeping 醒来：eyeSocketLooking
  const [opt, setOpt] = useState({ eyeXDeg: 0, eyeYDeg: 0 });
  let eyeballChart;
  let leftRotSize = 0; // 旋转角度
  let ballSize = 0; // 眼睛尺寸
  let ballColor = "transparent";
  let rotTimer; // 定时器
  let sleepTimer;//延时器
  const someStyle = {
    "--c-eyeSocket": sleep() ? "rgb(255,187,255)" : "rgb(41, 104, 217)",
    "--c-eyeSocket-outer": sleep() ? "rgb(238,85,135)" : "#02ffff",
    "--c-eyeSocket-outer-shadow": sleep() ? "rgb(255, 60, 86)" : "transparent",
    "--c-eyeSocket-inner": sleep() ? "rgb(208,14,74)" : "rgb(35, 22, 140)",
  };
  function sleep() {
    if (weakup === "eyeSocketLooking") return true;
    else return false;
  }
  useEffect(() => {
    eyeballChart = echarts.init(eyeball.current); // 初始化画布
    getEyeballChart();//初始化眼睛



    // toSleep()
    return () => {
      clearTimeout(sleepTimer);
      clearInterval(rotTimer); // 清除定时器
    };
  }, []);

  function getEyeballChart() {
    eyeballChart.setOption({
      series: [
        {
          type: "gauge", // 使用仪表盘类型
          radius: "8", // 采用负数是为了让分割线从内向外延伸
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
  function toSleep() {
    clearInterval(rotTimer); // 清除定时器
    rotTimer = setInterval(() => {
      getEyeballChart();
      if (ballSize > 0) {
        ballSize -= 0.1; // 当眼球存在时慢慢减小
        leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.1); // 旋转，
      } else {
        // setSleep(false)
        setWeakup("eyeSocketSleeping");
        clearInterval(rotTimer);//重点，取消定时器。不然休眠后唤醒有问题
      }
    }, 10);
    document.body.removeEventListener("mousemove", focusOnMouse);
    setOpt({ eyeXDeg: 0, eyeYDeg: 0 });
  }
  const onclickToWeakup = () => {
    // if (leep||sleep) return;
    if (weakup !== "eyeSocketSleeping") return;
    clearTimeout(sleepTimer);
    clearInterval(rotTimer); // 清除定时器
    // 只有第一次点击存在，再次点击eyeballChart会为空,【未解决:考虑为echarts原因】
    if (!eyeballChart) {
      eyeballChart = echarts.init(eyeball.current);
    }
    console.log(eyeballChart);
    // setSleep(false)
    // setLeep(true);
    setWeakup("eyeSocketLooking");
    ballColor = "rgb(208,14,74)";
    rotTimer = setInterval(() => {
      ballSize <= 50 && ballSize++;
      leftRotSize === 360
        ? (leftRotSize = 0)
        : (leftRotSize = leftRotSize + 0.5);
      getEyeballChart();
    }, 10);
    setTimeout(() => {
      adjust();
      document.body.addEventListener("mousemove", focusOnMouse);
    }, 3000);
  };
  //调整状态
  function adjust() {
    new Promise((res) => {
      clearInterval(rotTimer); // 清除定时器
      rotTimer = setInterval(() => {
        getEyeballChart(); // 更新视图
        ballSize > 0 && (ballSize -= 0.5); // 眼球尺寸减小
        leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.1);
        if (ballSize === 0) {
          // 当眼球尺寸为0时，将Promise标记为resolved，然后执行后面的代码
          clearInterval(rotTimer);
          res();
        }
      }, 10);
    }).then(() => {
      // setSleep(true)
      // setLeep(false); // 设置常态样式
      setWeakup("");
      ballColor = "rgb(0,238,255)";
      rotTimer = setInterval(() => {
        getEyeballChart();
        ballSize <= 12 && (ballSize += 0.1); // 眼球尺寸缓慢增加
        leftRotSize === 360 ? (leftRotSize = 0) : (leftRotSize += 0.1);
      }, 10);
    });
  }
  //工作状态
  function focusOnMouse(e) {
    {
      // 视口尺寸，获取到整个视口的大小
      let clientWidth = window.innerWidth;
      let clientHeight = window.innerHeight;
      // 原点，即bigEye中心位置，页面中心
      let origin = [clientWidth / 2, clientHeight / 2];
      // 鼠标坐标
      let mouseCoords = [e.clientX - origin[0], origin[1] - e.clientY];
      // // 旋转角度
      let eyeXDeg = (mouseCoords[1] / clientHeight) * 80; // 这里的80代表的是最上下边缘大眼X轴旋转角度
      let eyeYDeg = (mouseCoords[0] / clientWidth) * 60;
      setOpt({ eyeXDeg: eyeXDeg, eyeYDeg: eyeYDeg });
      if (sleepTimer) clearTimeout(sleepTimer);
      sleepTimer = setTimeout(() => {
        toSleep();
      }, 10000);
    }
  }

  return (
    <div className="table-list home-list" style={someStyle}>
      {/* sleep?'x':(leep?'eyeSocketLooking':'eyeSocketSleeping') */}
      <div
        className={`eyeSocket ${weakup}`}
        style={{
          transform: `rotateY(${opt.eyeYDeg}deg) rotateX(${opt.eyeXDeg}deg)`,
        }}
        onClick={onclickToWeakup}
      >
        <div
          ref={eyeball}
          style={{
            height: "100%",
            width: "100%",
            transform: `translate(${opt.eyeYDeg / 1.5}px, ${
              -opt.eyeXDeg / 1.5
            }px)`,
          }}
        ></div>
      </div>
      <div
        className={`eyeSocket ${weakup}`}
        id="eyeFilter"
        onClick={onclickToWeakup}
        style={{ opacity: sleep() ? "1" : "0" }}
      ></div>
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
            scale="55"
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
