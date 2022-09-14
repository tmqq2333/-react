import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import './scss/repbox.scss'
import { Spin, message,Input,Button } from "antd";
/**
 *
 *问题：样式设计
 */
export default function Repbox(props) {
  const [ loading, setLoading ] = useState(false);
  const inputFile = useRef(null);
  const [arrList, setArrList] = useState();
  useEffect(() => {
    // getNetworkFile();
  }, []);
  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     Object.keys(data).map((i) => {
  //       let s = i.split(",").join("");
  //       let dom = document.getElementById(`sjs-${s}`);
  //       if (dom) {
  //         dom.innerHTML = data[i];
  //       }
  //     });
  //   }
  // }, [data]);
  const getNetworkFile = () => {
    let config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    axios({
      url: "/rep.xlsx",
      method: "GET",
      responseType: "blob",
      config,
    }).then((blobData) => {
      //将blob转为file类型
      console.log(blobData);
      let file = new File([blobData.data], "报表", {
        type: blobData.data.type,
      });
      console.log(file);
      fileReader(file);
    });
  };
  const fileChange = () => {
    let files = inputFile.current.files;
    console.log(files);
    fileReader(files[0]);
  };
  const createBook = () => {
    //使用table_to_sheet或table_to_book其中一种方法
    //table_to_sheet的用法
    //console.log(inputFile);
    // let files = inputFile.current.files
    console.log(document.getElementById("tableView"));
    let worksheet = XLSX.utils.table_to_sheet(
      document.getElementById("tableView")
    );
    let workbook = {
      SheetNames: [],
      Sheets: {},
    };
    workbook.SheetNames.push("sheet1");
    worksheet["!cols"] = [{ wch: 20 }]; //设置第一列的列宽
    workbook.Sheets["sheet1"] = worksheet;
    //table_to_book的用法
    // let workbook = XLSX.utils.table_to_book(document.getElementById('tableView'));
    let data = XLSX.write(workbook, {
      bookType: "xlsx", // 要生成的文件类型
      type: "array",
    });
    let blobData = new Blob([data], { type: "application/octet-stream" });
    exportFn(blobData);
  };
  const exportFn = (blob) => {
    const fileName = "料场报表.xlsx";
    let downloadElement = document.createElement("a");
    let href = window.URL.createObjectURL(blob); //创建下载的链接
    downloadElement.href = href;
    downloadElement.download = fileName; //下载后文件名
    document.body.appendChild(downloadElement);
    downloadElement.click(); //点击下载
    document.body.removeChild(downloadElement); //下载完成移除元素
    window.URL.revokeObjectURL(href); //释放blob
    message.success("已成功导出!");
  };
  const fileReader = (file) => {
    let reader = new FileReader();
    //读入file
    reader.readAsBinaryString(file);
    reader.onload = (e) => {
      let side = e.target.result;
      //读取file, 提取数据
      let workbook = XLSX.read(side, { type: "binary", cellStyles: true });
      // let workbook = readFile('./rep.xlsx')
      let html = "";

      workbook.SheetNames.forEach(function (name, index) {
        let ws = workbook.Sheets[name];
        let str = XLSX.utils.sheet_to_html(ws, { header: 1, defval: "" });
        console.log(str);
        // 只截取table的内容
        let startNo = str.indexOf(`<table>`);
        let endNo = str.indexOf(`</table>`);
        str = str.substring(startNo, endNo + `</table>`.length);
        str = str.replace(/(\b(?:data-t|data-v)=".*?")/g, "");
        str = str.replace(
          "<table>",
          `<table border="1" style="border-collapse:collapse; width: 100%; border:1px solid #666666; margin-bottom:5px;font-size:14px;margin: 15px 0;">`
        );
        html += str;
        console.log(html);
      });
      //setArrList(html)
      //dangerouslySetInnerHTML = {{ __html: html }}
      document.getElementById("tableView").innerHTML = html;
    };
  };

  return (
    <div className="table-list">
      <div>
      <input type="file" ref={inputFile} onChange={fileChange} />
      <Button type="primary" onClick={createBook}>导出</Button>
      </div>
      <Spin spinning={loading}>
        <div id="tableView"></div>
      </Spin>
    </div>
  );
}
