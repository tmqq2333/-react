import React,{useEffect} from 'react'
import { connect } from 'react-redux'

export const Register = (props) => {
  let ss=[{id:110}]
  useEffect(()=>{
    list()
    
  },[])
  const list=()=>{
    const clickHand=(v)=>{
      console.log(v);
    }
   let dom =document.getElementById("flag")
   let str='<div onclick="clickHand(ss)">点击</div>'
   console.log(dom);
   dom.innerHTML=str
  }
 
  return (
    <div id='flag'>Register
    </div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Register)