import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Tree,
} from "antd";
import menus from "@/router/menus";
import React, { useState, useEffect } from "react";
const { Option } = Select;
const initForm = {
  auth_name: localStorage.getItem('adminname'),
  role: '',
  remark: ''
}
const Informat = (props) => {
  const { visible, onCancel } = props;
  const [loading, setLoading] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [form] = Form.useForm();  
  const treeData = menus

  const onCheck = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const handleOk=(values)=>{
    setLoading(true)
    //操作 
    const data={...values,...{permissions:checkedKeys}}
    console.log(data);
    setTimeout(()=>{
      setLoading(false)
      message.success('修改成功')
      onCancel()
    },2000)
  }
  const validateMessages = {
    required: "'${name}' 是必选字段",
  };
 useEffect(()=>{
  form.setFieldsValue({
    name: localStorage.getItem('username'),
  })
}, [visible])
  const footer = () => {
    return (
      <Space>
        <Button type="primary" onClick={()=>form.submit()} loading={loading}>
          确定
        </Button>
        <Button onClick={onCancel}>取消</Button>
      </Space>
    );
  };
  return (
    <>
      <Drawer
        title="修改资料"
        width={360}
        visible={visible}
        onClose={onCancel}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={footer()}
      >
        <Form layout="vertical" hideRequiredMark  
        form={form}
        initialValues={initForm}
        validateMessages={validateMessages}
        onFinish={handleOk}>
          <Form.Item
            name="name"
            label="用户名"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please enter user name",
              },
            ]}
          >
            <Input placeholder="Please enter user name" />
          </Form.Item>

          <Form.Item
            name="owner"
            label="角色"
            rules={[
              {
                required: true,
                message: "Please select an owner",
              },
            ]}
          >
            <Select placeholder="Please select an owner">
              <Option value="admin">管理员</Option>
              <Option value="tourists">游客</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="type"
            label="类型"
            rules={[
              {
                required: true,
                message: "Please choose the type",
              },
            ]}
          >
            <Select placeholder="Please choose the type">
              <Option value="private">Private</Option>
              <Option value="public">Public</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
          >
            <Input.TextArea
              rows={4}
              placeholder="please enter url description"
            />
          </Form.Item>
          <Form.Item
            name="permissions"
            label="权限"
          >
            <Tree
              checkable
              defaultExpandAll
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              treeData={treeData}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export default Informat;
