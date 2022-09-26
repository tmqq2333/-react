//汽车卸料
import { React, useState, useEffect } from 'react'
import { Select, Input, Button, Form, Modal, message } from 'antd'
const { Option } = Select
export default function CarModal(props) {
  const [visible, setVisible] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [option, setOption] = useState([])
  const [form] = Form.useForm()
  const { data, apiSet, getRefresh } = props
  const showModal = () => {
    setVisible(true)
  }
  useEffect(() => {
    let from = data ?? { job_id: '', route_code: [] }
    let route_code = data.route_code?.split(',')??[]
    let route = data.route?.split(',')??[]
    let arr = []
    route_code.map((v, i) => {
      arr.push({ value: v, label: route[i] })
    })
    setOption(arr)
    form.setFieldsValue({
      job_id: from.job_id,
      route_code: route_code
    })
  }, [visible])
  const onFinish = (values) => {
    console.log('Success:', values)
    setConfirmLoading(true)
    apiSet(data.id, values)
      .then((e) => {
        setVisible(false)
        setConfirmLoading(false)
        message.success('操作成功')
        getRefresh(!visible)
      })
      .catch(() => {
        setConfirmLoading(false)
      })
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    setConfirmLoading(false)
  }
  const handleCancel = () => {
    console.log('Clicked cancel button')

    setVisible(false)
  }
  const layout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 16
    }
  }
  return (
    <>
      <Button type="primary" onClick={showModal}>
        完成
      </Button>
      <Modal
        title="自由流程"
        visible={visible}
        bodyStyle={{ minHeight: 236 }}
        footer={null}
        centered
        forceRender
        closable={false}
      >
        <Form
          name="basic"
          initialValues={{
            remember: true
          }}
          {...layout}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="作业编号" name="job_id">
            <Input disabled />
          </Form.Item>
          <Form.Item name="route_code" label="停止流程">
            <Select mode="multiple" allowClear placeholder="请选择" open={false}>
              {option.map((i, v) => {
                return (
                  <Option key={v} value={i.value}>
                    {i.label}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <div className="btnfooter">
            <Button onClick={handleCancel}>取消</Button>
            <Button type="primary" loading={confirmLoading} htmlType="submit">
              确定
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  )
}
