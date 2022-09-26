import React,{useState} from 'react'
import HasBtn from "@/components/HasBtn";
import './scss/look.scss'
import { Button, Space, DatePicker } from "antd";
const { RangePicker } = DatePicker;
export default function Look() {
  const [tableData, setTableData] = useState();
  const [notice, setNotice] = useState(true);
  const [timeDate, setTimeDate] = useState({});
  const onTimeChange = (value, dateString) => {
    setTimeDate({ start: dateString[0] ?? "", end: dateString[1] ?? "" });
  };
  const onSearch = () => {
    setTableData(timeDate);
  };
  return (
    <div className='table-list'>
          <div slot="option" className="fr">
            <HasBtn has={["sys:add"]}>
              <Button
                type="primary"
                onClick={() => {
                  setNotice(!notice);
                }}
              >
                新增
              </Button>
            </HasBtn>
          </div>
          <div>
            <div style={{ margin: "10px 0 10px 10px" }}>
              <span>时间范围（开始） </span>
              <Space direction="vertical" size={12}>
                <RangePicker
                  placeholder={["开始时间", "结束时间"]}
                  onChange={onTimeChange}
                />
              </Space>
              <Button
                type="primary"
                onClick={onSearch}
                style={{ marginRight: 20, marginLeft: 20 }}
              >
                查询
              </Button>
            </div>
            {/* //getTrainList */}
          </div>
    </div>
  )
}
