import { React, useEffect, useRef } from "react";
import CarModal from "./CarModal";
import { Space, Button, Popconfirm, message, Badge } from "antd";
import BasicTable from "../BasicTable";
const listStatus = [
  { code: 0, text: "进行中", color: "processing" },
  { code: 1, text: "已完成", color: "success" },
];

const textStatus = (e) => {
  let code = listStatus.find((i) => i.code === e);
  if (code) {
    return (
      <span>
        <Badge status={code.color} />
        {code.text}
      </span>
    );
  }
};
/*
 * 作业编号：job_id,开始时间：create_time,作业部：plant_desc,库存地：storage_location，
 * 批次号：batch_number,作业起点：startplace，作业子起点：startplace_sub,
 * 作业终点：endplace,作业子终点：endplace_sub,作业流程：route，完成吨数：tons,
 * 作业状态：status,完成时间：finish_time。
 * */
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};

export default function TopTable(props) {
  const columns1 = [
    {
      title: "作业编号",
      dataIndex: "job_id",
      key: "job_id",
    },
    {
      title: "开始时间",
      dataIndex: "create_time",
      key: "create_time",
    },
    {
      title: "作业部",
      dataIndex: "plant_desc",
      key: "plant_desc",
    },
    {
      title: "库存地",
      dataIndex: "storage_location",
      key: "storage_location",
    },
    {
      title: "物料名称",
      dataIndex: "material_name",
      key: "material_name",
    },
    {
      title: "批次号",
      dataIndex: "batch_number",
      key: "batch_number",
    },
  ];
  const columnsd = [
    {
      title: "作业起点",
      dataIndex: "startplace",
      key: "startplace",
    },
    {
      title: "作业子起点",
      dataIndex: "startplace_sub",
      key: "startplace_sub",
    },
    {
      title: "作业终点",
      dataIndex: "endplace",
      key: "endplace",
    },
    {
      title: "作业子终点",
      dataIndex: "endplace_sub",
      key: "endplace_sub",
    },
  ];
  const columns3 = [
    {
      title: "完成吨数",
      dataIndex: "tons",
      key: "tons",
    },
    {
      title: "作业状态",
      dataIndex: "status",
      key: "status",
      render: (text) => textStatus(text),
    },
    {
      title: "完成时间",
      dataIndex: "finish_time",
      key: "finish_time",
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">{setStatus(record)}</Space>
      ),
    },
  ];
  const columns2 = [];
  columnsd.map((i) => {
    if (i.key === "startplace_sub") {
      if (!props.startSub) {
        columns2.push(i);
      }
    } else if (i.key === "endplace_sub") {
      if (!props.endSub) {
        columns2.push(i);
      }
    } else {
      columns2.push(i);
    }
  });

  const columns = [...columns1, ...columns2, ...columns3];
  const { apiDel, apiSet } = props;
  const tableRef = useRef();
  const setStatus = (e) => {
    if (e.status === 1) {
      if (parseInt(e.tons)=== 0) {
        return (
          <Popconfirm
            title="确定删除？"
            onConfirm={() => changeDel(e.id)}
            onCancel={() => {}}
            okText="是"
            cancelText="否"
          >
            <Button type="primary" danger style={{ width: 70 }}>
              删除
            </Button>
          </Popconfirm>
        );
      } else {
        return (
          <Button type="primary" disabled style={{ width: 70 }}>
            完成
          </Button>
        );
      }
    } else {
      return (
        <CarModal
          data={{id:e.id, job_id: e.job_id, route: e.route,route_code: e.route_code }}
          apiSet={apiSet}
          getRefresh={getRefresh}
        />
      );
    }
  };
  //删除刷新
  const changeDel = (data) => {
    apiDel(data).then(() => {
      message.success("删除成功");
      tableRef.current.refresh("current");
    });
  };
  //执行成功刷新
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    } else {
      tableRef.current.refresh("current");
    }
  }, [props.notice]);
  //完成刷新
  const getRefresh = (e) => {
      tableRef.current.refresh("current");
  };

  return (
    <>
      <BasicTable
        ref={tableRef}
        columns={columns}
        searchParams={props.query ?? {}}
        queryAction={props.data}
      ></BasicTable>
    </>
  );
}
