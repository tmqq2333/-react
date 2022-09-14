import React from 'react'
import { connect } from 'react-redux'

export const Edit = (props) => {
  
 const handleExportMarketingList=()=> {
    // 懒加载，@/common/vendor/Export2Excel 此路径为本地路径
    import('@/utils/Export2Excel').then((excel) => {
        const multiHeader = [
            [
              "生产情况","","","","",	"受卸成品作业区生产情况","","","","","",	"料场仓位情况","","","","","","","","",""
            ],
        ];
        const multiHeader2 = [
            [
              "料线","电子称号",	"重量（t）"	,"总量合计（t）",	"使用单位",	"品类",	"品名",	"上期库存",	"进",	"消",	"本地库存",	"" ,  "1#配料槽",""	,"2#配料槽","",	"煤筒仓","","配料槽",""
            ],
        ];
        const tHeader = [
            '', '', '', '', '', '', '', '', '', '', '',
            "仓号","品名",	"料位（t）",	"品名",	"料位（t）",	"品名","料位（t）",	"品名",	"料位（t）"
        ];
        const filterVal = [];// 表头所对应的字段，这里未填写，请自行填写对应的字段，按实际需求请自行处理该步
        const data = []; //this.marketing.list为请求的数据，此处理是为了对应字段，如不需要此处理，直接为data赋值即可
        // 进行所有表头的单元格合并
        const merges = [
            'A1:E1', 'F1:K1', 'L1:T1', 'M2:N2','O2:P2','Q2:R2','S2:T2',
        ];

        excel.export_json_to_excel({
            multiHeader, // 这里是第一行的表头
            multiHeader2, // 这里是第二行的表头
            header: tHeader, // 这里是第三行的表头
            data,
            filename: '原料场生产报表',
            merges,
        });
    });
}
  return (
    <button onClick={handleExportMarketingList}>Edit</button>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)