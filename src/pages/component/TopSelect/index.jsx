import { React, useState, Fragment, useEffect } from "react";
import {
  Select,
  Button,
  Input,
  DatePicker,
  Row,
  Col,
  Form,
  message,
  Popconfirm,
} from "antd";
import SelectD from "./select";
import { getPassword } from "@/api/user";
import {getMateria} from '@/utils/util'
const { Option } = Select;
/*
配置化组件：
title:'标题'
width---宽度间隔   
props:getCreate--创建的api
postPer--执行的api
getRefresh--执行成功返回一个提醒
listArr--list循环       
*/
/*
改良了一下，之前的不灵活
listArr配置
{
  title: "受料槽", 标题
  disabled: true,   初始化
  mode: "multiple",  多选
  rule:true,   必选
  controlS:true,  被依赖方
  controlM:["startplace",{disable:true,ganged:true}], 订阅者["依赖字段",{disable:是否可选，true or 数组,ganged:是否联级}]
  placeholder: "等待作业起点选择",  //默认，没有这个就默认第一行数据
  valueName: "startplace_sub", 字段
  option: {              // option
    "1#":[...setChildren(5)],
    "2#":[...setChildren(7)]
  },
},
*/
//select清除与value同时会有bug,解决：from存放值
// let optionP={}
const plantOption = [];
const ChidlistArr = [
  {
    title: "作业部",
    disabled: true,
    rule: true,
    controlM:["storage_code",{disable:true,ganged:"true"}],
    placeholder: "请选择",
    valueName: "plant_code",
    option:plantOption?.reduce((i,v) => {
      return {...i,[v.storage_code]:[{value:v.plant_code,label:v.plant_desc}]};
      },undefined)
    },
  {
    title: "库存地",
    disabled: false,
    controlS:true,
    rule: true,
    placeholder: "请选择",
    valueName: "storage_code",
    option:plantOption?.map((i)=>{
     return {value:i.storage_code,label:i.storage_location}
    }),
  },
  {
    title: "物料名称",
    disabled: false,
    rule: true,
    placeholder: "请选择",
    valueName: "material_name",
    showSearch:true,
    showArrow:false,
    filterOption:false,
    onSearch:true
  },
  {
    title: "批次号",
    disabled: false,
    placeholder: "请选择",
    valueName: "batch_number",
    type:()=>{
      return  <Input  style={{ width: 270 }}/>
    }
  },
];
export default function TopSelect(props) {
  const [disable, setDisable] = useState(true);
  const [inf, setInf] = useState();
  const [fromLoading, setFromLoading] = useState(false);
  const [perLoading, setPerLoading] = useState(false);
  //创建参数
  const [creatList, setCreatList] = useState({});
  //执行参数
  const [perList, setPerList] = useState(null);
  const [performList, setPerformList] = useState([]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);

  const handleSearch = (newValue) => {
    if (newValue) {
      getMateria(newValue,getPassword, setData);
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    const listArr = props.isline
      ? props.listArr
      : [...props.listArr??[], ...ChidlistArr];
    listArr.map((i) => {
      if (!i.placeholder) {
        form.setFieldsValue({
          [i.valueName]: i.option[0]?.value,
        });
      }
    });
  }, []);

  const clearValue = (arr,value=undefined) => {
    // if (arr instanceof Array) {
    //   arr.map((item) => {
    //     form.setFieldsValue({
    //       [item]: undefined,
    //     });
    //   });
    // } else {
      form.setFieldsValue({
        [arr]: value,
      });
    // }
  };
  const onFinish = (values) => {
    setFromLoading(true);
    console.log("Success:", values);
    props
      .getCreate({data:{ startplace:values.startplace,
        startplace_sub:values.startplace_sub,
        endplace:values.endplace,
        endplace_sub:values.endplace_sub}})
      .then((e) => {
        console.log(e);
        message.success("创建成功");
        const route=e.data??undefined
        console.log(route);
        setPerformList(route);
        setPerList(undefined)
        setDisable(false);
        setFromLoading(false);
        let  material=values.material_name.split('|')
        setCreatList({...values,material_code:material[1],material_name:material[0]})
      })
      .catch((e) => {
        message.error("创建失败");
        setFromLoading(false);
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.warn("请选择");
    setFromLoading(false);
  };
  const performChange = (value,data) => {
    if (value !== "") {
      setPerList({route:data.children,route_code:value});
    }
  };

  const confirm = (e) => {
    setPerLoading(true);
    console.log(e);
    console.log(perList);
    if (perList) {
      props
        .postPer({...creatList, ...perList })
        .then(() => {
          message.success("执行成功");
          props.getRefresh?.(!disable);
          setPerLoading(false);
          setDisable(true);
          setPerList(undefined)
        })
        .catch((e) => {
          message.error("执行失败");
          console.log(e);
          setPerLoading(false);
        });
    } else {
      setPerLoading(false);
      message.warn("请选择");
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.warn("未执行");
  };
  const infBroad=(e)=>{
    setInf(e)
  }
  const findOnline=(data)=>{
    const listArr=props.listArr??[]
    if(data){
      return listArr
    }else{
      return [...ChidlistArr,...listArr]
    }
  }
  return (
    {
      /* top部分 */
    },
    (
      <div>
        <div className="carContent">
          <Form
            name="basic"
            form={form}
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            className="topForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Row gutter={[props.width ?? 68, 6]}>
            {/* <Col className="gutter-row">
            <Form.Item
                    label={"批次号 :"}
                    name={"batch_number"}
                      >
                 <Input  style={{ width: 270 }}/>
                      </Form.Item>
              </Col> */}
              {findOnline(props.isline??false).map((item, index) => {
                  return (
                    <Col className="gutter-row" key={index}>
                      <Form.Item
                        // key={index}
                        label={item.title + " :"}
                        name={item.valueName}
                        rules={[
                          {
                            required: item.rule ?? false,
                            message: "请选择!",
                          },
                        ]}
                      >
                        {
                          item.type?.()?? (<SelectD
                          disabled={item.disabled}
                          valueName={item.valueName}
                          placeholder={"请选择"+item.title}
                          mode={item.mode ?? undefined}
                          allowClear
                          showArrow={item.showArrow??true}
                          filterOption={item.filterOption??true}
                          onSearch={item.onSearch?handleSearch:undefined}
                          showSearch={item.showSearch??false}
                          clearValue={clearValue}
                          controlS={item.controlS ?? undefined}
                          controlM={item.controlM ?? undefined}
                          option={item.option??data}
                          inf={inf}
                          style={{ width: 270 }}
                          infBroad={infBroad}
                        ></SelectD>)
                        }
                       
                      </Form.Item>
                    </Col>
                  );
                })}
            </Row>
            <div id="action">
              <div>
                <span>作业创建 ：</span>
                <Button
                  type="primary"
                  loading={fromLoading}
                  htmlType="submit"
                  style={{ width: 130 }}
                >
                  创建
                </Button>
              </div>
              <div style={{ marginTop: 20 }}>
                <span>作业执行 ：</span>
                <Popconfirm
                  title="确定执行当前流程并启动相关设备？"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="是"
                  cancelText="否"
                >
                  <Button
                    type="primary"
                    loading={perLoading}
                    style={{ width: 130 }}
                  >
                    执行
                  </Button>
                </Popconfirm>
              </div>
            </div>
          </Form>
        </div>
        <div
          style={{ width: 1000, height: 90, marginTop: -10, marginLeft: 10 }}
        >
          <p style={{ height: 30 }}>
            {props.title ? (props.title === "配料" ? "配料" : "送料") : "卸料"}
            流程 :
          </p>
          <Select
            disabled={disable}
            placeholder="等待创建作业..."
            style={{ width: 1000 }}
            value={perList?.route_code}
            onChange={(e,v)=>{performChange(e,v)}}
          >
            {performList.map((v,i)=>{
              return  <Option key={i} value={v.route_code}>{v.route}</Option>
            })}
           
          </Select>
        </div>
      </div>
    )
  );
}
