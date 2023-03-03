import React, { useState, useMemo } from "react";
import { connect } from "react-redux";
import {TopSelect} from "react-antd-select";
//import TopSelect from "./component/TopSelect/index";
import HasBtn from "@/components/HasBtn";
import './scss/means.scss'
import { Space,Button,Input} from "antd";
import { getPassword } from "@/api/user";
const ChidlistArr = [
  {
    title: "类型",
    undisabled: true,
    rule: true,
    controlM:["storage_code",{disable:true,ganged:"true"}],
    valueName: "plant_code",
    option:{"k1":[{value:'s1',label:'吾皇'}],"k2":[{value:'s1',label:'巴扎黑'}],"k3":[{value:'s1',label:'卡卡'}]}
    },
  {
    title: "视角",
    undisabled: false,
    controlS:true,
    rule: true,
    unplaceholder: 'true',
    valueName: "storage_code",
    option:[{value:'k1',label:'12'},{value:'k2',label:'88'},{value:'k3',label:'66'}]
  },
   {
    //远程搜索数据
    title: "时代",
    undisabled: false,
    rule: false,
    valueName: "material_name",
    showSearch: true,
    showArrow: false,
    filterOption: false,
    onSearch: true,
  },
  {
    title: "名称",
    rule: true,
    undisabled: false,
    valueName: "batch_number",
    type: () => {
      return <Input style={{ width: 270 }} />;
    },
  },
];
export const Means = (props) => {
  const [fromLoading, setFromLoading] = useState(false);
  //刷新列表
  const getRefresh = (e) => {
    console.log('faafafafa',e); 
    console.log("执行了");
  };
  return (
    <div className="table-list">
      <Space direction="vertical">
          <TopSelect             
            getValue={getRefresh}
            listArr={ChidlistArr}
          >
           <div id="action">
              <div>
                <span>作业创建 ：</span>
                <Button
                  type="primary"
                  loading={fromLoading}
                  htmlType="submit"
                  style={{ width: 130 }}
                >
                  审核
                </Button>
              </div>
            </div>
          </TopSelect>
      </Space>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Means);
