"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[30],{3030:function(e,t,n){n.r(t),n.d(t,{default:function(){return d}});var a=n(4692),l=n(7309),o=n(7960),r=n(9439),s=n(2791),i=n(4045),c=(n(4569),n(184));function d(e){var t=(0,s.useState)(!1),n=(0,r.Z)(t,2),d=n[0],u=(n[1],(0,s.useRef)(null)),p=(0,s.useState)(),h=(0,r.Z)(p,2);h[0],h[1];(0,s.useEffect)((function(){}),[]);var b=function(e){var t=document.createElement("a"),n=window.URL.createObjectURL(e);t.href=n,t.download="\u6599\u573a\u62a5\u8868.xlsx",document.body.appendChild(t),t.click(),document.body.removeChild(t),window.URL.revokeObjectURL(n),o.ZP.success("\u5df2\u6210\u529f\u5bfc\u51fa!")},f=function(e){var t=new FileReader;t.readAsBinaryString(e),t.onload=function(e){var t=e.target.result,n=i.ij(t,{type:"binary",cellStyles:!0}),a="";n.SheetNames.forEach((function(e,t){var l=n.Sheets[e],o=i.P6.sheet_to_html(l,{header:1,defval:""});console.log(o);var r=o.indexOf("<table>"),s=o.indexOf("</table>");o=(o=(o=o.substring(r,s+"</table>".length)).replace(/(\b(?:data-t|data-v)=".*?")/g,"")).replace("<table>",'<table border="1" style="border-collapse:collapse; width: 100%; border:1px solid #666666; margin-bottom:5px;font-size:14px;margin: 15px 0;">'),a+=o,console.log(a)})),document.getElementById("tableView").innerHTML=a}};return(0,c.jsxs)("div",{className:"table-list",children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("input",{type:"file",ref:u,onChange:function(){var e=u.current.files;console.log(e),f(e[0])}}),(0,c.jsx)(l.ZP,{type:"primary",onClick:function(){console.log(document.getElementById("tableView"));var e=i.P6.table_to_sheet(document.getElementById("tableView")),t={SheetNames:[],Sheets:{}};t.SheetNames.push("sheet1"),e["!cols"]=[{wch:20}],t.Sheets.sheet1=e;var n=i.cW(t,{bookType:"xlsx",type:"array"}),a=new Blob([n],{type:"application/octet-stream"});b(a)},children:"\u5bfc\u51fa"})]}),(0,c.jsx)(a.Z,{spinning:d,children:(0,c.jsx)("div",{id:"tableView"})})]})}}}]);
//# sourceMappingURL=30.33d5c1e5.chunk.js.map