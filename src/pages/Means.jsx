import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import TopSelect from "./component/TopSelect";
import HasBtn from "@/components/HasBtn";
import './scss/means.scss'
import { Button, Space, DatePicker } from "antd";
export const Means = (props) => {
  const [tableData, setTableData] = useState();
  const [notice, setNotice] = useState(true);
  //刷新列表
  const getRefresh = (e) => {
    console.log("执行了");
    setNotice(!notice);
  };
  let richData = useMemo(() => {
    //执行相应的函数
    return tableData;
  }, [tableData]);
  return (
    <div className="table-list">
      <Space direction="vertical">
          <TopSelect
            // getCreate={getTrainUnloading}
            // postPer={postTrainProcess}
            getRefresh={getRefresh}
            // listArr={arrList}
          ></TopSelect>
      </Space>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Means);
