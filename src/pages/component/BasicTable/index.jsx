import React, {
  useEffect,
  useReducer,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useRef,
} from "react";
import { Table } from "antd";

// 只做了分页
/**
 * columns Array table表头，也可不写，直接在里面写<Column>
 * queryAction (payload):Promise 必选参数  列表数据获取接口
 * originProps  Object antd的table props
 * searchParams Object 请求附加参数
 *
 *
 * 刷新： table添加ref
 const tableRef = useRef()
 tableRef.current.refresh('current') // 参数不填刷新第一页，填current,刷新当前页

 *    <BasicTable
 *                  ref={tableRef}
 *                   columns={columns}
 *                   queryAction={getOnOffList}
 *                   searchParams={{query: query}}
 *                   originProps={table的props}
 *               ></BasicTable>
 * */

/**
 * useReducer替代 复杂的 useState
 * useCallback 性能优化 useCallback会返回一个函数的 memoized（记忆的）值，在依赖不变的情况下，多次定义的时候，返回的值是相同的
 * */
function BasicTable(props, ref) {
  const { columns, queryAction, searchParams, children } = props;
  // console.log(columns)
  // console.log(queryAction)
  // console.log(searchParams)
  // console.log(originProps)
  // console.log('render')
  const initOriginProps = props.originProps ?? {};
  const pageInit = {
    current: 1,
    pageSize: 10,
    total: 0,
    showTotal: (total) => `共 ${total} 条`,
    defaultPageSize: 10,
  };
  const stateInit = {
    loading: false,
    pagination: pageInit,
    dataSource: [],
  };

  const reducer = (state, action) => {
    const { payload } = action;
    switch (action.type) {
      // 更改loading状态
      case "Toggle_loading":
        return { ...state, loading: !state.loading };
      // 设置分页
      case "Set_pagination":
        return { ...state, pagination: payload.pagination };
      // 设置数据
      case "Set_datasource":
        return { ...state, dataSource: payload.dataSource };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, stateInit);

  useImperativeHandle(ref, () => {
    return {
      refresh: refresh,
      getData: () => {
        return state.dataSource;
      },
      setData: (data) => {
        console.log(data);
        dispatch({
          type: "Set_datasource",
          payload: {
            dataSource: [].concat(data),
          },
        });
      },
    };
  });

  const fetchDataWarp = useCallback(
    fetchData,
    [state.pagination.current, state.pagination.pageSize, queryAction]
    // 写成state.pagination就进入了死循环
  );
  useEffect(() => {
    console.log("init");
    fetchDataWarp();
  }, [fetchDataWarp]);
  const firstUpdate = useRef(true);
  useEffect(() => {
    console.log("search");
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    } else {
      if (state.pagination.current === 1) {
        fetchData();
      }
      dispatch({
        type: "Set_pagination",
        payload: {
          pagination: {
            ...state.pagination,
            current: 1,
          },
        },
      });
    }
  }, [searchParams]);

  // useEffect(() => {
  //     console.log('lalalal')
  //     fetchData()
  // }, [searchParams, state.pagination.current, state.pagination.pageSize, queryAction])

  function refresh(val) {
    console.log("刷新");
    if (val && val === "current") {
      fetchData();
    } else {
      dispatch({
        type: "Set_pagination",
        payload: {
          pagination: { ...state.pagination, current: 1 },
        },
      });
      fetchData();
    }
  }

  // 改变页码
  function handleTableChange(payload) {
    if (payload) {
      const { current, pageSize } = payload;
      dispatch({
        type: "Set_pagination",
        payload: {
          pagination: {
            ...state.pagination,
            current,
            pageSize,
          },
        },
      });
    }
  }

  async function fetchData() {
    if (!queryAction) return;
    dispatch({
      type: "Toggle_loading",
    });
    // 分页字段名称转换
    const { current: page, pageSize } = state.pagination;
    console.log({ page, pageSize, ...searchParams });
    let res = await queryAction({ page, pageSize, ...searchParams })
      .then((e) => {
        return e;
      })
      .catch((err) => {
        dispatch({ type: "Toggle_loading" });
        return {};
      });
    // 关闭loading
    console.log("table数据");
    props.getTableData?.(res);
    if (res.code === 200) {
      const { count: total = 0, data } = res;
      dispatch({
        type: "Set_pagination",
        payload: {
          pagination: { ...state.pagination, total: total },
        },
      });

      // let data = []
      // if(Array.isArray(res.data)) {
      //     data = res.data
      // } else {
      //     const { count } = res.data
      //     data = res.data.data
      //
      //     dispatch({
      //         type: 'Set_pagination',
      //         payload: {
      //             pagination: { ...state.pagination, total: count }
      //         }
      //     })
      //
      // }

      // 回填table数据
      dispatch({
        type: "Set_datasource",
        payload: {
          dataSource: data,
        },
      });
      dispatch({
        type: "Toggle_loading",
      });
    }
  }
  return (
    <Table
      columns={columns}
      pagination={state.pagination}
      dataSource={state.dataSource}
      loading={state.loading}
      onChange={handleTableChange}
      {...initOriginProps}
    >
      {children}
    </Table>
  );
}
export default forwardRef(BasicTable);
