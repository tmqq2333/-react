import { React, useState, Fragment, useEffect } from "react";
import {
  Select,
} from "antd";
const { Option } = Select;
export default function SelectD(props) {
  const [disable, setDisable] = useState(!!props.undisabled??false);
  const [optionList, setOptionList] = useState([]);
  const {infBroad,option,clearValue,onChange,value}=props
  const inf=['infBroad','option','clearValue','onChange','value','controlS','controlM','undisabled','type','inf','id','rule','valueName','getValue']
  let preprops={}//组件本身数据
  for(let v in props){
    if(!inf.includes(v)){
      preprops[v]=props[v]
    }
  }
  const findOption=(data)=>{

   if(Object.prototype.toString.call(data)==="[object Array]"){ 
    return data
   }else{
    return optionList
   }
  }
  const findChange=(name,value)=>{ 
      onChange(value)
     if(props.controlS){
      //通知开始
      infBroad({name:name,inf:value})
     } 
  }
      useEffect(()=>{
      if(!props.controlM){return }
      if(!props.inf) return
      //收到通知，判断是不是自己订阅的消息
      if(props.inf.name===props.controlM[0]){
        if(!props.controlM[1]) return 
        const control=props.controlM[1]
        if(control.disable){
           if(control.disable instanceof Array){
            if(control.disable.includes(props.inf.inf)){
              clearValue(props.valueName)
              setDisable(false)
            }else{
              clearValue(props.valueName)
              setDisable(true)
            }
           }else{
            if(props.inf.inf){
              setDisable(false)
            }else{
              setDisable(true)
            }
          }
        }
        if(control.ganged){
         if(clearValue){
          console.log('清除');
          clearValue(props.valueName)
         }
         console.log(option);
        console.log(option[props.inf.inf]);   
        if(option?.[props.inf.inf]){    
          setOptionList(option[props.inf.inf])
          if(control.ganged==="true"){
            clearValue(props.valueName,option[props.inf.inf][0].value)
          } 
          }else{
            setDisable(true)
          } 
        }  
      }
      },[props.inf])

  return (<Select
        disabled={disable}
        placeholder={'请选择'+preprops.title}
         value={value}
        {...preprops}
        onChange={(e) => findChange(props.valueName, e)}
      >
        {findOption(option).map((v, i) => {
          return (
            <Option key={i} value={v.value}>
              {v.label}
            </Option>
          );
        })}
      </Select>)  
}
