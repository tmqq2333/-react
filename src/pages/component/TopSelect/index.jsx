import { React, useState, useEffect } from "react";
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
import {getMateria} from './util' //远程搜索
const { Option } = Select;
/*
配置化组件：
title:'标题'
width---宽度间隔
props:getCreate--创建的api
postPer--执行的api
getRefresh--执行成功返回一个提醒
listArr--list循环
isline--存在：无ChidlistArr   
ps:搜索框：参数name接收，输出data：{label：name，value：value} 
*/
/*
改良了一下，之前的不灵活
listArr配置
{
  title: "受料槽", 标题
  undisabled: true,   初始化状态是否可选
  mode: "multiple",  模式多选，其余配置同antd
  rule:true,   是否必选
  controlS:true,  被依赖方
  controlM:["startplace",{disable:true,ganged:true}], 订阅者["依赖字段",{disable:是否可选（true or 数组）,ganged:是否联级}]
  unplaceholder: "true",  //默认显示选项第一行数据
  valueName: "startplace_sub", 字段
  option: {              // option
    "1#":[...setChildren(5)],
    "2#":[...setChildren(7)]
  },
},
*/
//select清除与value同时会有bug,解决：from存放值
let ChidlistArr=[]
export default function TopSelect(props) {
  const [inf, setInf] = useState();
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const {children,mark} = props
    let slots = {
      default: []
  }
  if(children) {
      let childrens = Array.isArray(children) ? children : [children];
      childrens.forEach(item => {
              if(item.props.slot) {
                  slots[item.props.slot] = item
              } else {
                  slots['default'].push(item)
              }
      })
  }
  const handleSearch = (newValue) => {
    if (!props.getSearch) {
      message.warn("antd-select组件未加载getSearch方法");
      return null;
    }
    if (newValue) {
      getMateria(newValue,props.getSearch, setData);
    } else {
      setData([]);
    }
  };
  useEffect(() => {
    const listArr = props.isline
      ? props.listArr
      : [...props.listArr??[], ...ChidlistArr];
    listArr.map((i) => {
      if (i.unplaceholder) {
        form.setFieldsValue({
          [i.valueName]: i.option?.[0].value,
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
    props.getValue?.(values)
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.warn("请选择");
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
            requiredMark={mark?true:false}
          >
            <Row gutter={props.gutter ??[ 68, 6]}>
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
                          allowClear
                          {...item}
                          onSearch={item.onSearch?handleSearch:undefined}
                          clearValue={clearValue}
                          option={item.option??data}
                          inf={inf}
                          style={{ width:item.width?? 270 }}
                          infBroad={infBroad}
                        ></SelectD>)
                        }     
                      </Form.Item>
                    </Col>
                  );
                })}
            </Row>
            {slots['default']}
          </Form>
        </div>
      </div>
    )
  );
}
