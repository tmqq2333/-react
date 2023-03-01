import React, { useEffect, useState } from "react";
import style from "./scss/drag.module.scss";
export default function Drag() {
  const [isactive, setIsactive] = useState(false);
  let dragging = false;
  let cloneEl = null; // 克隆元素
  let initial = {}; // 初始化数据记录
  let queue = [];
  const imgList = [
    {
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8dGVjaHxlbnwwfHx8fDE2NjIwMjM2MDQ&ixlib=rb-1.2.1&q=80&w=100",
    },
    {
      src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8dGVjaHxlbnwwfHx8fDE2NjIwMjc1MzI&ixlib=rb-1.2.1&q=80&w=100",
    },
    {
      src: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8N3x8dGVjaHxlbnwwfHx8fDE2NjIwMjc1MzI&ixlib=rb-1.2.1&q=80&w=100",
    },
    {
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8dGVjaHxlbnwwfHx8fDE2NjIwMjM2MDQ&ixlib=rb-1.2.1&q=80&w=100",
    },
    {
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8dGVjaHxlbnwwfHx8fDE2NjIwMjM2MDQ&ixlib=rb-1.2.1&q=80&w=100",
    },
    {
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8dGVjaHxlbnwwfHx8fDE2NjIwMjM2MDQ&ixlib=rb-1.2.1&q=80&w=100",
    },
    {
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8dGVjaHxlbnwwfHx8fDE2NjIwMjM2MDQ&ixlib=rb-1.2.1&q=80&w=100",
    },
    {
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8dGVjaHxlbnwwfHx8fDE2NjIwMjM2MDQ&ixlib=rb-1.2.1&q=80&w=100",
    },
    {
      src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8dGVjaHxlbnwwfHx8fDE2NjIwMjM2MDQ&ixlib=rb-1.2.1&q=80&w=100",
    },
  ];
  useEffect(() => {
    document.getElementById("list").addEventListener("mousedown", down);
    document.getElementById("list").addEventListener("touchstart", down);
    document.getElementById("content").addEventListener("mousedown", downCont);
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);
    document.getElementById("content").addEventListener("touchend", goalUp);
    document.getElementById("content").addEventListener("mouseup", goalUp);
    // 鼠标抬起
    window.addEventListener("mouseup", undoUp);
    window.addEventListener("touchend", undoUp);
    // 鼠标离开了视窗
    document.addEventListener("mouseleave", (e) => {
      end();
    });
    // 用户可能离开了浏览器
    window.onblur = () => {
      end();
    };
  }, []);
  // 结束处理（动画）
  function end() {
    dragging = false;
    if (!cloneEl) {
      return;
    }
    cloneEl.classList.add("is_return");
    changeStyle([
      `left: ${initial.pageX - initial.offsetX}px`,
      `top: ${initial.pageY - initial.offsetY}px`,
      "transform: scale(1)",
    ]);
    setTimeout(() => {
      queue.length && queue.shift()();
      cloneEl && cloneEl.remove();
      cloneEl = null;
    }, 300);
  }
  // 按下鼠标
  function down(e) {
    e.preventDefault();
    if (e.target.classList.contains("item") && !cloneEl) {
      // document.getElementById("app").classList.add("active");
     // setIsactive(true);
      // 选中了元素
      cloneEl = e.target.cloneNode(true);
      cloneEl.classList.add("flutter");
      // 模拟一个随机大小的"原图"，实际业务中不存在
      const fakeSize = parseInt(100 * randomNum(3, 5));
      // 初始化数据
      init(e, { width: e.target.offsetWidth }, fakeSize, Math.random());
      // 加载"原图"
      simulate(cloneEl.src.replace(/w=100/g, "w=" + fakeSize), initial.flag);

      e.target.parentElement.appendChild(cloneEl);
      dragging = true;
      e.target.classList.add("hide"); // 放在最后
      queue.push(() => {
        e.target.classList.remove("hide");
      });
    }
  }
  function downCont(e) {
    e.preventDefault();
    if (e.target.classList.contains("item") && !cloneEl) {
      // document.getElementById("app").classList.add("active");
      setIsactive(true);
      // 选中了元素

      cloneEl = e.target.cloneNode(true);
      cloneEl.classList.add("flutter");
      cloneEl.classList.add("cont");
      // 模拟一个随机大小的"原图"，实际业务中不存在
      //const fakeSize = parseInt(100 * randomNum(3, 5));
      const fakeSize = e.target.offsetWidth;
      // 初始化数据
      init(e, { width: e.target.offsetWidth }, fakeSize, Math.random());
      // 加载"原图"
      simulate(cloneEl.src.replace(/w=100/g, "w=" + fakeSize), initial.flag);

      e.target.parentElement.appendChild(cloneEl);
      dragging = true;
      e.target.classList.add("hide"); // 放在最后
      queue.push(() => {
        e.target.classList.remove("hide");
        e.target.remove();
      });
    }
  }
  //鼠标移动
  function move(e) {
    if (!e.touches) {
      //兼容移动端
      var x = e.pageX;
      var y = e.pageY;
    } else {
      //兼容PC端
      var x = e.touches[0].pageX;
      var y = e.touches[0].pageY;
    }
    if (dragging && cloneEl) {
      moveFlutter(x - initial.offsetX, y - initial.offsetY, distance(e));
    }
  }
  //到达目的松开
  function goalUp(e) {
    if (e.target.id !== "content") {
      const lostX =
        e.x - document.getElementById("content").getBoundingClientRect().left;
      const lostY =
        e.y - document.getElementById("content").getBoundingClientRect().top;
      done(lostX, lostY);
    } else {
      done(e.offsetX, e.offsetY);
    }
  }
  function undoUp(e) {
    dragging = false;
    setIsactive(false);
    setTimeout(() => {
      end();
    }, 10);
  }
  // 完成处理
  function done(x, y) {
    if (!cloneEl) {
      return;
    }
    const newEl = cloneEl.cloneNode(true);
    newEl.classList.remove("flutter");
    newEl.src = cloneEl.getAttribute("raw");
    newEl.style.cssText = `left: ${x - initial.offsetX}px; top: ${
      y - initial.offsetY
    }px;`;
    document.getElementById("content").appendChild(newEl);
    cloneEl.remove();
    cloneEl = null;
    queue.length && queue.shift()();
  }
  // 改变漂浮元素（合并多个操作）
  function moveFlutter(x, y, d = 0) {
    // const scale = null // TODO: 关闭缩放
    const scale = d
      ? initial.width + d <= initial.fakeSize
        ? `transform: scale(${(initial.width + d) / initial.width})`
        : null
      : null;
    let options;
    if (cloneEl.classList.contains("cont")) {//左右侧漂浮元素针对的父元素不同，位置也会不同。
      options = [`left: ${x - 525}px`, `top: ${y - 112}px`];
    } else {
      options = [`left: ${x}px`, `top: ${y}px`];//左侧
    }
    scale && options.push(scale);
    changeStyle(options);
  }
  function changeStyle(arr) {
    const original = cloneEl.style.cssText.split(";");
    original.pop();
    cloneEl.style.cssText = original.concat(arr).join(";") + ";";
  }
  // 记录鼠标初始化事件
  function init({ offsetX, offsetY, pageX, pageY }, { width }, fakeSize, flag) {
    initial = { offsetX, offsetY, pageX, pageY, width, fakeSize, flag };
    moveFlutter(pageX - offsetX, pageY - offsetY);
  }
  // 计算两点之间距离
  function distance({ pageX, pageY }) {
    const { pageX: x, pageY: y } = initial;
    const b = pageX - x;
    const a = pageY - y;
    return Math.sqrt(Math.pow(b, 2) + Math.pow(a, 2));
  }
  // 加载原图通常需要时间，利用缓存来优化卡顿
  function simulate(url, flag) {
    cloneEl.setAttribute("raw", url);
    const image = new Image();
    image.src = url;
    image.onload = function () {
      // 异步任务，克隆节点可能会先被清理
      cloneEl && initial.flag === flag && (cloneEl.src = url);
    };
  }
  function randomNum(n, m) {
    return Math.random() * (m - n) + n;
  }
  return (
    <div
      id="app"
      className={`table-list ${style.drag} ${isactive ? "active" : ""}`}
    >
      <div className="slide">
        <div id="list" className="grid">
          {imgList.map((v, i) => {
            return <img key={i} className="item" src={v.src} />;
          })}
        </div>
      </div>
      <div id="content"></div>
    </div>
  );
}
