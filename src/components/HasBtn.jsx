import React from "react";
//按钮权限
export default function HasBtn(props) {
  const { has, children } = props;
  console.log(children);
  const hasData = (value) => {
    let isExist = false;
    let buttonPermStr = localStorage.getItem("bpc")??"[]";
    if (buttonPermStr === undefined || buttonPermStr === null) {
      return false;
    }
    let buttonPerms = JSON.parse(buttonPermStr);
    const permissionFlag = value;
    isExist = buttonPerms.some((per) => {
      return permissionFlag.includes(per);
    });
    return isExist;
  };

  return <>{hasData(has) ? <div>{children}</div> : null}</>;
}
